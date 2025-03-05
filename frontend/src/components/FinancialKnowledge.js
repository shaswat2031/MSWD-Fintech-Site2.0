import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FinancialKnowledge = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/scrape/financial-news?page=1&pageSize=100');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-10">
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 text-center mb-12 tracking-widest">
        Financial News Highlights
      </h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105 flex flex-col justify-between border border-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-100 leading-snug mb-4">
              {article.title}
            </h2>
            <p className="text-gray-400 text-sm mb-6 line-clamp-4">
              {article.description || "No description available for this article."}
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full mt-auto px-4 py-3 text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-center hover:bg-gradient-to-l hover:from-cyan-500 hover:to-blue-500 transition-all"
            >
              Read Full Article
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialKnowledge;