import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BrainCircuitIcon from './icons/BrainCircuitIcon';
import type { User } from '../types';

interface HeaderProps {
  currentUser: User | null;
  onLogout: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

/* ---------- Icons ---------- */
const ThemeToggleIcon: React.FC<{ theme: 'light' | 'dark' }> = ({ theme }) =>
  theme === 'dark' ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  );

/* ---------- Helpers ---------- */
function useScrollDir() {
  const [dir, setDir] = useState<'up' | 'down'>('up');
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (Math.abs(y - lastY.current) > 6) {
        setDir(y > lastY.current ? 'down' : 'up');
        lastY.current = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return dir;
}
function useScrolled(threshold = 10) {
  const [scrolled, set] = useState(false);
  useEffect(() => {
    const onScroll = () => set(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return progress;
}

/* Active link with animated underline */
const ActiveNavLink: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => {
  const location = useLocation();
  const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`relative px-1 py-1 text-[var(--text-color-muted)] hover:text-[var(--heading-color)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 rounded`}
      aria-current={active ? 'page' : undefined}
    >
      <span className="relative z-10">{children}</span>
      <span
        className={`pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-full rounded bg-gradient-to-r from-emerald-500 via-emerald-400 to-indigo-400 transition-all duration-300 ${
          active ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
      />
    </Link>
  );
};

/* Avatar chip from initials (when logged in) */
const AvatarChip: React.FC<{ name: string }> = ({ name }) => {
  const initials = useMemo(() => name.trim().split(/\s+/).map(s => s[0]?.toUpperCase()).slice(0,2).join(''), [name]);
  return (
    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-semibold ring-1 ring-emerald-500/30">
      {initials || 'U'}
    </div>
  );
};

/* Quick Search (Command-Palette style) */
const QuickSearch: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) navigate(`/articles?search=${encodeURIComponent(q.trim())}`);
    onClose();
  };

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/30 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={submit} className="flex items-center gap-3">
          <svg className="h-5 w-5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles, topics, authors…"
            className="flex-1 bg-transparent outline-none text-[var(--text-color)] placeholder:text-[var(--text-color-muted)]"
            aria-label="Search"
          />
          <button
            type="submit"
            className="rounded-lg bg-emerald-500 px-3 py-1.5 text-white hover:bg-emerald-600 transition"
          >
            Search
          </button>
        </form>
        <div className="mt-2 text-[10px] text-[var(--text-color-muted)]">Tip: press <kbd className="rounded bg-black/10 px-1">Ctrl</kbd>/<kbd className="rounded bg-black/10 px-1">⌘</kbd>+<kbd className="rounded bg-black/10 px-1">K</kbd> to open fast</div>
      </div>
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout, theme, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const location = useLocation();
  const dir = useScrollDir();
  const isScrolled = useScrolled(10);
  const progress = useScrollProgress();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Keyboard shortcut for Quick Search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setQuickOpen((v) => !v);
      }
      if (e.key === 'Escape') setQuickOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Header classes
  const headerBase =
    'sticky top-0 z-50 transition-all duration-300 will-change-transform';
  const translateClass =
    dir === 'down' && isScrolled ? '-translate-y-full' : 'translate-y-0';
  const headerBgClass = isScrolled || isMenuOpen
    ? 'bg-[var(--header-bg)] backdrop-blur-lg border-b border-[var(--card-border)] shadow-[0_6px_30px_rgba(15,23,42,0.06)]'
    : 'bg-transparent';

  const linkColorClass = 'text-[var(--text-color-muted)] hover:text-[var(--heading-color)] transition-colors';
  const mobileLinkColorClass = `block ${linkColorClass} py-2 rounded-md px-3`;

  // Small user dropdown (desktop)
  const [userOpen, setUserOpen] = useState(false);

  const NavLinks: React.FC<{ isMobile?: boolean }> = ({ isMobile }) => (
    <>
      <ActiveNavLink to="/" onClick={() => isMobile && setIsMenuOpen(false)}>Home</ActiveNavLink>
      <ActiveNavLink to="/about" onClick={() => isMobile && setIsMenuOpen(false)}>About</ActiveNavLink>
      <ActiveNavLink to="/articles" onClick={() => isMobile && setIsMenuOpen(false)}>Articles</ActiveNavLink>

      {currentUser ? (
        <>
          {currentUser.role === 'admin' && (
            <ActiveNavLink to="/admin/dashboard" onClick={() => isMobile && setIsMenuOpen(false)}>
              Dashboard
            </ActiveNavLink>
          )}
          {!isMobile && (
            <div className="relative">
              <button
                onClick={() => setUserOpen((v) => !v)}
                className="ml-2 inline-flex items-center gap-2 rounded-lg px-2 py-1 text-[var(--text-color)] hover:bg-black/5 dark:hover:bg-white/5 transition"
                aria-haspopup="menu"
                aria-expanded={userOpen}
              >
                <AvatarChip name={currentUser.username || 'User'} />
                <span className="hidden xl:inline text-sm">{currentUser.username}</span>
                <svg className={`h-4 w-4 transition-transform ${userOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
                </svg>
              </button>
              {userOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] shadow-lg"
                  role="menu"
                >
                  <Link to="/profile" className="block px-3 py-2 text-sm text-[var(--text-color)] hover:bg-black/5 dark:hover:bg-white/5" role="menuitem">Profile</Link>
                  <Link to="/settings" className="block px-3 py-2 text-sm text-[var(--text-color)] hover:bg-black/5 dark:hover:bg-white/5" role="menuitem">Settings</Link>
                  <button onClick={onLogout} className="block w-full text-left px-3 py-2 text-sm text-[var(--text-color)] hover:bg-black/5 dark:hover:bg-white/5" role="menuitem">
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          {isMobile && (
            <button
              onClick={onLogout}
              className={`block w-full text-left ${mobileLinkColorClass}`}
            >
              Logout
            </button>
          )}
        </>
      ) : (
        <>
          <ActiveNavLink to="/login" onClick={() => isMobile && setIsMenuOpen(false)}>Login</ActiveNavLink>
          <ActiveNavLink to="/signup" onClick={() => isMobile && setIsMenuOpen(false)}>Signup</ActiveNavLink>
        </>
      )}
    </>
  );

  return (
    <>
      {/* scroll progress */}
      <div
        className="fixed left-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-emerald-500 via-emerald-400 to-indigo-400 transition-[width] duration-200"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <header className={`${headerBase} ${headerBgClass} ${translateClass}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand */}
            <Link to="/" className="flex items-center space-x-3 text-[var(--heading-color)] hover:text-emerald-400 transition-colors">
              <BrainCircuitIcon className="h-7 w-7 text-emerald-500" />
              <span className="text-2xl font-bold font-heading">Cognitive Flux</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <NavLinks />

              {/* Quick Search button */}
              <button
                onClick={() => setQuickOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-[var(--text-color-muted)] hover:text-[var(--heading-color)] hover:bg-black/5 dark:hover:bg-white/5 transition"
                aria-label="Open quick search"
                title="Search (Ctrl/⌘ + K)"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                <span className="hidden lg:inline text-sm">Search</span>
                <span className="ml-1 hidden lg:inline text-[10px] rounded border border-black/20 px-1">Ctrl/⌘+K</span>
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="rounded-lg p-1 text-[var(--text-color-muted)] hover:text-[var(--heading-color)] hover:bg-black/5 dark:hover:bg-white/5 transition"
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                <ThemeToggleIcon theme={theme} />
              </button>
            </nav>

            {/* Mobile controls */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setQuickOpen(true)}
                className={linkColorClass}
                aria-label="Open quick search"
                title="Search"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
              </button>
              <button onClick={toggleTheme} className={linkColorClass} aria-label="Toggle theme">
                <ThemeToggleIcon theme={theme} />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-[var(--text-color-muted)] hover:text-[var(--heading-color)] focus:outline-none"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sheet */}
        <div
          className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}
          aria-hidden={!isMenuOpen}
        >
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6 lg:px-8 bg-[var(--header-bg)] backdrop-blur-lg border-t border-[var(--card-border)]">
            <NavLinks isMobile />
          </div>
        </div>
      </header>

      {/* Quick Search Modal */}
      <QuickSearch open={quickOpen} onClose={() => setQuickOpen(false)} />

      {/* Reduced motion respect */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .transition-all, .transition-colors, .transition { transition: none !important; }
        }
      `}</style>
    </>
  );
};

export default Header;
