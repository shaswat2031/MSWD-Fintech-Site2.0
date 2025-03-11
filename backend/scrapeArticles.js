const axios = require('axios');
const cheerio = require('cheerio');

const scrapeArticles = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const articles = [];

    // Scrape article details from the website
    $('.article-listing__content').each((index, element) => {
      const title = $(element).find('h3').text(); // Article title selector
      const summary = $(element).find('p').text(); // Article summary selector
      const articleUrl = $(element).find('a').attr('href'); // Article URL selector

      if (title && summary && articleUrl) {
        articles.push({
          title,
          summary,
          url: articleUrl, // Store the article URL
        });
      }
    });

    return articles;
  } catch (error) {
    console.error('Error scraping articles:', error);
    throw error;
  }
};

module.exports = scrapeArticles;