const express = require('express');
const { fetchFinancialNews } = require('../newsService');

const router = express.Router();

router.get('/financial-news', async (req, res) => {
  const { page = 1, pageSize = 5 } = req.query;

  try {
    const newsArticles = await fetchFinancialNews(page, pageSize);
    res.json(newsArticles);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch news', error: error.message });
  }
});

module.exports = router;
