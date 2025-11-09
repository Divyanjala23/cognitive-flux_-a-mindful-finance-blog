import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { Article } from '../../types';

const CategorySections: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const navigate = useNavigate();

  const pick = (filter: (a: Article) => boolean, limit = 3) =>
    articles.filter(filter).slice(0, limit);

  const groups = [
    {
      key: 'wealth',
      title: 'The Wealth Engine',
      subtitle: 'Finance, compounding, and leverage without burnout.',
      who: 'For operators who want calm but aggressive money systems.',
      posts: pick((a) => a.category === 'Finance'),
    },
    {
      key: 'future',
      title: 'The Future Stack',
      subtitle: 'AI + tech as cognitive and financial leverage.',
      who: 'For builders using AI as a tool, not a distraction.',
      posts: pick((a) => a.category === 'Tech'),
    },
    {
      key: 'mind',
      title: 'The Deep Code',
      subtitle: 'Mindfulness, emotional clarity, and inner stability.',
      who: 'For people rewiring their default mental OS.',
      posts: pick((a) => a.category === 'Mindfulness'),
    },
  ];

  return (
    <section className="mt-20 max-w-6xl mx-auto">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Choose your starting track
        </h2>
        <Link to="/articles">
          <span className="text-[10px] text-[var(--c0)] hover:underline">
            View all insights →
          </span>
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {groups.map((group) => (
          <div
            key={group.key}
            className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/90 backdrop-blur-xl p-4 modern-card"
          >
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.14em]"
              style={{ color: 'var(--c0)' }}
            >
              {group.title}
            </p>
            <p className="mt-1 text-[10px] text-[var(--text-color-muted)]">
              {group.subtitle}
            </p>
            <p className="mt-1 text-[9px] text-[var(--text-color-muted)]">
              {group.who}
            </p>
            <div className="mt-4 space-y-3">
              {group.posts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => navigate(`/article/${p.id}`)}
                  className="w-full text-left group"
                >
                  <p className="text-xs font-semibold group-hover:text-[var(--c0)] transition-colors">
                    {p.title}
                  </p>
                  <p className="text-[10px] text-[var(--text-color-muted)] line-clamp-2">
                    {p.excerpt}
                  </p>
                </button>
              ))}
              {group.posts.length === 0 && (
                <p className="text-[10px] text-[var(--text-color-muted)] italic">
                  Coming soon.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySections;
