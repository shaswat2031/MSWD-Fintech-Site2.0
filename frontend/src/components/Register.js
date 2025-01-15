import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', { name, email, password });
      navigate('/');
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleRegister} className="form space-y-6">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        {/* Name Input */}
        <div className="input-span">
          <label htmlFor="name" className="label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        {/* Email Input */}
        <div className="input-span">
          <label htmlFor="email" className="label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input */}
        <div className="input-span">
          <label htmlFor="password" className="label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Register</button>
      </form>
    </div>
  );
};

export default Register;
