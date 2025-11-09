import React from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const AnimatedBackground: React.FC<{ theme: 'light' | 'dark'; children: React.ReactNode }> = ({ children }) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const coolCycleClass = prefersReducedMotion ? '' : 'cool-cycle';

  return (
    <div className={`relative min-h-screen ${coolCycleClass}`}>
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute top-[15%] left-[10%] w-[500px] h-[500px] blur-[140px] rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--g0), transparent 70%)',
            animation: prefersReducedMotion ? 'none' : 'float 18s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] blur-[180px] rounded-full"
          style={{
            background: 'radial-gradient(circle, var(--g1), transparent 70%)',
            animation: prefersReducedMotion ? 'none' : 'float 22s ease-in-out 4s infinite',
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default AnimatedBackground;
