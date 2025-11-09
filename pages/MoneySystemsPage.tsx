// pages/MoneySystemsPage.tsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { Article } from '../types';
import ArticleCard from '../components/ArticleCard';

type Props = {
  articles: Article[];
};

const MoneySystemsPage: React.FC<Props> = ({ articles }) => {
  const navigate = useNavigate();
  const financeArticles = articles.filter(
    (a) => a.category === 'Finance'
  );

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
          Cognitive Flux • The Wealth Engine
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold">
          I want better money systems.
        </h1>
        <p className="mt-3 text-sm md:text-base text-[var(--text-color-muted)]">
          A focused hub for financial frameworks, tools, and (future) AI
          insights that help you automate wealth, design sane risk, and stay
          calm while your money compounds.
        </p>
      </header>

      {/* System tiles */}
      <section className="grid md:grid-cols-3 gap-5 mb-12">
        <div className="modern-card rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/95 p-4">
          <h3 className="text-sm font-semibold mb-1">
            Financial Stack Overview
          </h3>
          <p className="text-[10px] text-[var(--text-color-muted)] mb-2">
            Pillars of a healthy money engine:
          </p>
          <ul className="text-[10px] text-[var(--text-color-muted)] space-y-1">
            <li>• 3–6 months emergency runway.</li>
            <li>• Automated investing on fixed dates.</li>
            <li>• Aggressive plan for high-interest debt.</li>
          </ul>
        </div>

        <div className="modern-card rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/95 p-4">
          <h3 className="text-sm font-semibold mb-1">
            AI Optimization Concepts
          </h3>
          <p className="text-[10px] text-[var(--text-color-muted)] mb-2">
            Where an AI co-pilot slots in:
          </p>
          <ul className="text-[10px] text-[var(--text-color-muted)] space-y-1">
            <li>• Spot unused subscriptions.</li>
            <li>• Detect idle cash & suggest reallocations.</li>
            <li>• Alert when risk drifts off target.</li>
          </ul>
        </div>

        <div className="modern-card rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/95 p-4">
          <h3 className="text-sm font-semibold mb-1">Tools & Resources</h3>
          <p className="text-[10px] text-[var(--text-color-muted)] mb-2">
            Blocks you can later turn into real utilities:
          </p>
          <ul className="text-[10px] text-[var(--text-color-muted)] space-y-1">
            <li>• Expense & cashflow tracker.</li>
            <li>• Compounding / runway calculators.</li>
            <li>• Goal planner (house, runway, freedom number).</li>
          </ul>
        </div>
      </section>

      {/* Finance Articles */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-lg md:text-xl font-semibold">
            Essays on money systems
          </h2>
          <Link
            to="/articles"
            className="text-[9px] text-[var(--c0)] hover:underline"
          >
            View all articles →
          </Link>
        </div>

        {financeArticles.length ? (
          <div className="grid md:grid-cols-3 gap-6">
            {financeArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-[10px] text-[var(--text-color-muted)] italic">
            Finance essays coming soon.
          </p>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-2xl">
        <div className="modern-card rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/95 p-5">
          <h3 className="text-sm md:text-base font-semibold mb-1">
            Cognitive Flux Finance Signals
          </h3>
          <p className="text-[10px] text-[var(--text-color-muted)] mb-3">
            A concise weekly (mock) brief on systems, risk, and calm
            compounding. Educational only.
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] bg-[var(--c0)] text-white hover:opacity-90 transition-all"
          >
            Join the finance list
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MoneySystemsPage;
