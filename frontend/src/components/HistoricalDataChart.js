import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const HistoricalDataChart = ({ symbol }) => {
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState('2017-01-01');
  const [toDate, setToDate] = useState('2017-01-31');

  useEffect(() => {
    fetchData();
  }, [fromDate, toDate, symbol]);

  const fetchData = () => {
    axios
      .get(`http://127.0.0.1:5000/historical-data?symbol=${symbol}&from_date=${fromDate}&to_date=${toDate}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  // Generate Y-axis ticks based on the data
  const generateYAxisTicks = () => {
    if (data.length === 0) {
      return [];
    }

    const prices = data.map((entry) => entry.price);
    const minY = Math.min(...prices);
    const maxY = Math.max(...prices);
    const range = maxY - minY;
    const numTicks = 5; // Number of ticks
    const step = range / (numTicks - 1);

    return Array.from({ length: numTicks }, (_, index) => minY + step * index);
  };

  return (
    <div>
      <div>
        <label htmlFor="fromDate">From:</label>
        <input type="date" id="fromDate" value={fromDate} onChange={handleFromDateChange} />
      </div>
      <div>
        <label htmlFor="toDate">To:</label>
        <input type="date" id="toDate" value={toDate} onChange={handleToDateChange} />
      </div>
      <LineChart width={900} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis domain={['dataMin', 'dataMax']} ticks={generateYAxisTicks()} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="rgb(75, 192, 192)" />
      </LineChart>
    </div>
  );
};

export default HistoricalDataChart;