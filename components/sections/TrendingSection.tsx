import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { Article } from '../../types';

const TrendingSection: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const navigate = useNavigate();
  const trending = [...articles].slice(0, 4);
  if (!trending.length) return null;

  return (
    <section className="mt-16 max-w-5xl mx-auto">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-lg font-semibold">Trending in Season 01</h3>
        <Link to="/articles">
          <span className="text-[9px] text-[var(--text-color-muted)] hover:text-[var(--c0)]">
            Browse all →
          </span>
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
        {trending.map((a) => (
          <button
            key={a.id}
            onClick={() => navigate(`/article/${a.id}`)}
            className="min-w-[180px] max-w-[220px] text-left rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/90 px-3 py-3 hover:border-[var(--c0)]/60 transition-colors"
          >
            <p
              className="text-[9px] uppercase tracking-[0.12em]"
              style={{ color: 'var(--c0)' }}
            >
              {a.category}
            </p>
            <p className="mt-1 text-xs font-semibold line-clamp-2">
              {a.title}
            </p>
            <p className="mt-1 text-[9px] text-[var(--text-color-muted)] line-clamp-2">
              {a.excerpt}
            </p>
            <p className="mt-1 text-[8px] text-[var(--text-color-muted)]">
              ~6 min read • High signal
            </p>
          </button>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
