<br />
<div align="center">
  <h1>PortfolioPro</h1>

  <h3 align="center">Manage Portfolio</h3>

  <p align="center">
    PortfolioPro is a web application that allows users to buy, sell, and visualize stocks easily. With PortfolioPro, users can take control of their investments and manage their portfolios effectively.
    <br />
    <h3>
    <a href="https://drive.google.com/file/d/1dkb2TIMPGNNr5oQgqdNpNUr0sx2u7BkV/view?usp=sharing" target='_blank'>View Video Demo 📽️</a>
    </h3>
  </p>

</div>


## Features

- **Buy and Sell Stocks**: Users can buy and sell stocks directly from the platform.
- **Portfolio Visualization**: Visualize your portfolio performance with interactive charts and graphs.
- **User-Friendly Interface**: Intuitive interface for easy navigation and use.

## Build With

- **Frontend**: React.js, HTML, CSS
- [![Python][Python]][Python-url]
- **Database**: MongoDB
- **APIs**: Financial data APIs for real-time stock information
- **Deployment**: Heroku, Netlify

## Getting Started

### Prerequisites

- Python
- NPM

To get started with PortfolioPro, follow these steps:

- Clone the repo

  ```sh git clone https://github.com/yourusername/PortfolioPro.git`

- Setup Log ingestion server

  1. Go to `server` directory
     ```sh
       cd server/
     ```
  2. Install Python dependencies
     ```sh
     pip install -r requirements.txt
     ```
  3. Start the server

     ```sh
     python app.py
     ```
  4. Add data from csv to database
 
     ```sh
    python populate.py
    ```

    The server should now be running on [http://127.0.0.1:5000](http://127.0.0.1:5000).

 Setup Web UI

  1. Go to `frontend` directory
     ```sh
       cd frontend/
     ```
  2. Install NPM dependencies
     ```sh
     npm install
     ```
  3. Start the React app
     ```sh
     npm run start
     ```
  4. View the app here - [http://localhost:3000](http://localhost:3000)


### PortfolioPro API Documentation

This is the API documentation for PortfolioPro, a platform for managing stock portfolios.

## Table of Contents

1. [Authentication](#authentication)
2. [User Management](#user-management)
3. [Stock Management](#stock-management)
4. [Portfolio Management](#portfolio-management)
5. [Order Management](#order-management)
6. [Real-time Updates](#real-time-updates)
7. [Miscellaneous](#miscellaneous)

## Authentication

### Signup

- **Endpoint:** `POST /signup`
- **Description:** Signup a new user to the platform.

### Login

- **Endpoint:** `POST /login`
- **Description:** Login an existing user to the platform.

### Protected

- **Endpoint:** `GET /protected`
- **Description:** Get the protected resource for authenticated users.

## User Management

### Get User

- **Endpoint:** `GET /users/<int:user_id>`
- **Description:** Get user information for the specified user.

### Add Funds

- **Endpoint:** `POST /add-funds/<int:user_id>`
- **Description:** Add funds to the user's account.

### Withdraw Funds

- **Endpoint:** `POST /withdraw-funds/<int:user_id>`
- **Description:** Withdraw funds from the user's account.

## Stock Management

### Update Price

- **Endpoint:** `POST /update-price`
- **Description:** Update stock prices in the database.

### Get Stock Symbols

- **Endpoint:** `GET /stocks`
- **Description:** Get a list of all stock symbols.

### Get Historical Data

- **Endpoint:** `GET /historical-data`
- **Description:** Get historical data for a specific stock symbol within a date range.

## Portfolio Management

### Get User Holdings

- **Endpoint:** `GET /holdings/<int:user_id>`
- **Description:** Get a list of all holdings for the specified user.

### Buy Stock

- **Endpoint:** `POST /buy/<int:user_id>`
- **Description:** Buy a stock for the specified user.

### Sell Stock

- **Endpoint:** `POST /sell/<int:user_id>`
- **Description:** Sell a stock for the specified user.

## Order Management

### Place Order

- **Endpoint:** `POST /orders/<int:user_id>`
- **Description:** Place an order for buying or selling a stock.

### Get Orders

- **Endpoint:** `GET /orders/<int:user_id>`
- **Description:** Get a list of all orders for the specified user.

## Real-time Updates

### Socket Connection

- **Endpoint:** `/`
- **Description:** Establish a WebSocket connection for real-time updates.

## Miscellaneous

### Index

- **Endpoint:** `/`
- **Description:** Default route returning a simple greeting message.



## Contributing

We welcome contributions from the community! If you'd like to contribute to PortfolioPro, please fork the repository and submit a pull request.

