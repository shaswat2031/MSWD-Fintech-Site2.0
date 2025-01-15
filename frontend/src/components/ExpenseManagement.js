// components/ExpenseManager.js
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom to navigate between pages
import ExpenseContext from '../context/ExpenseContext';

const ExpenseManager = () => {
  const { expenses, fetchExpenses, addExpense, deleteExpense } = useContext(ExpenseContext);
  const [formData, setFormData] = useState({ title: '', amount: '', category: '', date: '' });

  // Fetch expenses only once when the component is mounted
  useEffect(() => {
    fetchExpenses();
  }, []);  // Empty dependency array to avoid infinite loop

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(formData);
    setFormData({ title: '', amount: '', category: '', date: '' });
  };

  // Calculate total expense
  const totalExpense = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-900 text-green-400">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-800">
        <div className="text-2xl font-bold text-green-400">FinHack</div>
        <div className="flex space-x-6">
          <Link to="/home" className="hover:text-green-300">Home</Link>
          <Link to="/expense-management" className="hover:text-green-300">Expense Management</Link>
          <Link to="/loan-management" className="hover:text-green-300">Loan Management</Link>
          <Link to="/financial-knowledge" className="hover:text-green-300">Financial Knowledge</Link>
          <Link to="/" className="hover:text-green-300">Logout</Link>
        </div>
      </nav>

      <h1 className="text-3xl font-bold text-center py-4">Expense Manager</h1>

      {/* Total Expense Card */}
      <div className="max-w-xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold">Total Expense</h2>
        <p className="text-3xl font-semibold">${totalExpense}</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="block w-full px-4 py-2 mb-4 bg-gray-800 text-green-400 rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="block w-full px-4 py-2 mb-4 bg-gray-800 text-green-400 rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="block w-full px-4 py-2 mb-4 bg-gray-800 text-green-400 rounded"
        />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="block w-full px-4 py-2 mb-4 bg-gray-800 text-green-400 rounded"
        />
        <button className="w-full bg-green-500 text-gray-900 py-2 rounded hover:bg-green-400">
          Add Expense
        </button>
      </form>

      <div className="max-w-xl mx-auto mt-10">
        {expenses.map((expense, index) => (
          <div
            key={expense._id || index}  // Use _id if available, else fallback to index (index is last resort)
            className="flex justify-between items-center bg-gray-800 p-4 rounded mb-4"
          >
            <div>
              <h3 className="font-bold">{expense.title}</h3>
              <p>${expense.amount} - {expense.category}</p>
            </div>
            <button
              onClick={() => deleteExpense(expense._id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseManager;
