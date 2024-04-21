

import React, { useState, useEffect } from "react";
import axios from "axios";


function Watchlist() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState(null);

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
    console.log(stocks);
  }, [stocks]);

  const handleBuySell = (symbol) => {
    setSelectedSymbol(symbol);
  };

  const handleCloseModal = () => {
    setSelectedSymbol(null);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="w-full h-full rounded-md overflow-y-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-sm">Symbol</th>
                <th className="px-4 py-2 text-sm">Price</th>
                <th className="px-4 py-2 text-sm">Buy</th>
                <th className="px-4 py-2 text-sm">Sell</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr key={index} className={`${index % 2 === 1 ? 'bg-gray-100' : ''} text-center`}>
                  <td className="px-4 py-2 text-sm">{stock.symbol}</td>
                  <td className="px-4 py-2 text-sm">{stock.price}</td>
                  <td className="px-4 py-2 text-sm">
                    <button onClick={() => handleBuySell(stock.symbol)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Buy</button>
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <button onClick={() => handleBuySell(stock.symbol)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Sell</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedSymbol && <TradeModal symbol={selectedSymbol} price={stocks.find(stock => stock.symbol === selectedSymbol).price} action="Buy" onClose={handleCloseModal} />}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
