import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AnimatedBackground from './components/AnimatedBackground';

import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

import { mockArticles, mockUsers } from './services/mockData';
import type { Article, User } from './types';

const AdminProtectedRoute: React.FC<{ currentUser: User | null }> = ({ currentUser }) => {
  if (currentUser?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


const App: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
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

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const handleLogin = (username: string, password: string):boolean => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const handleSignup = (username: string, password: string):boolean => {
    if (users.find(u => u.username === username)) {
      return false; // Username already exists
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      username,
      password,
      role: 'user',
    };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };
  
  const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex flex-col min-h-screen bg-[var(--bg-color)] text-[var(--text-color)] transition-colors duration-300 font-sans">
      <Header currentUser={currentUser} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
  
  const basename = window.location.pathname.match(/^(\/[^/]+)/)?.[1] || '/';

  return (
    <Router basename={basename}>
      <ScrollToTop />
      <AnimatedBackground theme={theme}>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
          
          <Route path="/" element={<PageLayout><HomePage articles={articles} /></PageLayout>} />
          <Route path="/articles" element={<PageLayout><BlogPage articles={articles} /></PageLayout>} />
          <Route path="/article/:id" element={<PageLayout><ArticlePage articles={articles} /></PageLayout>} />
          
          <Route element={<AdminProtectedRoute currentUser={currentUser} />}>
            <Route path="/admin/dashboard" element={<PageLayout><AdminDashboardPage articles={articles} setArticles={setArticles} currentUser={currentUser} /></PageLayout>} />
          </Route>
          
          <Route path="/about" element={
            <PageLayout>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center min-h-[60vh] flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold font-heading">About Cognitive Flux</h1>
                <p className="mt-4 max-w-2xl mx-auto text-[var(--text-color-muted)]">This is a demo application showcasing a blog platform with AI-powered features, built with React, TypeScript, Tailwind CSS, and the Google Gemini API.</p>
              </div>
            </PageLayout>
          } />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AnimatedBackground>
    </Router>
  );
};

export default App;