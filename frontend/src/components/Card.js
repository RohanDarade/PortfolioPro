import React from 'react';

function Card({ holdings }) {
    const totalInvestedValue = holdings.reduce((acc, holding) => acc + (holding.avgCost * holding.shares), 0).toFixed(2);
    const totalMarketValue = holdings.reduce((acc, holding) => acc + (holding.marketPrice * holding.shares), 0).toFixed(2);
    const totalGainLoss = holdings.reduce((acc, holding) => acc + (holding.gainLoss * 1), 0).toFixed(2); // convert to number
    // Assume CAGR calculation is done elsewhere and is available as a prop
    const cagr = 10.25; // Example CAGR value

    return (
        <div className="grid grid-cols-4 m-4 gap-2">
            <div className="border bg-gradient-to-l from-sky-100 to-indigo-100 p-4 shadow-md rounded-md">
                <h3 className="font-light mb-2">Total Invested Value</h3>
                <p className="text-xl font-bold">{totalInvestedValue}</p>
            </div>
            <div className="border bg-gradient-to-l from-sky-100 to-indigo-100 p-4 shadow-md rounded-md">
                <h3 className="font-light mb-2">Total Market Value</h3>
                <p className="text-xl font-bold">{totalMarketValue}</p>
            </div>
            <div className="border bg-gradient-to-l from-sky-100 to-indigo-100 p-4 shadow-md rounded-md">
                <h3 className="font-light mb-2">Total {totalGainLoss >= 0 ? 'Profit' : 'Loss'}</h3>
                <p className={`text-xl font-bold ${totalGainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>{totalGainLoss}</p>
            </div>
            <div className="border bg-gradient-to-l from-sky-100 to-indigo-100 p-4 shadow-md rounded-md">
                <h3 className="font-light mb-2">CAGR</h3>
                <p className="text-xl font-bold">{cagr}%</p>
            </div>
        </div>
    );
}

export default Card;
