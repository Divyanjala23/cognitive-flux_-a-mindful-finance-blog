import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BrainCircuitIcon from '../components/icons/BrainCircuitIcon';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();

  // Redirect automatically after 5 seconds to the new login page.
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-color)]">
      <div className="w-full max-w-md bg-[var(--card-bg)] backdrop-blur-lg rounded-2xl p-8 border border-[var(--card-border)] text-center">
        <BrainCircuitIcon className="h-16 w-16 text-emerald-500 mx-auto" />
        <h1 className="text-3xl font-bold text-[var(--heading-color)] font-heading mt-4">Login Page Moved</h1>
        <p className="text-[var(--text-color-muted)] mt-4">
          This dedicated admin login page is no longer in use. All users, including administrators, should now log in through the main login page.
        </p>
        <div className="mt-8">
          <Link 
            to="/login" 
            className="px-8 py-3 rounded-full font-bold text-white bg-emerald-500
                       transition-all duration-300 ease-in-out
                       hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/40"
          >
            Go to Login Page
          </Link>
        </div>
        <p className="text-sm text-[var(--text-color-muted)] mt-4">You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default AdminLoginPage;