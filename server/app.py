import random
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_
from datetime import datetime
from flask_cors import CORS
from models import db, HistoricalPrice, User, StockPrice, Holdings, Order
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_socketio import SocketIO, emit
import os
import json
import time
from threading import Thread

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])


# fetch the JWT_SECRET_KEY from the environment variables

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///PortfolioPro.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY')
app.config['SECRET_KEY'] = 'SOCKET_IO_SECRET_KEY'  # Secret key for SocketIO

db.init_app(app)

jwt = JWTManager(app)
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    user_name = data.get('user_name')
    email = data.get('email')
    password = data.get('password')

    if not user_name or not email or not password:
        return jsonify({'error': 'Username, email, and password are required'}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'error': 'Username already exists'}), 400

    new_user = User(user_name=user_name, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    # Generate JWT token for the new user
    access_token = create_access_token(identity=new_user.id)

    return jsonify({'message': 'User created successfully', 'user_id': new_user.id, 'access_token': access_token}), 201


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not user.verify_password(password):
        return jsonify({'error': 'Invalid email or password'}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({'user_id': user.id, 'access_token': access_token}), 200



@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    return jsonify(user_id=current_user_id), 200


@app.route('/update-price', methods=['POST'])
def update_price():
    data = request.get_json()
    for item in data:
        symbol = item.get('symbol')
        price = item.get('price')

        existing_stock = StockPrice.query.filter_by(symbol=symbol).first()
        if existing_stock:
            existing_stock.price = price
        else:
            stock_price = StockPrice(symbol=symbol, datetime=datetime.now(), price=price)
            db.session.add(stock_price)

    db.session.commit()

    return jsonify({'message': 'Prices updated successfully'}), 201


@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    user_data = {
        'id': user.id,
        'user_type': user.user_type,
        'email': user.email,
        'user_name': user.user_name,
        'broker': user.broker,
        'funds': user.funds
    }

    return jsonify({'user': user_data}), 200



@app.route('/add-funds/<int:user_id>', methods=['POST'])
def add_funds(user_id):
    data = request.get_json()
    funds_str = data.get('funds')

    if not funds_str:
        return jsonify({'error': 'Funds amount is required'}), 400

    try:
        funds = float(funds_str)
    except ValueError:
        return jsonify({'error': 'Invalid funds amount'}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    user.funds += funds
    db.session.commit()

    return jsonify({'message': 'Funds added successfully'}), 200


@app.route('/withdraw-funds/<int:user_id>', methods=['POST'])
def withdraw_funds(user_id):
    data = request.get_json()
    funds_str = data.get('funds')

    if not funds_str:
        return jsonify({'error': 'Funds amount is required'}), 400

    try:
        funds = float(funds_str)
    except ValueError:
        return jsonify({'error': 'Invalid funds amount'}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    if user.funds < funds:
        return jsonify({'error': 'Insufficient funds'}), 400

    user.funds -= funds
    db.session.commit()

    return jsonify({'message': 'Funds withdrawn successfully'}), 200



@app.route('/stocks', methods=['GET'])
def symbols():
    symbols = StockPrice.query.distinct(StockPrice.symbol).all()
    symbol_data = [{
        'id': symbol.id,
        'symbol': symbol.symbol,
        'datetime': symbol.datetime.strftime('%Y-%m-%d %H:%M:%S'),
        'price': symbol.price
    } for symbol in symbols]
    return jsonify({'symbols': symbol_data})



@app.route('/historical-data')
def historical_data():
    symbol = request.args.get('symbol')
    from_date = request.args.get('from_date')
    to_date = request.args.get('to_date')

    try:
        from_date = datetime.strptime(from_date, '%Y-%m-%d')
        to_date = datetime.strptime(to_date, '%Y-%m-%d')
    except ValueError:
        return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD.'}), 400

    if from_date > to_date:
        return jsonify({'error': 'From date should be before or equal to to date.'}), 400

    data = HistoricalPrice.query.filter(
        and_(
            HistoricalPrice.instrument_name == symbol,
            HistoricalPrice.date >= from_date,
            HistoricalPrice.date <= to_date
        )
    ).all()

    result = []
    for entry in data:
        result.append({
            'date': entry.date.strftime('%Y-%m-%d'),
            'price': entry.price,
            'instrument_name': entry.instrument_name
        })

    return jsonify(result)

@app.route('/holdings/<int:user_id>', methods=['GET'])
def get_user_holdings(user_id):
    holdings = Holdings.query.filter_by(user_id=user_id).all()
    holdings_data = [{
        'id': holding.id,
        'user_id': holding.user_id,
        'symbol': holding.symbol,
        'quantity': holding.quantity,
        'avg_buy_price': holding.avg_buy_price
    } for holding in holdings]

    return jsonify({'holdings': holdings_data}), 200

@app.route('/buy/<int:user_id>', methods=['POST'])
def buy_stock(user_id):
    data = request.get_json()
    symbol = data.get('symbol')
    quantity = data.get('quantity')
    avg_buy_price = data.get('avg_buy_price')

    if not symbol or not quantity or not avg_buy_price:
        return jsonify({'error': 'Symbol, quantity, and avg_buy_price are required'}), 400

    stock_price = StockPrice.query.filter_by(symbol=symbol).first()
    if not stock_price:
        return jsonify({'error': 'Stock price not found'}), 404

    total_cost = quantity * avg_buy_price
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    if user.funds < total_cost:
        return jsonify({'error': 'Insufficient funds'}), 400

    # Deduct total cost from user's funds
    user.funds -= total_cost

    holding = Holdings.query.filter_by(user_id=user_id, symbol=symbol).first()
    if not holding:
        # If the stock doesn't exist for the user, create a new row
        new_holding = Holdings(user_id=user_id, symbol=symbol, quantity=quantity, avg_buy_price=avg_buy_price)
        db.session.add(new_holding)
    else:
        # If the stock exists, update the quantity and average buy price
        new_avg_buy_price = ((holding.quantity * holding.avg_buy_price) + (quantity * avg_buy_price)) / (holding.quantity + quantity)
        holding.quantity += quantity
        holding.avg_buy_price = new_avg_buy_price

    db.session.commit()

    return jsonify({'message': 'Stock bought successfully'}), 200

@app.route('/sell/<int:user_id>', methods=['POST'])
def sell_stock(user_id):
    data = request.get_json()
    symbol = data.get('symbol')
    quantity = data.get('quantity')

    if not symbol or not quantity:
        return jsonify({'error': 'Symbol and quantity are required'}), 400

    holding = Holdings.query.filter_by(user_id=user_id, symbol=symbol).first()
    if not holding or holding.quantity < quantity:
        return jsonify({'error': 'Insufficient quantity to sell'}), 400

    stock_price = StockPrice.query.filter_by(symbol=symbol).first()
    if not stock_price:
        return jsonify({'error': 'Stock price not found'}), 404

    total_sale = quantity * stock_price.price

    # Update holding quantity
    holding.quantity -= quantity

    # Add total sale to user's funds
    user = User.query.get(user_id)
    user.funds += total_sale

    db.session.commit()

    return jsonify({'message': 'Stock sold successfully'}), 200




@app.route('/orders/<int:user_id>', methods=['POST'])
def post_order(user_id):
    data = request.get_json()
    symbol = data.get('symbol')
    price = data.get('price')
    date = datetime.now()
    quantity = data.get('quantity')
    trade_type = data.get('trade_type')

    if not symbol or not price or not quantity or not trade_type:
        return jsonify({'error': 'Symbol, price, quantity, and trade_type are required'}), 400

    new_order = Order(user_id=user_id, symbol=symbol, price=price, date=date, quantity=quantity, trade_type=trade_type)
    db.session.add(new_order)
    db.session.commit()

    return jsonify({'message': 'Order placed successfully'}), 201


@app.route('/orders/<int:user_id>', methods=['GET'])
def get_orders(user_id):
    orders = Order.query.filter_by(user_id=user_id).order_by(Order.date.desc()).all()
    if not orders:
        return jsonify({'message': 'No order history for this user'}), 404

    orders_data = [{
        'id': order.id,
        'user_id': order.user_id,
        'symbol': order.symbol,
        'price': order.price,
        'date': order.date.strftime('%Y-%m-%d %H:%M:%S'),
        'quantity': order.quantity,
        'trade_type': order.trade_type
    } for order in orders]

    return jsonify({'orders': orders_data}), 200



@socketio.on('connect')
def handle_ticker_connection():
    print('Client connected')
    emit('message', {'message': 'Connection established'})
    ticker_thread = Thread(target=emit_ticker_data)
    ticker_thread.start()


def emit_ticker_data():
    start_time = time.time()
    with app.app_context():
        connected = True
        def disconnect():
            nonlocal connected
            connected = False
            print("Client Disconnected")
        socketio.on_event('disconnect', disconnect)

        while time.time() - start_time < 600 and connected:
            print("Emit watchlist")
            symbols = StockPrice.query.all()
            for symbol in symbols:
                new_price = symbol.price + random.randint(-10, 10)
                symbol.price = new_price
                db.session.commit()  # Update the price in the database

            # Emit the updated prices to the client
            symbol_data = [{
                'id': symbol.id,
                'symbol': symbol.symbol,
                'datetime': symbol.datetime.strftime('%Y-%m-%d %H:%M:%S'),
                'price': symbol.price
            } for symbol in symbols]
            socketio.emit('stocks', {'symbols': symbol_data})
            time.sleep(1)

    # close connection
    socketio.emit('message', {'message': 'Connection closed'})
    print('Client disconnected')



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    # app.run(debug=True)
    socketio.run(app, debug=True)