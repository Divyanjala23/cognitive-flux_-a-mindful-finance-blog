import React from 'react';
import type { Article } from '../types';
import ArticleCard from '../components/ArticleCard';

const BlogPage: React.FC<{ articles: Article[] }> = ({ articles }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 cool-cycle">
      <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: 'var(--c0)' }}>
        All Financial & Mindful Insights
      </h1>
      <p className="text-sm text-[var(--text-color-muted)] mb-8">
        Season 01 • Behavioral finance, AI leverage, and inner stillness.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <div key={article.id} className="modern-card rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 p-1">
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
