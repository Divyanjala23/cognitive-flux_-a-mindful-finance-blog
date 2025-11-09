import React from 'react';

const WhyCognitiveFluxSection: React.FC = () => (
  <section className="mt-20">
    <div className="max-w-5xl mx-auto text-center mb-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-3">
        Why Cognitive Flux Exists
      </h2>
      <p className="text-sm md:text-base text-[var(--text-color-muted)] max-w-2xl mx-auto">
        A signal-only publication at the intersection of{' '}
        <span className="text-[var(--c0)]">wealth</span>,{' '}
        <span className="text-[var(--c0)]">mindfulness</span>, and{' '}
        <span className="text-[var(--c0)]">AI leverage</span> — for builders who
        hate generic advice.
      </p>
    </div>
    <div className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
      <div className="modern-card relative rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/90 backdrop-blur-xl p-4 text-left">
        <p className="text-[10px] font-semibold text-[var(--c0)]">
          The Wealth Engine
        </p>
        <h3 className="mt-2 text-base font-semibold">
          Evidence-based money frameworks
        </h3>
        <p className="mt-2 text-xs text-[var(--text-color-muted)]">
          Systems for asymmetric upside, calm cashflow, and sane risk — not
          lottery-ticket thinking.
        </p>
        <p className="mt-3 text-[9px] text-[var(--text-color-muted)]">
          This means you stop winging it with money.
        </p>
      </div>
      <div className="modern-card relative rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/90 backdrop-blur-xl p-4 text-left">
        <p className="text-[10px] font-semibold text-[var(--c0)]">
          The Future Stack
        </p>
        <h3 className="mt-2 text-base font-semibold">
          AI as your unfair advantage
        </h3>
        <p className="mt-2 text-xs text-[var(--text-color-muted)]">
          Use AI to compress research, automate grunt work, and sharpen
          judgment—without drowning in tools.
        </p>
        <p className="mt-3 text-[9px] text-[var(--text-color-muted)]">
          This means you stop being overwhelmed by tech.
        </p>
      </div>
      <div className="modern-card relative rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]/90 backdrop-blur-xl p-4 text-left">
        <p className="text-[10px] font-semibold text-[var(--c0)]">
          The Deep Code
        </p>
        <h3 className="mt-2 text-base font-semibold">
          Mind, stillness & resilience
        </h3>
        <p className="mt-2 text-xs text-[var(--text-color-muted)]">
          Buddhist-informed mental models, deep work, and quiet confidence
          that make you steady under volatility.
        </p>
        <p className="mt-3 text-[9px] text-[var(--text-color-muted)]">
          This means you stop operating in panic mode.
        </p>
      </div>
    </div>
  </section>
);

export default WhyCognitiveFluxSection;
