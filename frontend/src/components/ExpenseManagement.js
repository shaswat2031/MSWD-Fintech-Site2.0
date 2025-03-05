import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpenseContext from '../context/ExpenseContext';
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { CSVLink } from 'react-csv';
import './ExpenseManagement.css';

const ExpenseManager = () => {
  const { expenses, fetchExpenses, addExpense, deleteExpense, clearAllExpenses } = useContext(ExpenseContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', amount: '', category: 'Food', date: '' });
  const [sortCriteria, setSortCriteria] = useState('date');
  const [chartType, setChartType] = useState('Pie');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const totalExpense = expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0).toFixed(2);
  const minExpense = expenses.length > 0 ? Math.min(...expenses.map((e) => parseFloat(e.amount))) : 0;
  const maxExpense = expenses.length > 0 ? Math.max(...expenses.map((e) => parseFloat(e.amount))) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(formData);
    setFormData({ title: '', amount: '', category: 'Food', date: '' });
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortCriteria === 'amount') return b.amount - a.amount;
    if (sortCriteria === 'date') return new Date(b.date) - new Date(a.date);
    if (sortCriteria === 'category') return a.category.localeCompare(b.category);
    return 0;
  });

  const categories = ['Food', 'Transportation', 'Rent', 'Utilities', 'Entertainment'];
  const categoryData = categories.map(
    (category) => expenses.filter((expense) => expense.category === category).reduce((sum, item) => sum + parseFloat(item.amount), 0)
  );

  const pieChartData = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: categoryData,
        backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#9c27b0', '#e91e63'],
      },
    ],
  };

  const lineChartData = {
    labels: expenses.map((expense) => new Date(expense.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Expense Trends',
        data: expenses.map((expense) => parseFloat(expense.amount)),
        borderColor: '#4caf50',
        fill: false,
      },
    ],
  };

  const csvData = expenses.map((expense) => ({
    Title: expense.title,
    Amount: expense.amount,
    Category: expense.category,
    Date: new Date(expense.date).toLocaleDateString(),
  }));

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 bg-gray-800 shadow-lg">
        <div className="text-3xl font-extrabold tracking-wide">FinHack</div>
        <div className="flex space-x-8">
          <button onClick={() => navigate('/expense-management')} className="hover:text-green-400 transition-all">
            Expense Management
          </button>
          <button onClick={() => navigate('/loan-management')} className="hover:text-green-400 transition-all">
            Loan Management
          </button>
          <button onClick={() => navigate('/financial-knowledge')} className="hover:text-green-400 transition-all">
            Financial Knowledge
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-12 bg-gray-800">
        <h1 className="text-4xl font-bold">Expense Manager</h1>
        <p className="text-lg mt-4 text-gray-300">Track and manage your expenses effectively.</p>
      </header>

      {/* Total, Min, Max Expense */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-gray-800">
        <div className="p-6 bg-gray-700 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold">Total Expense</h2>
          <p className="text-4xl font-semibold mt-2 text-green-400">₹{totalExpense}</p>
        </div>
        <div className="p-6 bg-gray-700 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold">Minimum Expense</h2>
          <p className="text-4xl font-semibold mt-2 text-red-400">₹{minExpense}</p>
        </div>
        <div className="p-6 bg-gray-700 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-bold">Maximum Expense</h2>
          <p className="text-4xl font-semibold mt-2 text-blue-400">₹{maxExpense}</p>
        </div>
      </section>

      {/* Clear All Expenses Section */}
      <section className="p-8 bg-gray-800 text-center">
        <button
          onClick={clearAllExpenses}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-500 transition-all"
        >
          Clear All Expenses
        </button>
      </section>

      {/* Form and Chart Options Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-gray-800">
        {/* Left Section: Form */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Add New Expense</h2>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="block w-full px-4 py-3 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="block w-full px-4 py-3 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="block w-full px-4 py-3 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="block w-full px-4 py-3 bg-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-500 transition-all">
              Add Expense
            </button>
          </form>
        </div>

        {/* Right Section: Chart Options */}
        <div className="bg-gray-700 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Chart Options</h2>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="bg-gray-600 text-white px-4 py-2 rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="Pie">Pie Chart</option>
            <option value="Line">Line Chart</option>
          </select>
          <div className="bg-gray-600 p-6 rounded-lg shadow-md">
            {chartType === 'Pie' ? <Pie data={pieChartData} /> : <Line data={lineChartData} />}
          </div>
        </div>
      </section>

      {/* CSV Download Section */}
      <section className="p-8 bg-gray-800 text-center">
        <CSVLink data={csvData} filename="expenses.csv">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-all">
            Download CSV
          </button>
        </CSVLink>
      </section>

      {/* Expense Table */}
      {/* Expense Table */}
<section className="p-8 bg-gray-800">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold">Expenses</h2>
    <select
      value={sortCriteria}
      onChange={(e) => setSortCriteria(e.target.value)}
      className="bg-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      <option value="date">Sort by Date</option>
      <option value="amount">Sort by Amount</option>
      <option value="category">Sort by Category</option>
    </select>
  </div>
  <div className="overflow-x-auto bg-gray-700 p-6 rounded-lg shadow-md">
    <table className="min-w-full text-sm">
      <thead>
        <tr className="text-left">
          <th className="py-4 px-6 text-lg font-bold">Title</th>
          <th className="py-4 px-6 text-lg font-bold">Amount</th>
          <th className="py-4 px-6 text-lg font-bold">Category</th>
          <th className="py-4 px-6 text-lg font-bold">Date</th>
          <th className="py-4 px-6 text-lg font-bold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedExpenses.map((expense) => (
          <tr key={expense._id} className="hover:bg-gray-600">
            <td className="py-4 px-6 text-lg">{expense.title}</td>
            <td className="py-4 px-6 text-lg">₹{expense.amount}</td>
            <td className="py-4 px-6 text-lg">{expense.category}</td>
            <td className="py-4 px-6 text-lg">{new Date(expense.date).toLocaleDateString()}</td>
            <td className="py-4 px-6 text-lg">
              <button
                onClick={() => deleteExpense(expense._id)}
                className="text-red-500 hover:text-red-400"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>
    </div>
  );
};

export default ExpenseManager;