import React, { useEffect, useState } from "react";
import HoldingTable from "./HoldingTable";
import Card from "./Card";
import axios from "axios";
import AllocationChart from "./AllocationChart";
import HistoricalDataChart from "./IndexChart";
import api from "../config/api";

function Portfolio() {
  const [holdings, setHoldings] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHoldings = async () => {
    const user_id = localStorage.getItem("user_id");
    try {
      const response = await axios.get(`${api}/holdings/${user_id}`);
      setHoldings(response.data.holdings);
      // console.log(response.data.holdings);
      setLoading(false);
    } catch (error) {
      // console.error(error);
    }
  };

  const fetchStocks = async () => {
    try {
      const response = await axios.get(`${api}/stocks`);
      setStocks(response.data.symbols);
      // console.log(response.data.symbols);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    fetchHoldings();
    fetchStocks();

    const interval = setInterval(() => {
      fetchHoldings();
      fetchStocks();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const updatedHoldings = holdings.map((holding) => ({
    symbol: holding.symbol,
    shares: holding.quantity,
    avgCost: holding.avg_buy_price.toFixed(2),
    marketPrice: stocks.find((stock) => stock.symbol === holding.symbol)?.price.toFixed(2) || 0,
    marketValue: (stocks.find((stock) => stock.symbol === holding.symbol)?.price * holding.quantity).toFixed(2),
    gainLoss: ((stocks.find((stock) => stock.symbol === holding.symbol)?.price * holding.quantity) - (holding.avg_buy_price * holding.quantity)).toFixed(2),
    percentGainLoss: (((stocks.find((stock) => stock.symbol === holding.symbol)?.price * holding.quantity) - (holding.avg_buy_price * holding.quantity)) / (holding.avg_buy_price * holding.quantity) * 100).toFixed(2)
  }));

  return (
    <div>
      {loading ? (
        <p className="text-center mt-4">Loading...</p>
      ) : holdings.length === 0 ? (
        <p className="flex justify-center items-center mt-24 text-3xl text-gray-400 font-extralight">No holdings...</p>
      ) : (
        <div>
          <div className="flex justify-center flex-row">
            <Card holdings={updatedHoldings} />
            <AllocationChart holdings={updatedHoldings} />
          </div>
          <HoldingTable holdings={updatedHoldings} />
        </div>
      )}
    </div>
  );
}

export default Portfolio;
