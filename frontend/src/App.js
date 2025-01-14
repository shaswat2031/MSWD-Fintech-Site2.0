import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ExpenseManagement from './components/ExpenseManagement';
import LoanManagement from './components/LoanManagement';
import FinancialKnowledge from './components/FinancialKnowledge';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/expense-management" element={<ExpenseManagement />} />
        <Route path="/loan-management" element={<LoanManagement />} />
        <Route path="/financial-knowledge" element={<FinancialKnowledge />} />
      </Routes>
    </Router>
  );
}

export default App;
