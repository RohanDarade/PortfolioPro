from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
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
        return f"<User(username={self.username})>"

class HistoricalPrice(db.Model):
    __tablename__ = 'historical_prices'

    id = Column(Integer, primary_key=True)
    date = Column(DateTime, nullable=False)
    price = Column(Integer, nullable=False)
    instrument_name = Column(String(255), nullable=False)

    def __repr__(self):
        return f"<HistoricalPrice(date={self.date}, price={self.price}, instrument_name={self.instrument_name})>"
