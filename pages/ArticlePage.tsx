import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Article } from '../types';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { ModernGhostButton } from '../components/Buttons';

/**
 * Modern, full-bleed article page with:
 * - Edge-to-edge hero (image + gradient overlay + category chip)
 * - Reading progress bar
 * - Comfortable reading width with improved typography
 * - Responsive aside for related reads
 * - Accessible colors using your existing CSS vars
 */
export const ArticlePage: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = useMemo(() => articles.find((a) => String(a.id) === String(id)), [articles, id]);

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight * 0.6; // finish a little before the end for nicer feel
      const scrolled = Math.min(Math.max(window.scrollY - (el.offsetTop - window.innerHeight * 0.3), 0), total);
      setProgress(total > 0 ? Math.round((scrolled / total) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [article?.id]);

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
    .slice(0, 3);

  return (
    <div className="relative bg-[var(--app-bg)]">
      {/* Reading progress */}
      <div className="sticky top-0 z-40 h-1 w-full bg-transparent">
        <div
          className="h-1 bg-emerald-500 transition-[width] duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Full-bleed hero */}
      <section className="relative w-full">
        <div className="absolute inset-0">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-[42vh] sm:h-[56vh] object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-[var(--app-bg)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-md border border-white/20 text-white">
              {article.category}
            </span>
            <span className="text-white/70 text-xs">{article.author} • {article.date}</span>
          </div>
          <h1 className="max-w-4xl text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-white">
            {article.title}
          </h1>
          <p className="text-white/70 text-[10px] mt-4">
            Educational perspectives only. Not individual financial advice.
          </p>
          <div className="mt-6">
            <ModernGhostButton onClick={() => navigate('/articles')}>
              ← Back to Insights
            </ModernGhostButton>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main
        ref={contentRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Article */}
          <article className="lg:col-span-8">
            <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] shadow-xl shadow-black/5 backdrop-blur-md p-6 sm:p-10">
              <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-[var(--heading-color)] prose-p:text-[var(--text-color-base)] prose-a:text-emerald-600 hover:prose-a:underline prose-strong:text-[var(--text-color-base)] prose-blockquote:border-emerald-500/40 dark:prose-invert">
                <MarkdownRenderer content={article.content} />
              </div>
            </div>
          </article>

          {/* Related */}
          <aside className="lg:col-span-4 lg:sticky lg:top-20 self-start">
            {related.length > 0 && (
              <div className="bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] shadow-xl shadow-black/5 backdrop-blur-md p-6">
                <h3 className="text-xl font-bold font-heading mb-4">Related Reads</h3>
                <div className="space-y-4">
                  {related.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => navigate(`/article/${r.id}`)}
                      className="group w-full text-left"
                    >
                      <div className="flex gap-4 items-start">
                        <div className="w-20 h-16 overflow-hidden rounded-md border border-[var(--card-border)]">
                          <img src={r.imageUrl} alt={r.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold leading-snug group-hover:underline" style={{ color: 'var(--text-color-base)' }}>
                            {r.title}
                          </h4>
                          <p className="text-xs text-[var(--text-color-muted)] mt-1 line-clamp-2">
                            {r.excerpt}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ArticlePage;
