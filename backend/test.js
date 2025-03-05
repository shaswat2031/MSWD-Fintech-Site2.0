const { faker } = require('@faker-js/faker'); // Use the new faker library
const ExpenseContext = require('./context/ExpenseContext'); // Adjust the import path as needed

// Mock data generator
const generateMockExpenses = (count) => {
  const categories = ['Food', 'Transportation', 'Rent', 'Utilities', 'Entertainment'];
  const expenses = [];

  for (let i = 0; i < count; i++) {
    const expense = {
      title: faker.commerce.productName(), // Random title
      amount: faker.finance.amount(10, 500, 2), // Random amount between 10 and 500
      category: categories[Math.floor(Math.random() * categories.length)], // Random category
      date: faker.date.past().toISOString().split('T')[0], // Random past date
    };
    expenses.push(expense);
  }

  return expenses;
};

// Function to add mock data to the context
const addMockData = async () => {
  const { addExpense } = ExpenseContext; // Use your context
  const mockExpenses = generateMockExpenses(50); // Generate 50 mock expenses

  for (const expense of mockExpenses) {
    await addExpense(expense); // Add each expense to the context
  }

  console.log('50 mock expenses added successfully!');
};

// Run the function
addMockData();