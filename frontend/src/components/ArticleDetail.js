import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article:", error);
        setArticle(null); // Handle missing article gracefully
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div className="text-center text-2xl text-gray-300">Loading article...</div>;
  }

  if (!article) {
    return (
      <div className="text-center text-red-500 text-xl">
        Article not found. It may have been removed or the ID is incorrect.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-green-400 mb-4">{article.title}</h1>
      <p className="text-gray-300">{article.content || "No content available for this article."}</p>
    </div>
  );
};

export default ArticleDetail;
