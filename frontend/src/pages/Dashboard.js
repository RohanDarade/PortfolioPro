import React from 'react';
import Chart from '../components/HistoricalDataChart';

function Dashboard() {
  return (
    <div className=''>
      <Chart symbol='NIFTY 50' />
    </div>
  );
}

export default Dashboard;
