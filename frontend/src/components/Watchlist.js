
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import TradeModal from "./TradeModal";

function Watchlist() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [previousPrice, setPreviousPrice] = useState({ symbol: "", price: 0 });
  const [change, setChange] = useState(0);
  const [selectedSymbol, setSelectedSymbol] = useState(null);


  useEffect(() => {
    const socket = io("http://127.0.0.1:5000")

    console.log("socket", socket);

    socket.on("connect", (data) => {
      console.log("connected", data);
    });
    socket.on("message", (data) => {
      console.log("socket log", data);
    });
    socket.on("stocks", (data) => {
      console.log("Watchlist socket data", data);
      setStocks(data.symbols);
      setLoading(false)
    });
    socket.on("disconnect", (data) => {
      console.log("Disconnected", data);
    });

    // Clean up function to close the socket connection when component unmounts
    return () => {
      console.log("socket clenaup listener");
      socket.removeAllListeners();
      console.log("socket disconnecte");
      socket.disconnect();
    };
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
                    <button onClick={() => handleBuySell(stock.symbol)} className="bg-[#DAE9FF] hover:bg-[#0160FF] border border-[#0160FF] text-[#0160FF] hover:text-white font-bold py-2 px-10 rounded">Buy</button>
                  </td>
                  <td className="px-4 py-2 text-sm">
                    <button onClick={() => handleBuySell(stock.symbol)} className="bg-[#FBE0DF] hover:bg-[#EB2821] border border-[#EB2821] text-[#EB2821] hover:text-white font-bold py-2 px-10 rounded">Sell</button>
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


//   return (
//     <div>
//       <h2>Watchlist</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Symbol</th>
//               <th>Price</th>
//               <th>Change</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stocks.map((stock) => (
//               <tr key={stock.id}>
//                 <td>{stock.symbol}</td>
//                 <td>{stock.price}</td>
//                 <td>{change}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Watchlist;
