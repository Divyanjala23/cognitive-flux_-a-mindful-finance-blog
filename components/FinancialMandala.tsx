import React from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const FinancialMandala: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative mx-auto mt-16 flex w-full max-w-[560px] flex-col items-center justify-center cool-cycle">
      <div
        className="absolute inset-0 rounded-full opacity-20"
        style={{
          background:
            'radial-gradient(circle at center, var(--g0), transparent 70%)',
        }}
      />
      <svg
        viewBox="0 0 200 200"
        className="relative w-full max-w-xs"
        style={{
          animation: prefersReducedMotion
            ? 'none'
            : 'float 14s ease-in-out infinite',
        }}
      >
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="var(--c0)"
          strokeOpacity="0.18"
        />
        <circle
          cx="100"
          cy="100"
          r="45"
          fill="none"
          stroke="var(--c2)"
          strokeOpacity="0.22"
        />
        <circle
          cx="100"
          cy="100"
          r="22"
          fill="var(--c0)"
          fillOpacity="0.12"
        />
        {[0, 72, 144].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 100 + 65 * Math.cos(rad);
          const y = 100 + 65 * Math.sin(rad);
          return (
            <circle
              key={`outer-${i}`}
              cx={x}
              cy={y}
              r="4"
              fill="var(--c3)"
              fillOpacity="0.6"
            />
          );
        })}
        {[0, 120, 240].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 100 + 35 * Math.cos(rad);
          const y = 100 + 35 * Math.sin(rad);
          return (
            <circle
              key={`inner-${i}`}
              cx={x}
              cy={y}
              r="3"
              fill="var(--c1)"
              fillOpacity="0.8"
            />
          );
        })}
        <text
          x="100"
          y="103"
          textAnchor="middle"
          fontSize="7"
          fill="var(--text-color-base)"
          fillOpacity="0.9"
        >
          calm &gt; chaos
        </text>
      </svg>
      <p className="mt-3 text-[9px] text-[var(--text-color-muted)] text-center max-w-xs">
        Outer chaos (markets, news). Inner clarity (systems, mind). Cognitive
        Flux sits in the center.
      </p>
    </div>
  );
};

export default FinancialMandala;
