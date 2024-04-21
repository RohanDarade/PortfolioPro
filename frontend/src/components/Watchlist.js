import React, { useState, useEffect } from "react";

function Watchlist() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previousPrice, setPreviousPrice] = useState({symbol: '', price: 0});
  const [change, setChange] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://127.0.0.1:5000/stocks")
        .then((response) => response.json())
        .then((data) => {
          setStocks(data.symbols);
          setLoading(false); // Data received, set loading to false
        });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (stocks.length > 0 && previousPrice === 0) {
      if (stocks[0].price != previousPrice[0].price) {
        setChange(stocks[0].price - previousPrice[0].price);
        setPreviousPrice(stocks[0].price);
      }
    }
  }, [stocks]);

  useEffect(() => {
    console.log(stocks);
  }, [stocks]);

  return (
    <div>
      <h2>Watchlist</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.id}>
                <td>{stock.symbol}</td>
                <td>{stock.price}</td>
                <td>{change}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Watchlist;
