import React, { createContext, useState } from 'react';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    // Simulating an API call to fetch expenses (replace with actual API)
    const fetchedExpenses = [
      { _id: 1, title: 'Groceries', amount: 50, category: 'Food', date: '2025-01-01' },
      { _id: 2, title: 'Electricity Bill', amount: 100, category: 'Utility', date: '2025-01-02' }
    ];
    setExpenses(fetchedExpenses);
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, _id: expenses.length + 1 }]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense._id !== id));
  };

  const clearAllExpenses = () => {
    setExpenses([]); // Clears all expenses
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        fetchExpenses,
        addExpense,
        deleteExpense,
        clearAllExpenses, // Include this function
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
