import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar'; 
import axios from 'axios';
import api from './config/api';
// import StockPriceUpdater from './components/StockPriceGenerator';

function App() {

  useEffect(() => {
    setInterval(() => {
      axios.get(`${api}/`)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, 10000);
  }, []);

  return (
    <Router>
      <div className=''>
        {/* <StockPriceUpdater /> */}
        <Navbar /> {/* Render the Navbar component outside of the Routes */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
