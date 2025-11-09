import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';

import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import MoneySystemsPage from './pages/MoneySystemsPage';
import CalmFocusPage from './pages/CalmFocusPage';

import { mockArticles, mockUsers } from './services/mockData';
import type { Article, User } from './types';

const AdminProtectedRoute: React.FC<{ currentUser: User | null }> = ({
  currentUser,
}) => {
  if (currentUser?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const PageLayout: React.FC<{ children: React.ReactNode; currentUser: User | null; onLogout: () => void; theme: 'light' | 'dark'; toggleTheme: () => void; }> = ({
  children,
  currentUser,
  onLogout,
  theme,
  toggleTheme,
}) => (
  <div className="flex flex-col min-h-screen bg-[var(--bg-color)] text-[var(--text-color-base)] transition-colors duration-300 font-sans">
    <Header
      currentUser={currentUser}
      onLogout={onLogout}
      theme={theme}
      toggleTheme={toggleTheme}
    />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

const AppInner: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const handleLogin = (username: string, password: string): boolean => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const handleSignup = (username: string, password: string): boolean => {
    if (users.find((u) => u.username === username)) {
      return false;
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      username,
      password,
      role: 'user',
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const handleLogout = () => setCurrentUser(null);

  return (
    <>
      <ScrollToTop />
      <AnimatedBackground theme={theme}>
        <Routes>
          {/* Auth */}
          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} />}
          />
          <Route
            path="/signup"
            element={<SignupPage onSignup={handleSignup} />}
          />

          {/* Public pages with layout */}
          <Route
            path="/"
            element={
              <PageLayout
                currentUser={currentUser}
                onLogout={handleLogout}
                theme={theme}
                toggleTheme={toggleTheme}
              >
                <HomePage articles={articles} />
              </PageLayout>
            }
          />
          <Route
            path="/articles"
            element={
              <PageLayout
                currentUser={currentUser}
                onLogout={handleLogout}
                theme={theme}
                toggleTheme={toggleTheme}
              >
                <BlogPage articles={articles} />
              </PageLayout>
            }
          />
          <Route
            path="/article/:id"
            element={
              <PageLayout
                currentUser={currentUser}
                onLogout={handleLogout}
                theme={theme}
                toggleTheme={toggleTheme}
              >
                <ArticlePage articles={articles} />
              </PageLayout>
            }
          />
          <Route
            path="/money-systems"
            element={
              <PageLayout
                currentUser={currentUser}
                onLogout={handleLogout}
                theme={theme}
                toggleTheme={toggleTheme}
              >
                <MoneySystemsPage articles={articles} />
              </PageLayout>
            }
          />
          <Route
            path="/calm-focus"
            element={
              <PageLayout
                currentUser={currentUser}
                onLogout={handleLogout}
                theme={theme}
                toggleTheme={toggleTheme}
              >
                <CalmFocusPage articles={articles} />
              </PageLayout>
            }
          />

          {/* Admin */}
          <Route
            element={<AdminProtectedRoute currentUser={currentUser} />}
          >
            <Route
              path="/admin/dashboard"
              element={
                <PageLayout
                  currentUser={currentUser}
                  onLogout={handleLogout}
                  theme={theme}
                  toggleTheme={toggleTheme}
                >
                  <AdminDashboardPage
                    articles={articles}
                    setArticles={setArticles}
                    currentUser={currentUser}
                  />
                </PageLayout>
              }
            />
          </Route>

          {/* About */}
          <Route
            path="/about"
            element={
              <PageLayout
                currentUser={currentUser}
                onLogout={handleLogout}
                theme={theme}
                toggleTheme={toggleTheme}
              >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center min-h-[60vh] flex flex-col justify-center items-center">
                  <h1 className="text-4xl font-bold font-heading">
                    About Cognitive Flux
                  </h1>
                  <p className="mt-4 max-w-2xl mx-auto text-[var(--text-color-muted)]">
                    Demo publication for high-signal insights at the
                    intersection of wealth, mindfulness, and AI leverage.
                  </p>
                </div>
              </PageLayout>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatedBackground>
    </>
  );
};

const App: React.FC = () => (
  <Router>
    <AppInner />
  </Router>
);

export default App;
