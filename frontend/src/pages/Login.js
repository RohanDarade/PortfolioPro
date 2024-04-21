import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
        
function Login() {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/login', userData)
      .then(response => {
        const { user_id, access_token } = response.data;
        localStorage.setItem('user_id', user_id);
        localStorage.setItem('token', access_token);
        console.log('Login success!');
        
        navigate('/dashboard');
      })
      .catch(error => {
        console.error(error);
        // Handle error
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
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Email</span>
          <input type="email" name="email" value={userData.email} onChange={handleChange} className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </label>
        <label className="block">
          <span className="text-gray-700">Password</span>
          <input type="password" name="password" value={userData.password} onChange={handleChange} className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
        </label>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
