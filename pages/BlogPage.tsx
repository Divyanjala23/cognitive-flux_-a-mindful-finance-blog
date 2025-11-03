import React from 'react';
import type { Article } from '../types';
import ArticleCard from '../components/ArticleCard';

const BlogPage: React.FC<{ articles: Article[] }> = ({ articles }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold font-heading">All Articles</h1>
        <p className="text-[var(--text-color-muted)] mt-4 max-w-2xl mx-auto">Explore our collection of insights on AI, finance, productivity, and personal growth.</p>
        <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4"></div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;