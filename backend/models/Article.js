const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    url: { type: String, required: true }, // Add URL field for the article link
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
