import React, { useState } from 'react';
import { ModernButton } from '../Buttons';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'done'>('idle');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setState('done'); // mock only
  };

  return (
    <section className="mt-24">
      <div className="max-w-3xl mx-auto modern-card rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/95 backdrop-blur-xl p-6 sm:p-8 text-center">
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: 'var(--c0)' }}
        >
          Season 01 • The Cognitive Flux Blueprint
        </p>
        <h3 className="mt-3 text-xl md:text-2xl font-bold">
          Get one high-signal lesson each week.
        </h3>
        <p className="mt-2 text-xs md:text-sm text-[var(--text-color-muted)]">
          No spam. One email. One mental model for money, focus, or work.
          Designed to be read in &lt; 5 minutes and implemented the same day.
        </p>
        <form
          onSubmit={onSubmit}
          className="mt-5 flex flex-col sm:flex-row gap-3 items-center justify-center"
        >
          <input
            type="email"
            placeholder="Enter your best email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full sm:w-64 px-3 py-2 rounded-xl bg-[var(--bg-color)]/60 border border-[var(--card-border)] text-[var(--text-color-base)] text-xs focus:outline-none focus:ring-2 focus:ring-[var(--c0)]"
          />
          <ModernButton type="submit">
            {state === 'done' ? 'Joined' : 'Join the Flux'}
          </ModernButton>
        </form>
        {state === 'done' && (
          <p className="mt-2 text-[10px] text-[var(--c0)]">
            Nice. If this were live, your first Cognitive Flux brief would
            already be queued.
          </p>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;
