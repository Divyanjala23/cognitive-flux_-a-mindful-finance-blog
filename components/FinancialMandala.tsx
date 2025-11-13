import React from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * SignatureMandala — a minimal, elegant hero accent
 * Goals:
 * - Subtle, professional animations (show craftsmanship without distraction)
 * - Tiny, dependency‑free SVG with CSS keyframes
 * - Honors prefers-reduced-motion
 * - No mouse interactions, no heavy effects
 * - Theme‑aware via your CSS variables
 */
const SignatureMandala: React.FC<{ size?: number; className?: string }>
= ({ size = 280, className }) => {
  const reduce = usePrefersReducedMotion();
  const box = size;
  const cx = box / 2;
  const cy = box / 2;

  return (
    <div className={"relative mx-auto my-10 " + (className ?? '')}>
      {/* soft radial wash */}
      <div className="pointer-events-none absolute -inset-6 blur-2xl opacity-30"
           style={{ background: 'radial-gradient(60% 60% at 50% 50%, var(--g0), transparent 70%)' }} />

      <svg viewBox={`0 0 ${box} ${box}`} width={box} height={box} className="block mx-auto">
        <defs>
          <radialGradient id="sg-core" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="var(--c0)" stopOpacity="0.55" />
            <stop offset="70%" stopColor="var(--c0)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sg-ring" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--c1)" />
            <stop offset="50%" stopColor="var(--c2)" />
            <stop offset="100%" stopColor="var(--c3)" />
          </linearGradient>
        </defs>

        {/* core */}
        <circle cx={cx} cy={cy} r={box*0.18} fill="url(#sg-core)">
          {!reduce && (
            <animate attributeName="r" dur="4s" values={`${box*0.17};${box*0.19};${box*0.17}`} repeatCount="indefinite" />
          )}
        </circle>

        {/* thin rings (counter‑rotate) */}
        <g fill="none" stroke="url(#sg-ring)" strokeLinecap="round">
          <circle cx={cx} cy={cy} r={box*0.34} strokeWidth={1.6} strokeDasharray="6 12" style={{ transformOrigin: 'center', animation: reduce ? undefined : 'sg-cw 28s linear infinite' }} />
          <circle cx={cx} cy={cy} r={box*0.26} strokeWidth={1.4} strokeDasharray="4 10" opacity={0.9} style={{ transformOrigin: 'center', animation: reduce ? undefined : 'sg-ccw 20s linear infinite' }} />
        </g>

        {/* three small orbits on a single path (very subtle) */}
        {!reduce && (
          <>
            <circle cx={cx} cy={cy} r={box*0.34} fill="none" stroke="transparent" id="sg-path" />
            {[0, 0.2, 0.45].map((delay, i) => (
              <circle key={i} r={box*0.008} fill="var(--c0)" opacity={0.75}>
                <animateMotion dur={`${12 + i*2}s`} begin={`${-delay*12}s`} repeatCount="indefinite" rotate="auto">
                  <mpath href="#sg-path" />
                </animateMotion>
              </circle>
            ))}
          </>
        )}
      </svg>

      {/* keyframes */}
      <style>{`
        @keyframes sg-cw { to { transform: rotate(360deg); } }
        @keyframes sg-ccw { to { transform: rotate(-360deg); } }
      `}</style>
    </div>
  );
};

export default SignatureMandala;