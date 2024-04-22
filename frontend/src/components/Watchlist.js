import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import TradeModal from "./TradeModal";
import api from "../config/api";

function Watchlist() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  useEffect(() => {
    const socket = io(`${api}/`);

    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("stocks", (data) => {
      console.log("Watchlist socket data", data);
      setStocks(data.symbols);
      setLoading(false);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected");
    });

    // Clean up function to close the socket connection when component unmounts
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, []);

  const handleBuySell = (symbol, action) => {
    setSelectedSymbol({ symbol, action });
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
                    <button onClick={() => handleBuySell(stock.symbol, 'Buy')} className="bg-[#DAE9FF] hover:bg-[#0160FF] border border-[#0160FF] text-[#0160FF] hover:text-white font-bold py-2 px-10 rounded">Buy</button>
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <button onClick={() => handleBuySell(stock.symbol, 'Sell')} className="bg-[#FBE0DF] hover:bg-[#EB2821] border border-[#EB2821] text-[#EB2821] hover:text-white font-bold py-2 px-10 rounded">Sell</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedSymbol && <TradeModal symbol={selectedSymbol.symbol} price={stocks.find(stock => stock.symbol === selectedSymbol.symbol).price} action={selectedSymbol.action} onClose={handleCloseModal} />}
        </div>
      )}
    </div>
  );
}

export default Watchlist;
