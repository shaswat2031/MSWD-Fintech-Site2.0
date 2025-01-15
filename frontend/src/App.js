import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ExpenseManager from './components/ExpenseManagement';
import LoanManagement from './components/LoanManagement';
import FinancialKnowledge from './components/FinancialKnowledge';
import ArticleDetail from './components/ArticleDetail';
import { ExpenseProvider } from './context/ExpenseContext';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000); // Simulate loading for 5 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-text-wrapper">
          {['L', 'O', 'A', 'D', 'I', 'N', 'G'].map((letter, index) => (
            <span
              key={index}
              className="loading-letter"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Circular SVG Loader */}
        <svg className="pl" width="240" height="240" viewBox="0 0 240 240">
          <circle
            className="pl__ring pl__ring--a"
            cx="120"
            cy="120"
            r="105"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 660"
            strokeDashoffset="-330"
            strokeLinecap="round"
          ></circle>
          <circle
            className="pl__ring pl__ring--b"
            cx="120"
            cy="120"
            r="35"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 220"
            strokeDashoffset="-110"
            strokeLinecap="round"
          ></circle>
          <circle
            className="pl__ring pl__ring--c"
            cx="85"
            cy="120"
            r="70"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 440"
            strokeLinecap="round"
          ></circle>
          <circle
            className="pl__ring pl__ring--d"
            cx="155"
            cy="120"
            r="70"
            fill="none"
            stroke="#000"
            strokeWidth="20"
            strokeDasharray="0 440"
            strokeLinecap="round"
          ></circle>
        </svg>
      </div>
    );
  }

  return (
    <ExpenseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/expense-management" element={<ExpenseManager />} />
          <Route path="/loan-management" element={<LoanManagement />} />
          <Route path="/financial-knowledge" element={<FinancialKnowledge />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
        </Routes>
      </Router>
    </ExpenseProvider>
  );
}

export default App;
