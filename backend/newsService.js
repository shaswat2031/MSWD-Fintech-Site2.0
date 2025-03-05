const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.NEWS_API_KEY || '10b3f7ab71234edaa6233418e1cb466d';
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

async function fetchFinancialNews(page = 1, pageSize = 5) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        category: 'business',
        apiKey: API_KEY,
        page,
        pageSize,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error fetching news:', error.message);
    throw error;
  }
}

module.exports = { fetchFinancialNews };
