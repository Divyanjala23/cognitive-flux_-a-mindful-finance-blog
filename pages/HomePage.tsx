import React from 'react';
import type { Article } from '../types';
import { useNavigate } from 'react-router-dom';

import { ModernButton, ModernGhostButton } from '../components/Buttons';
import ArticleCard from '../components/ArticleCard';
import Tilt from '../components/Tilt';
import FinancialMandala from '../components/FinancialMandala';

import WhyCognitiveFluxSection from '../components/sections/WhyCognitiveFluxSection';
import CategorySections from '../components/sections/CategorySections';
import TrendingSection from '../components/sections/TrendingSection';
import NewsletterSection from '../components/sections/NewsletterSection';
import { useReveal } from '../hooks/useReveal';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const HomePage: React.FC<{ articles: Article[] }> = ({ articles }) => {
  const featuredArticles = articles.slice(0, 3);
  const heroArticle = articles[0];
  const hero = useReveal<HTMLDivElement>();
  const grid = useReveal<HTMLDivElement>({ threshold: 0.05 });
  const prefersReducedMotion = usePrefersReducedMotion();
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden min-h-screen">
      {/* HERO */}
      <section className="relative">
        <div
          ref={hero.ref}
          className={[
            'container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-40 text-center flex flex-col items-center',
            'transition-all duration-1000 ease-out',
            prefersReducedMotion
              ? 'opacity-100 translate-y-0'
              : hero.visible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10',
          ].join(' ')}
        >
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium backdrop-blur-md"
            style={{
              color: 'var(--c0)',
              border:
                '1px solid color-mix(in oklab, var(--c0) 25%, transparent)',
              background:
                'color-mix(in oklab, var(--c0) 6%, transparent)',
            }}
          >
            <span className="relative flex h-2 w-2">
              <span
                className="absolute h-full w-full rounded-full"
                style={{ background: 'var(--c0)', opacity: 0.6 }}
              />
              <span
                className="relative h-2 w-2 rounded-full"
                style={{ background: 'var(--c0)' }}
              />
            </span>
            A signal-only library for serious builders.
          </div>

          <h1
            className="mt-6 text-5xl md:text-7xl font-bold tracking-tight"
            style={{
              textShadow:
                '0 0 4px rgba(255,255,255,0.2), 0 0 1px rgba(255,255,255,0.1)',
              WebkitFontSmoothing: 'antialiased',
            }}
          >
            Cognitive Flux
          </h1>

          <p
            className="mt-6 max-w-2xl text-lg md:text-xl text-[var(--text-color-muted)] leading-relaxed"
            style={{
              animation: prefersReducedMotion
                ? 'none'
                : 'fadeInUp 0.8s ease-out 0.4s both',
            }}
          >
            Where disciplined finance, deep work, and inner stillness converge
            to give you quiet confidence in money and mind.
          </p>
          <p
            className="mt-2 max-w-2xl text-base md:text-lg text-[var(--text-color-muted)]/80"
            style={{
              animation: prefersReducedMotion
                ? 'none'
                : 'fadeInUp 0.8s ease-out 0.5s both',
            }}
          >
            Master your wealth. Master your attention. Use AI as leverage, not
            noise.
          </p>

          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            style={{
              animation: prefersReducedMotion
                ? 'none'
                : 'fadeInUp 0.8s ease-out 0.6s both',
            }}
          >
            <ModernButton onClick={() => navigate('/money-systems')}>
              📊 I want better money systems
            </ModernButton>
            <ModernGhostButton onClick={() => navigate('/calm-focus')}>
              🧠 I want calm + focus
            </ModernGhostButton>
          </div>

          <p className="mt-4 text-[10px] text-[var(--text-color-muted)]">
            Built for founders, operators, and deep workers who hate generic
            threads.
          </p>

          <FinancialMandala />
        </div>
      </section>

      {/* FEATURED TODAY (card) */}
      {heroArticle && (
        <section className="mt-10">
          <div className="max-w-5xl mx-auto rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/85 backdrop-blur-xl p-1 shadow-lg modern-card">
            <div className="relative overflow-hidden rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative z-10 flex-1">
                <div className="flex items-center gap-2 text-[10px]">
                  <span
                    className="px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: 'rgba(19,194,194,0.08)',
                      color: 'var(--c0)',
                      border: '1px solid rgba(19,194,194,0.35)',
                    }}
                  >
                    Featured Today
                  </span>
                  <span className="text-[var(--text-color-muted)]">
                    {heroArticle.category === 'Finance'
                      ? 'Wealth Engine'
                      : heroArticle.category === 'Tech'
                      ? 'Future Stack'
                      : 'Mind x Money'}
                  </span>
                </div>
                <h2 className="mt-2 text-2xl md:text-3xl font-bold leading-snug">
                  {heroArticle.title}
                </h2>
                <p className="mt-3 text-sm text-[var(--text-color-muted)]">
                  {heroArticle.excerpt}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-[9px] text-[var(--text-color-muted)]">
                  <span>{heroArticle.author}</span>
                  <span>•</span>
                  <span>{heroArticle.date}</span>
                  <span>•</span>
                  <span>{heroArticle.category}</span>
                </div>
                <div className="mt-5">
                  <ModernGhostButton
                    onClick={() => navigate(`/article/${heroArticle.id}`)}
                  >
                    Read this insight
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </ModernGhostButton>
                </div>
              </div>
              <div className="relative z-10 w-full sm:w-56 h-40 sm:h-40 flex-shrink-0 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={heroArticle.imageUrl}
                  alt={heroArticle.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* WHY COGNITIVE FLUX */}
      <WhyCognitiveFluxSection />

      {/* FEATURED INSIGHTS GRID */}
      <section
        ref={grid.ref}
        className={[
          'container mx-auto px-4 sm:px-6 lg:px-8 py-20 transition-all duration-1000 ease-out',
          prefersReducedMotion
            ? 'opacity-100 translate-y-0'
            : grid.visible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10',
        ].join(' ')}
      >
        <div className="text-center mb-16">
          <h2
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{
              background:
                'linear-gradient(135deg, var(--c0), var(--c2))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Featured Insights
          </h2>
          <p className="text-[var(--text-color-muted)] max-w-2xl mx-auto">
            Core essays that rewire how you think about money, risk, work, and
            identity.
          </p>
          <p className="mt-2 text-[10px] text-[var(--text-color-muted)]">
            Curated for high signal. No “5 tips” fluff.
          </p>
          <div
            className="w-24 h-1 mx-auto mt-6 rounded-full"
            style={{
              background:
                'linear-gradient(90deg, transparent, var(--c0), transparent)',
            }}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredArticles.map((article, i) => (
            <div
              key={article.id}
              className="transition-all duration-700 ease-out"
              style={{
                animation:
                  !prefersReducedMotion && grid.visible
                    ? `fadeInUp 0.6s ease-out ${0.1 + i * 0.1}s both`
                    : 'none',
              }}
            >
              <Tilt>
                <div className="modern-card group relative rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-xl p-1 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-xl"
                    style={{
                      background:
                        'radial-gradient(circle at center, var(--g0), transparent 70%)',
                    }}
                  />
                  <div className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">
                    <ArticleCard article={article} />
                  </div>
                </div>
              </Tilt>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORY TRACKS */}
      <CategorySections articles={articles} />

      {/* TRENDING */}
      <TrendingSection articles={articles} />

      {/* NEWSLETTER */}
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
