import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StockPriceGenerator() {
  const [stockPrices, setStockPrices] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(updatePrices, 20000); // Update prices every 2 seconds

    return () => {
      clearInterval(intervalId); // Clear interval when component unmounts
    };
  }, []);

  useEffect(() => {
    async function fetchStockPrices() {
      const response = await axios.get('http://127.0.0.1:5000/stocks');
      console.log(response.data.symbols);
      setStockPrices(response.data.symbols);
    }

    fetchStockPrices();
  }, []);

  async function updatePrices() {
    const response = await axios.get('http://127.0.0.1:5000/stocks');
    const fetchedPrices = response.data.symbols;
  
    const updatedPrices = fetchedPrices.map(stock => ({
      symbol: stock.symbol,
      price: generateRandomPrice(stock.symbol, stock.price)
    }));
  
    const formattedPrices = updatedPrices.map(price => ({
      symbol: price.symbol,
      price: price.price
    }));
  
    await axios.post('http://127.0.0.1:5000/update-price', formattedPrices);
    console.log('Prices updated');
  }
  
  

  function generateRandomPrice(symbol) {
    const previousPrice = stockPrices.find(stock => stock.symbol === symbol)?.price || 100; // Default price if not found
    const min = previousPrice - 0.7;
    const max = previousPrice + 0.7;
    return parseFloat((Math.random() * (max - min) + min).toFixed(2)); // Ensure the price has 2 decimal places
  }
  

  return null; // Render nothing
}

export default StockPriceGenerator;
