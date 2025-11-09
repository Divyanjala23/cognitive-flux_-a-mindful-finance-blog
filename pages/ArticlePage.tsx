import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Article } from '../types';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { ModernGhostButton } from '../components/Buttons';

const ArticlePage: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = articles.find((a) => String(a.id) === String(id));

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center cool-cycle">
        <div className="text-center">
          <h1 className="text-4xl font-bold" style={{ color: 'var(--c0)' }}>
            Article not found
          </h1>
          <button
            onClick={() => navigate('/articles')}
            className="mt-4 inline-block hover:underline"
            style={{ color: 'var(--c0)' }}
          >
            Back to articles
          </button>
        </div>
      </div>
    );
  }

  const related = articles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 2);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 cool-cycle">
      <article className="max-w-3xl mx-auto bg-[var(--card-bg)] backdrop-blur-md p-6 sm:p-12 rounded-xl border border-[var(--card-border)]">
        <div className="mb-8">
          <ModernGhostButton onClick={() => navigate('/articles')}>
            ← Back to Insights
          </ModernGhostButton>
        </div>

        <header className="text-center mb-12">
          <p className="font-semibold" style={{ color: 'var(--c0)' }}>
            {article.category}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold font-heading mt-2">
            {article.title}
          </h1>
          <p className="text-[var(--text-color-muted)] mt-4">
            {article.author} • {article.date}
          </p>
          <p className="text-[10px] text-[var(--text-color-muted)] mt-2">
            Educational perspectives only. Not individual financial advice.
          </p>
        </header>

        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-auto max-h-96 object-cover rounded-xl shadow-lg mb-12"
          loading="lazy"
        />

        <div className="prose prose-lg max-w-none">
          <MarkdownRenderer content={article.content} />
        </div>

        {related.length > 0 && (
          <div className="mt-16 pt-8 border-t border-[var(--card-border)]">
            <h3 className="text-2xl font-bold font-heading mb-6">
              Related Reads
            </h3>
            <div className="grid sm:grid-cols-2 gap-8">
              {related.map((r) => (
                <button
                  key={r.id}
                  onClick={() => navigate(`/article/${r.id}`)}
                  className="block text-left group bg-black/5 p-6 rounded-lg transition-colors border border-transparent hover:border-[var(--c0)]/50"
                  style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                >
                  <h4
                    className="font-bold group-hover:underline"
                    style={{ color: 'var(--text-color-base)' }}
                  >
                    {r.title}
                  </h4>
                  <p className="text-sm text-[var(--text-color-muted)] mt-2">
                    {r.excerpt}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default ArticlePage;
