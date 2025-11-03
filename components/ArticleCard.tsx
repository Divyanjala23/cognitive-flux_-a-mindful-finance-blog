import React from 'react';
import type { Article } from '../types';
import { Link } from 'react-router-dom';

const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <Link to={`/article/${article.id}`} className="block group">
      <div className="bg-[var(--card-bg)] backdrop-blur-sm rounded-xl overflow-hidden h-full flex flex-col
                      border border-[var(--card-border)]
                      transition-all duration-300 ease-in-out
                      hover:border-emerald-400/50 hover:shadow-2xl hover:shadow-emerald-900/50 dark:hover:shadow-emerald-900/50 hover:-translate-y-2">
        <div className="overflow-hidden">
          <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <span className="inline-block bg-emerald-500/10 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 text-xs font-medium px-3 py-1 rounded-full mb-3 self-start">{article.category}</span>
          <h3 className="text-xl font-bold font-heading text-[var(--heading-color)] mb-2 group-hover:text-emerald-500 dark:group-hover:text-emerald-300 transition-colors">
            {article.title}
          </h3>
          <p className="text-[var(--text-color-muted)] mt-2 text-sm flex-grow">{article.excerpt}</p>
          <div className="text-xs text-slate-400 dark:text-slate-500 mt-4 pt-4 border-t border-[var(--card-border)]">
            <span>{article.author} &bull; {article.date}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;