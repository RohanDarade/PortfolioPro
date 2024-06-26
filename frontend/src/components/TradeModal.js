import React, { useState } from "react";
import axios from "axios";
import api from "../config/api";

function TradeModal({ symbol, price, action, onClose }) {
  const [quantity, setQuantity] = useState(0);
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleTrade = () => {
    setLoading(true); // Set loading to true when trade is initiated
    // Perform buy/sell action
    const data = {
      symbol: symbol,
      quantity: quantity,
      avg_buy_price: price // Assuming price is the average buy price
    };
    const user_id = localStorage.getItem('user_id');
    const endpoint = action.toLowerCase(); // Convert action to lowercase

    axios.post(`${api}/${endpoint}/${localStorage.getItem('user_id')}`, data)
      .then(response => {
        // console.log(response.data);
        // Display response message
        setResponseMessage(response.data.message);
        // Reset quantity
        setQuantity(0);
        // Close the modal after 2 seconds
        setTimeout(() => {
          setResponseMessage("");
          onClose();
          // Call orders API endpoint and post the order
          const orderData = {
            symbol: symbol,
            price: price,
            date: new Date().toISOString(),
            quantity: quantity,
            trade_type: action
          };
          axios.post(`${api}/orders/${user_id}`, orderData)
            .then(response => {
              // console.log(response.data);
            })
            .catch(error => {
              // console.error(error);
            });
          setLoading(false); // Set loading to false after request completes
        }, 2000);
      })
      .catch(error => {
        // console.error(error);
        // Handle error
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
        setLoading(false); // Set loading to false after request completes
      });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-4 max-w-sm w-full">
        <h3 className="text-lg font-bold mb-4">{action} {symbol}</h3>
        <p>Price: {price}</p>
        <div className="flex items-center">
          <label className="mr-2">Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border border-gray-300 rounded-md px-2 py-1"
          />
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleTrade}
            disabled={loading} // Disable the button when loading is true
            className={`bg-${action === "Sell" ? "[#FBE0DF]" : "[#DAE9FF]"} hover:bg-${action === "Sell" ? "[#EB2821]" : "[#0160FF]"} border border-${action === "Sell" ? "[#EB2821]" : "[#0160FF]"} text-${action === "Sell" ? "[#EB2821]" : "[#0160FF]"} hover:text-white font-bold py-2 px-10 rounded`}
          >
            {loading ? 'Processing...' : action}
          </button>
          <button onClick={onClose} className="border border-gray-600 text-gray-600 py-2 px-8 rounded">
            Cancel
          </button>
        </div>
        {responseMessage && <p className="mt-4 text-center text-green-600">{responseMessage}</p>}
        {errorMessage && <p className="mt-4 text-center text-red-600">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default TradeModal;
