from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_
from datetime import datetime
from flask_cors import CORS
from models import db, HistoricalPrice, User
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity


app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///PortfolioPro.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_secret_key' 

db.init_app(app)

@app.route('/')
def index():
    return 'Hello, World!'


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'error': 'Username already exists'}), 400

    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if not user or not user.verify_password(password):
        return jsonify({'error': 'Invalid username or password'}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({'access_token': access_token}), 200

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    return jsonify(logged_in_as=current_user_id), 200


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

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

