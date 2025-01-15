// articleRoutes.js
const express = require('express');
const router = express.Router();
const Article = require('../models/Article'); // Assuming you have a model for Articles

// Get article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
