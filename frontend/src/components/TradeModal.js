import React, { useState } from "react";

function TradeModal({ symbol, price, action, onClose }) {
  const [quantity, setQuantity] = useState(0);

  const handleTrade = () => {
    // Perform buy/sell action
    console.log(`Performing ${action} for ${quantity} ${symbol} stocks at ${price}`);
    // Reset quantity
    setQuantity(0);
    // Close the modal
    onClose();
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
          <button onClick={handleTrade} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {action}
          </button>
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default TradeModal;
