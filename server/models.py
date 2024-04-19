from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, DateTime

db = SQLAlchemy()

class HistoricalPrice(db.Model):
    __tablename__ = 'historical_prices'

    id = Column(Integer, primary_key=True)
    date = Column(DateTime, nullable=False)
    price = Column(Integer, nullable=False)
    instrument_name = Column(String(255), nullable=False)

    def __repr__(self):
        return f"<HistoricalPrice(date={self.date}, price={self.price}, instrument_name={self.instrument_name})>"
