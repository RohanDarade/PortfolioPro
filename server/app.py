from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_
from models import db, HistoricalPrice
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///PortfolioPro.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/')
def index():
    return 'Hello, World!'

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

