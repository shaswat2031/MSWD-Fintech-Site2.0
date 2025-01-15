// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const { protect } = require('../middleware/authMiddleware');

// Get all expenses for a user
router.get('/', protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Add a new expense
router.post('/', protect, async (req, res) => {
  const { title, amount, category, date } = req.body;

  try {
    const expense = new Expense({
      userId: req.user.id,
      title,
      amount,
      category,
      date,
    });
    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Edit an expense
router.put('/:id', protect, async (req, res) => {
  const { title, amount, category, date } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount, category, date },
      { new: true }
    );

    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete an expense
router.delete('/:id', protect, async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
