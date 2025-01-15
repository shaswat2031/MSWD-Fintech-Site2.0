import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/home');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="form space-y-4">
        <h2 className="text-xl font-bold text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <span className="input-span">
          <label htmlFor="email" className="label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </span>

        <span className="input-span">
          <label htmlFor="password" className="label">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </span>

        

        <input className="submit" type="submit" value="Log in" />
        
        <span className="span">
          Don't have an account? <a href="/register" className="sign-up">Sign up</a>
        </span>
      </form>
    </div>
  );
};

export default Login;
