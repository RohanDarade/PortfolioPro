import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Account from '../components/Account';
import Orders from '../components/Orders';
import Portfolio from '../components/Portfolio';
import Watchlist from '../components/Watchlist';
import IndexChart from '../components/IndexChart';
import api from '../config/api';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState('portfolio');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    axios.get(`${api}/protected`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error(error);
        // Handle error
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleNavigation = (path) => {
    setSelectedComponent(path);
  };

  return (
    <div className="flex">
      <div className="w-1/6 h-screen border-r">
        <ul>
          <li
            onClick={() => handleNavigation('portfolio')}
            className={`cursor-pointer mx-4 my-2 rounded-md flex flex-row items-center px-4 py-3 ${
              selectedComponent === 'portfolio' ? 'bg-[#DAE9FF] text-black' : 'hover:bg-gray-300'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-2 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
            </svg> 
            Portfolio
          </li>
          <li
            onClick={() => handleNavigation('watchlist')}
            className={`cursor-pointer mx-4 my-2 rounded-md flex flex-row items-center px-4 py-3 ${
              selectedComponent === 'watchlist' ? 'bg-[#DAE9FF] text-black' : 'hover:bg-gray-300'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-2 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
            </svg>
            Watchlist
          </li>
          <li
            onClick={() => handleNavigation('orders')}
            className={`cursor-pointer mx-4 my-2 rounded-md flex flex-row items-center px-4 py-3 ${
              selectedComponent === 'orders' ? 'bg-[#DAE9FF] text-black' : 'hover:bg-gray-300'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-2 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
            </svg>
            Orders
          </li>
          <li 
            onClick={() => handleNavigation('index')}
            className={`cursor-pointer mx-4 my-2 rounded-md flex flex-row items-center px-4 py-3 ${
              selectedComponent === 'index' ? 'bg-[#DAE9FF] text-black' : 'hover:bg-gray-300'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-2 w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
</svg>

            Index Chart
          </li>
          <li
            onClick={() => handleNavigation('account')}
            className={`cursor-pointer mx-4 my-2 rounded-md flex flex-row items-center px-4 py-3 ${
              selectedComponent === 'account' ? 'bg-[#DAE9FF] text-black' : 'hover:bg-gray-300'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-2 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            Account
          </li>
          <li
            onClick={handleLogout}
            className={`cursor-pointer mx-4 my-2 rounded-md flex flex-row items-center px-4 py-3 ${
              selectedComponent === 'logout' ? 'bg-[#DAE9FF] text-black' : 'hover:bg-gray-300'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="mr-2 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
            </svg>
            Logout
          </li>
        </ul>
      </div>
      <div className="w-4/5 p-4">
        {selectedComponent === 'portfolio' && <Portfolio />}
        {selectedComponent === 'watchlist' && <Watchlist />}
        {selectedComponent === 'orders' && <Orders />}
        {selectedComponent === 'account' && <Account />}
        {selectedComponent === 'index' && <IndexChart />}
      </div>
    </div>
  );
}

export default Dashboard;
