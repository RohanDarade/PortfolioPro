from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    user_type = db.Column(db.String(50), nullable=False, default='individual')
    email = db.Column(db.String(120), unique=True, nullable=False)
    user_name = db.Column(db.String(120), nullable=False)
    broker = db.Column(db.String(120), nullable=False, default='Zerodha')
    password_hash = db.Column(db.String(128), nullable=False)

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f"<User(id={self.id}, user_type={self.user_type}, email={self.email}, user_name={self.user_name}, broker={self.broker})>"

class StockPrice(db.Model):
    __tablename__ = 'stock_prices'

    id = Column(Integer, primary_key=True)
    symbol = Column(String(255), nullable=False)
    datetime = Column(DateTime, nullable=False)
    price = Column(Integer, nullable=False)

    def __repr__(self):
        return f"<StockPrice(symbol={self.symbol}, datetime={self.datetime}, price={self.price})>"


class HistoricalPrice(db.Model):
    __tablename__ = 'historical_prices'

    id = Column(Integer, primary_key=True)
    date = Column(DateTime, nullable=False)
    price = Column(Integer, nullable=False)
    instrument_name = Column(String(255), nullable=False)

    def __repr__(self):
        return f"<HistoricalPrice(date={self.date}, price={self.price}, instrument_name={self.instrument_name})>"
