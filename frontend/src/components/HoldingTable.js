import React from "react";

function HoldingTable({ holdings }) {
   

    return (
        <div className="w-full h-full rounded-md overflow-y-auto">
            <table className="w-full table-auto">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2 text-sm">Symbol</th>
                        <th className="px-4 py-2 text-sm">Shares</th>
                        <th className="px-4 py-2 text-sm">Avg. Cost</th>
                        <th className="px-4 py-2 text-sm">Market Price</th>
                        <th className="px-4 py-2 text-sm">Market Value</th>
                        <th className="px-4 py-2 text-sm">Gain/Loss</th>
                        <th className="px-4 py-2 text-sm">% Gain/Loss</th>
                    </tr>
                </thead>
                <tbody>
                    {holdings.map((holding, index) => (
                        <tr key={index} className={`${index % 2 === 1 ? 'bg-gray-100' : ''} text-center`}>
                            <td className="px-4 py-2 text-sm">{holding.symbol}</td>
                            <td className="px-4 py-2 text-sm">{holding.shares}</td>
                            <td className="px-4 py-2 text-sm">{holding.avgCost}</td>
                            <td className="px-4 py-2 text-sm">{holding.marketPrice}</td>
                            <td className="px-4 py-2 text-sm">{holding.marketValue}</td>
                            <td className={`px-4 py-2 text-sm ${holding.gainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>{holding.gainLoss}</td>
                            <td className={`px-4 py-2 text-sm ${holding.percentGainLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>{holding.percentGainLoss}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default HoldingTable;
