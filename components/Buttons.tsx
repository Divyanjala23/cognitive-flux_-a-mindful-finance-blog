import React from 'react';

export const ModernButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className = '', children, ...rest }) => (
  <button
    {...rest}
    className={`cool-cycle btn-hueshift inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${className}`}
  >
    {children}
  </button>
);

export const ModernGhostButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ className = '', children, ...rest }) => (
  <button
    {...rest}
    className={`cool-cycle btn-ghost-hueshift inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-300 ${className}`}
  >
    {children}
  </button>
);
