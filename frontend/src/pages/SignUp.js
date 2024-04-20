import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [userData, setUserData] = useState({
    user_name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      ...userData,
      user_type: 'individual', // Default value
      broker: 'Zerodha' // Fixed value
    };

    axios.post('http://127.0.0.1:5000/signup', JSON.stringify(newUser), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data);
        // Set JWT token in local storage
        localStorage.setItem('token', response.data.access_token);
        // Redirect to dashboard after successful signup
        navigate('/dashboard');
      })
      .catch(error => {
        console.error(error);
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
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Name</span>
          <input type="text" name="user_name" value={userData.user_name} onChange={handleChange} className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </label>
        <label className="block">
          <span className="text-gray-700">Email</span>
          <input type="email" name="email" value={userData.email} onChange={handleChange} className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </label>
        <label className="block">
          <span className="text-gray-700">Password</span>
          <input type="password" name="password" value={userData.password} onChange={handleChange} className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </label>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
