// pages/CalmFocusPage.tsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { Article } from '../types';
import ArticleCard from '../components/ArticleCard';

type Props = {
  articles: Article[];
};

const CalmFocusPage: React.FC<Props> = ({ articles }) => {
  const navigate = useNavigate();

  const mindArticles = articles.filter(
    (a) => a.category === 'Mindfulness'
  );
  const techArticles = articles.filter((a) => a.category === 'Tech');
  const highlightArticles = [...mindArticles, ...techArticles];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Back */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs text-[var(--c0)] border border-[var(--c0)]/30 px-3 py-1.5 rounded-xl hover:bg-[var(--c0)]/5 transition-colors"
        >
          <span>←</span>
          <span>Back to Home</span>
        </button>
      </div>

      {/* Hero */}
      <header className="max-w-3xl mb-10">
        <p className="text-xs font-semibold" style={{ color: 'var(--c0)' }}>
          Cognitive Flux • Calm + Focus
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold">
          I want calm + focus.
        </h1>
        <p className="mt-3 text-sm md:text-base text-[var(--text-color-muted)]">
          A hub for deep work, emotional regulation, and mindfulness practices
          that let you hold big goals without burning out.
        </p>
      </header>

      {/* Blocks */}
      <section className="grid md:grid-cols-3 gap-5 mb-12">
        <div className="modern-card rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/95 p-4">
          <h3 className="text-sm font-semibold mb-1">Deep Work Stack</h3>
          <p className="text-[10px] text-[var(--text-color-muted)] mb-2">
            Turn these into live focus tools later:
          </p>
          <ul className="text-[10px] text-[var(--text-color-muted)] space-y-1">
            <li>• 60–90 min focus sprints.</li>
            <li>• 3 key outcomes per day.</li>
            <li>• Protected no-distraction blocks.</li>
          </ul>
        </div>

        <div className="modern-card rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/95 p-4">
          <h3 className="text-sm font-semibold mb-1">
            Stillness & Nervous System
          </h3>
          <p className="text-[10px] text-[var(--text-color-muted)] mb-2">
            Micro-practices for operators:
          </p>
          <ul className="text-[10px] text-[var(--text-color-muted)] space-y-1">
            <li>• 3-minute breathing pre-high stakes calls.</li>
            <li>• Label thoughts during stress spikes.</li>
            <li>• Micro resets between context switches.</li>
          </ul>
        </div>

        <div className="modern-card rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/95 p-4">
          <h3 className="text-sm font-semibold mb-1">Cognitive Tools</h3>
          <p className="text-[10px] text-[var(--text-color-muted)] mb-2">
            Future integrations & dashboards:
          </p>
          <ul className="text-[10px] text-[var(--text-color-muted)] space-y-1">
            <li>• Journaling prompts & reflections.</li>
            <li>• Mood & focus tracking widgets.</li>
            <li>• Calendar-linked deep work sessions.</li>
          </ul>
        </div>
      </section>

      {/* Articles */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-lg md:text-xl font-semibold">
            Essays on calm, cognition & focus
          </h2>
          <Link
            to="/articles"
            className="text-[9px] text-[var(--c0)] hover:underline"
          >
            View all articles →
          </Link>
        </div>

        {highlightArticles.length ? (
          <div className="grid md:grid-cols-3 gap-6">
            {highlightArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-[10px] text-[var(--text-color-muted)] italic">
            Calm & focus essays coming soon.
          </p>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-2xl">
        <div className="modern-card rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/95 p-5">
          <h3 className="text-sm md:text-base font-semibold mb-1">
            “Finance Meets Flow” Brief
          </h3>
          <p className="text-[10px] text-[var(--text-color-muted)] mb-3">
            A short weekly (mock) note on staying sharp, stable and effective
            while you build.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] bg-[var(--c0)] text-white hover:opacity-90 transition-all"
          >
            Join the calm + focus list
          </Link>
        </div>
      </section>
    </div>
  );
};

export default CalmFocusPage;
