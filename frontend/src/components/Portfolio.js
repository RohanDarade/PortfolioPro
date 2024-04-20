import React from "react";
import holdingsData from "./holdings.json";
import HoldingTable from "./HoldingTable";
import AllocationChart from "./AllocationChart";
import Card from "./Card";

function Portfolio() {
  const updatedHoldings = holdingsData.data.map((holding) => ({
    symbol: holding.tradingsymbol,
    shares: holding.quantity,
    avgCost: holding.average_price.toFixed(2), // Limit to 2 decimal places
    marketPrice: holding.last_price.toFixed(2), // Limit to 2 decimal places
    marketValue: (holding.last_price * holding.quantity).toFixed(2), // Limit to 2 decimal places
    gainLoss: (
      holding.last_price * holding.quantity -
      holding.average_price * holding.quantity
    ).toFixed(2), // Limit to 2 decimal places
    percentGainLoss:
      holding.average_price !== 0
        ? (
            ((holding.last_price * holding.quantity -
              holding.average_price * holding.quantity) /
              (holding.average_price * holding.quantity)) *
            100
          ).toFixed(2)
        : 0, // Handle division by zero
  }));

  return (
    <div>
      <div>
        <Card holdings={updatedHoldings} />
        {/* <AllocationChart holdings={updatedHoldings} /> */}
        <HoldingTable holdings={updatedHoldings} />
      </div>
    </div>
  );
}

export default Portfolio;
