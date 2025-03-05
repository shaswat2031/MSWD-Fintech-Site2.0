const axios = require('axios');
const cheerio = require('cheerio');

// Function to scrape articles from Financial Express
const scrapeFinancialExpressArticles = async () => {
  try {
    const url = 'https://www.financialexpress.com/'; // Financial Express homepage URL
    const { data } = await axios.get(url); // Fetch the HTML content of the page
    const $ = cheerio.load(data); // Load HTML using cheerio

    const articles = [];

    // Scrape article details (modify selectors as per Financial Express's structure)
    $('.article-list .article-item').each((index, element) => {
      const title = $(element).find('h3 a').text().trim(); // Extract the title
      const description = $(element).find('p').text().trim(); // Extract the description
      const articleUrl = $(element).find('h3 a').attr('href'); // Extract the article URL

      if (title && description && articleUrl) {
        articles.push({
          title,
          description,
          url: `https://www.financialexpress.com${articleUrl}`, // Ensure full URL
        });
      }
    });

    return articles; // Return the list of articles
  } catch (error) {
    console.error('Error scraping Financial Express:', error);
    throw error; // Throw error if scraping fails
  }
};

module.exports = scrapeFinancialExpressArticles;