import csv
import sqlite3

# Get the details from environment variables
database_path = "./instance/PortfolioPro.db"

# Connect to the SQLite database
conn = sqlite3.connect(database_path)

# Rest of the code......
with open('historical_prices.csv', 'r') as file:
    # Create a CSV reader object
    reader = csv.reader(file)

    # Skip the header row
    next(reader)

    # Iterate over each row in the CSV file
    for row in reader:
        # Extract the data from the row
        date = row[0]
        price = row[1]
        instrument_name = row[2]

        # Create a cursor object to execute SQL queries
        cursor = conn.cursor()

        # Insert the data into the historical_prices table
        cursor.execute(
            "INSERT INTO historical_prices (date, price, instrument_name) VALUES (?, ?, ?)",
            (date, price, instrument_name)
        )

        # Commit the transaction
        conn.commit()


# Close the database connection
conn.close()