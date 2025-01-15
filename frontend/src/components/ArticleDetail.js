import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-hackerDark text-white p-8">
      <h1 className="text-4xl font-bold text-hackerGreen mb-4">{article.title}</h1>
      <p className="text-gray-300">{article.content}</p>
    </div>
  );
};

export default ArticleDetail;
