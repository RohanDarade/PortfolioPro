import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import api from '../config/api';

const IndexChart = () => {
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState('2017-01-01');
  const [toDate, setToDate] = useState('2017-01-31');
  const [index, setIndex] = useState('NIFTY 50');

  useEffect(() => {
    fetchData();
  }, [fromDate, toDate, index]);

  const fetchData = () => {
    let url = `${api}/historical-data?symbol=${index}&from_date=${fromDate}&to_date=${toDate}`;

    axios
      .get(url)
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

  const handleIndexChange = (e) => {
    setIndex(e.target.value);
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
      <div className='flex flex-row mb-4'>
      <div>
        <label htmlFor="index" className='font-extralight'>Index:</label>
        <select id="index" className="bg-gradient-to-l from-sky-100 to-indigo-100 border py-2 px-2 rounded-md mx-2 drop-shadow-md" value={index} onChange={handleIndexChange}>
          <option value="NIFTY 50">Nifty 50</option>
          <option value="NIFTY BANK">Nifty Bank</option>
          {/* Add other options as needed */}
        </select>
      </div>
      <div>
        <label htmlFor="fromDate" className='font-extralight'>Start Date : </label>
        <input type="date" className='bg-gradient-to-l from-sky-100 to-indigo-100 border py-2 px-2 rounded-md mx-2 drop-shadow-md' id="fromDate" value={fromDate} onChange={handleFromDateChange} />
      </div>
      <div>
        <label htmlFor="toDate" className="font-extralight">End Date:</label>
        <input type="date" className="bg-gradient-to-l from-sky-100 to-indigo-100 border py-2 px-2 rounded-md mx-2 drop-shadow-md" id="toDate" value={toDate} onChange={handleToDateChange} />
      </div>
      </div>
      <LineChart width={1000} height={500} data={data}>
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

export default IndexChart;
