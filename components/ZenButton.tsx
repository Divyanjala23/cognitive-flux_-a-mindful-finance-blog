import React from 'react';

interface ZenButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const ZenButton: React.FC<ZenButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`px-8 py-3 rounded-full font-bold text-white bg-emerald-500
                 transition-all duration-300 ease-in-out
                 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/40
                 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75
                 disabled:opacity-50 disabled:cursor-not-allowed
                 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ZenButton;