const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db'); // MongoDB connection logic
const articleRoutes = require('./routes/articleRoutes'); // Article-related routes
const expenseRoutes = require('./routes/expenseRoutes'); // Expense-related routes
const userRoutes = require('./routes/userRoutes'); // User-related routes
const loanRoutes = require('./routes/loanRoutes'); // Loan-related routes
const { errorHandler, notFound } = require('./middleware/errorMiddleware'); // Custom error middleware

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB(); // Assumes connectDB handles MongoDB connection logic

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON data
app.use(cors()); // Enable CORS for all origins

// Routes
app.use('/api/articles', articleRoutes); // Articles API
app.use('/api/expenses', expenseRoutes); // Expenses API
app.use('/api/users', userRoutes); // Users API
app.use('/api/loans', loanRoutes); // Loans API

// Error handling middleware
app.use(notFound); // Handle undefined routes
app.use(errorHandler); // Custom error handler

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
