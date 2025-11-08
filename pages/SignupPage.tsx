import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ZenButton from "../components/ZenButton";
import BrainCircuitIcon from "../components/icons/BrainCircuitIcon";

interface SignupPageProps {
  onSignup: (username: string, password: string) => boolean;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignup }) => {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) return setError("Please enter a username.");
    if (!password.trim()) return setError("Please enter a password.");
    if (password !== confirm) return setError("Passwords do not match.");

    const success = onSignup(username.trim(), password);
    if (success) nav("/");
    else setError("Username is already taken.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-color)]">
      {/* Back to Home */}
      <button
        onClick={() => nav("/")}
        className="absolute top-6 left-6 text-[var(--text-color-muted)] hover:text-[var(--c0)] transition-colors flex items-center gap-2"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        <span>Back to Home</span>
      </button>

      <div
        className="relative w-full max-w-md rounded-3xl p-1 shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--c0) 35%, transparent), color-mix(in oklab, var(--c2) 25%, transparent))",
        }}
      >
        <div className="rounded-[22px] border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-[color-mix(in_oklab,var(--c0)_10%,transparent)] ring-1 ring-[color-mix(in_oklab,var(--c0)_35%,transparent)]">
              <BrainCircuitIcon
                className="h-9 w-9"
                style={{ color: "var(--c0)" }}
              />
            </div>
            <h1 className="text-3xl font-bold font-heading mt-4 text-[var(--heading-color)]">
              Create Account
            </h1>
            <p className="text-[var(--text-color-muted)]">
              Join the Cognitive Flux community.
            </p>
          </div>

          <form onSubmit={handleSignup} noValidate className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm mb-1 text-[var(--text-color)]"
              >
                Username
              </label>
              <input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[var(--heading-color)] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Choose a username"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm mb-1 text-[var(--text-color)]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[var(--heading-color)] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirm"
                className="block text-sm mb-1 text-[var(--text-color)]"
              >
                Confirm Password
              </label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-xl px-4 py-2.5 bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-[var(--heading-color)] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <p
                className="text-sm text-rose-500 text-center"
                role="alert"
                aria-live="assertive"
              >
                {error}
              </p>
            )}

            <ZenButton type="submit" className="w-full">
              Sign Up
            </ZenButton>

            <p className="text-center text-[var(--text-color-muted)] mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-emerald-500 hover:text-emerald-400 transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
