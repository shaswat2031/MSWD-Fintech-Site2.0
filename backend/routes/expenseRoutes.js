const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const { protect } = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');

// Get all expenses for a user
router.get('/', protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).populate('userId', 'name email');
    res.status(200).json(expenses);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add a new expense with validation
router.post(
  '/',
  protect,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be a positive number'),
    body('category').not().isEmpty().withMessage('Category is required'),
    body('date').optional().isDate().withMessage('Date must be a valid date'),
  ],
  async (req, res) => {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, amount, category, date } = req.body;

    try {
      console.log('Received expense data:', req.body); // Log the received data for debugging

      const expense = new Expense({
        userId: req.user.id,
        title,
        amount,
        category,
        date: date || Date.now(), // Use current date if not provided
      });

      const savedExpense = await expense.save();
      res.status(201).json(savedExpense);
    } catch (error) {
      console.error('Error saving expense:', error); // Log error for debugging
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

// Edit an expense
router.put('/:id', protect, async (req, res) => {
  const { title, amount, category, date } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount, category, date },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete an expense
router.delete('/:id', protect, async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'Server Error' });
  }
});

// Clear all expenses
router.delete('/clear', protect, async (req, res) => {
  try {
    const result = await Expense.deleteMany({ userId: req.user.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No expenses found to clear' });
    }

    res.status(200).json({ message: 'All expenses cleared successfully' });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
