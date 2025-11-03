import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent text-[var(--text-color-muted)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-t border-[var(--card-border)] pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Cognitive Flux. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link to="/about" className="hover:text-emerald-400 transition-colors">About</Link>
              <Link to="/articles" className="hover:text-emerald-400 transition-colors">Articles</Link>
              <a href="#" className="hover:text-emerald-400 transition-colors">Contact</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;