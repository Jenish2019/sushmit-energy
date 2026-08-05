'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { SignIn, Eye, EyeSlash, CircleNotch } from '@phosphor-icons/react/dist/ssr';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid email or password');
        setLoading(false);
        return;
      }
      router.replace('/admin/dashboard');
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <PageHero title="Admin Login" subtitle="Sign in to the Sushmit Energy admin panel" />

        <section className="section-padding">
          <div className="container">
            <div className="login-wrapper">
              <div className="login-card">
                <div className="login-header">
                  <SignIn size={32} />
                  <h2>Sign In</h2>
                  <p>Authorized personnel only</p>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@gmail.com"
                      required
                      autoFocus
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <div className="password-wrapper">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  {error && <div className="login-error">{error}</div>}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                    disabled={loading}
                  >
                    {loading ? <CircleNotch size={18} className="spin" /> : <SignIn size={18} />}
                    {loading ? 'Signing In...' : 'Sign In'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .login-wrapper {
          display: flex;
          justify-content: center;
        }
        .login-card {
          width: 100%;
          max-width: 420px;
          background: var(--bg-white);
          border-radius: var(--radius-lg);
          padding: 40px;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
        }
        .login-header {
          text-align: center;
          margin-bottom: 32px;
        }
        .login-header svg {
          color: var(--primary-blue);
          margin-bottom: 12px;
        }
        .login-header h2 {
          font-size: 1.5rem;
          margin-bottom: 6px;
        }
        .login-header p {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group label {
          font-size: 0.9rem;
          font-weight: 600;
        }
        .form-input {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          transition: border-color 0.3s, box-shadow 0.3s;
          outline: none;
          font-family: inherit;
        }
        .form-input:focus {
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 3px rgba(12,80,160,0.1);
        }
        .password-wrapper {
          position: relative;
        }
        .password-wrapper .form-input {
          padding-right: 44px;
        }
        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          display: flex;
        }
        .password-toggle:hover {
          color: var(--text-dark);
        }
        .login-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
        }
        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .spin {
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .login-card {
            padding: 28px 24px;
          }
        }
      `}</style>
    </>
  );
}
