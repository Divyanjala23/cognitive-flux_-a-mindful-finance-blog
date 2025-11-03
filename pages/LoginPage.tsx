import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ZenButton from '../components/ZenButton';
import BrainCircuitIcon from '../components/icons/BrainCircuitIcon';

interface LoginPageProps {
    onLogin: (username: string, password: string) => boolean;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(username, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-color)]">
      <div className="w-full max-w-md bg-[var(--card-bg)] backdrop-blur-lg rounded-2xl p-8 border border-[var(--card-border)]">
        <div className="text-center mb-8">
          <BrainCircuitIcon className="h-16 w-16 text-emerald-500 mx-auto" />
          <h1 className="text-3xl font-bold text-[var(--heading-color)] font-heading mt-4">Login</h1>
          <p className="text-[var(--text-color-muted)]">Access your Cognitive Flux account.</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-[var(--text-color)] mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-[var(--heading-color)]
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              placeholder="e.g. jane"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-[var(--text-color)] mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-[var(--heading-color)]
                         focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow"
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="text-red-500 dark:text-red-400 text-center mb-4">{error}</p>}
          <ZenButton type="submit" className="w-full">
            Login
          </ZenButton>
        </form>
        <p className="text-center text-[var(--text-color-muted)] mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="font-semibold text-emerald-500 hover:text-emerald-400 transition-colors">
                Sign up
            </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;