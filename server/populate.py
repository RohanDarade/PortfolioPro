import csv
import sqlite3

# Get the details from environment variables
database_path = "./instance/PortfolioPro.db"

# Connect to the SQLite database
conn = sqlite3.connect(database_path)

# Create a cursor object to execute SQL queries
cursor = conn.cursor()

# Create the historical_prices table if it doesn't exist
cursor.execute('''
CREATE TABLE IF NOT EXISTS historical_prices (
    date TEXT,
    price REAL,
    instrument_name TEXT
)
''')

# Commit the table creation
conn.commit()

# Open the historical_prices CSV file
with open('historical_prices.csv', 'r') as file:
    # Create a CSV reader object
    reader = csv.reader(file)

    # Skip the header row
    next(reader)

    # Iterate over each row in the CSV file
    for row in reader:
        # Extract the data from the row
        date = row[0]
        price = float(row[1])
        instrument_name = row[2]

        # Insert the data into the historical_prices table
        cursor.execute(
            "INSERT INTO historical_prices (date, price, instrument_name) VALUES (?, ?, ?)",
            (date, price, instrument_name)
        )

# Commit the transaction
conn.commit()

# Create the stock_prices table if it doesn't exist
cursor.execute('''
CREATE TABLE IF NOT EXISTS stock_prices (
    symbol TEXT,
    datetime TEXT,
    price REAL
)
''')

# Commit the table creation
conn.commit()

# Open the stock_prices CSV file
with open('stock_prices.csv', 'r') as file:
    # Create a CSV reader object
    reader = csv.reader(file)

    # Skip the header row
    next(reader)

    # Iterate over each row in the CSV file
    for row in reader:
        # Extract the data from the row
        symbol = row[0]
        datetime = row[1]
        price = float(row[2])

        # Insert the data into the stock_prices table
        cursor.execute(
            "INSERT INTO stock_prices (symbol, datetime, price) VALUES (?, ?, ?)",
            (symbol, datetime, price)
        )

# Commit the transaction
conn.commit()

# Close the database connection
conn.close()
