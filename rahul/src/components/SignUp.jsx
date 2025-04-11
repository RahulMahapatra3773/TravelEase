import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/signup', { name, email, password })
      .then(result => {
        axios.post('http://localhost:8000/updateTotalUsers')
          .then(() => {
            toast.success("Successfully Signed Up!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              theme: "colored",
            });
            login();
            navigate('/');
          })
          .catch(err => {
            toast.error("Failed to update user count.", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              theme: "colored",
            });
          });
      })
      .catch(err => {
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          theme: "colored",
        });
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="absolute top-4 left-4">
        <Link to="/" className="text-green-400 hover:text-green-300">
          <FaHome className='text-2xl' />
        </Link>
      </div>
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-green-400 mb-6">Signup for TravelEase</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-600 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
              required
              onChange={(e) => setName(e.target.value)}/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-600 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
              required
              onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-600 rounded-md text-white bg-gray-700 focus:outline-none focus:ring-1 focus:ring-green-500"
              required
              onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-500">
            Signup
          </button>
        </form>
        <p className="text-sm text-center text-gray-300 mt-4">
          Already have an account? <Link to="/login" className="text-green-500 underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
export default Signup;
