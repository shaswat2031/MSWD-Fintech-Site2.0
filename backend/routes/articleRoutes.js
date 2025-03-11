const express = require('express');
const router = express.Router();
const Article = require('../models/Article'); // Ensure this points to your Article model

// Get all articles with pagination and sorting by creation date
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const articles = await Article.find()
      .sort({ createdAt: -1 }) // Sort by creation date (newest first)
      .skip((page - 1) * limit) // Pagination logic
      .limit(limit);

    if (articles.length === 0) {
      return res.status(404).json({ message: 'No articles found' });
    }

    res.json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;