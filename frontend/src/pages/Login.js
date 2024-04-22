import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../config/api';

function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true on form submit
    axios.post(`${api}/login`, userData)
      .then(response => {
        const { user_id, access_token } = response.data;
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('token', access_token);
        console.log('Login success!');
        navigate('/dashboard');
      })
      .catch(error => {
        console.error(error);
        alert(`Error: ${error.response.data.error}`)
      })
      .finally(() => {
        setLoading(false); // Set loading to false after request completes
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  return (
    <div className="max-w-md mx-auto mt-8 border p-8 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {loading && <div className="text-center mb-4">Loading...</div>} {/* Loader */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Email</span>
          <input type="email" name="email" value={userData.email} onChange={handleChange} className="border-gray-300 border p-2 mt-1 block w-full rounded-md  drop-shadow-sm outline-none  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </label>
        <label className="block">
          <span className="text-gray-700">Password</span>
          <input type="password" name="password" value={userData.password} onChange={handleChange} className="border-gray-300 border p-2 mt-1 block w-full rounded-md  drop-shadow-sm outline-none  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </label>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white w-full font-bold py-2 px-5 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
