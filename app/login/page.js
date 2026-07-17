'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { LogIn, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedIn(true);
  };

  if (loggedIn) {
    return (
      <>
        <Header />
        <main>
          <section className="page-banner">
            <div className="page-banner-overlay" />
            <div className="container">
              <h1>Login</h1>
              <p>Investor portal</p>
            </div>
          </section>
          <section className="section-padding">
            <div className="container">
              <div className="dashboard-message">
                <h2>Welcome, Investor</h2>
                <p>Your dashboard is under development. Check back soon for investment reports and portfolio tracking.</p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <style>{`
          .page-banner {
            position: relative;
            padding: 100px 0;
            background: linear-gradient(135deg, var(--primary-blue-dark), var(--primary-blue));
            text-align: center;
            color: white;
          }
          .page-banner-overlay {
            position: absolute;
            inset: 0;
            background: url('https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/themes/sushmitenergy/images/kulekhani.jpg') center/cover no-repeat;
            opacity: 0.1;
          }
          .page-banner .container { position: relative; z-index: 1; }
          .page-banner h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 12px; }
          .page-banner p { font-size: 1.1rem; opacity: 0.85; }
          .dashboard-message {
            text-align: center;
            max-width: 600px;
            margin: 0 auto;
            padding: 60px 40px;
            background: var(--bg-light);
            border-radius: var(--radius-lg);
          }
          .dashboard-message h2 { font-size: 1.8rem; margin-bottom: 16px; }
          .dashboard-message p { color: var(--text-muted); font-size: 1rem; line-height: 1.7; }
          @media (max-width: 768px) { .page-banner h1 { font-size: 1.8rem; } }
        `}</style>
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <h1>Login</h1>
            <p>Investor portal sign in</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="login-wrapper">
              <div className="login-card">
                <div className="login-header">
                  <LogIn size={32} />
                  <h2>Sign In</h2>
                  <p>Access your investor dashboard</p>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
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
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Sign In <LogIn size={18} />
                  </button>
                </form>
                <div className="login-footer">
                  <a href="#">Forgot Password?</a>
                  <span>|</span>
                  <a href="#">Create Account</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .page-banner {
          position: relative;
          padding: 100px 0;
          background: linear-gradient(135deg, var(--primary-blue-dark), var(--primary-blue));
          text-align: center;
          color: white;
        }
        .page-banner-overlay {
          position: absolute;
          inset: 0;
          background: url('https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/themes/sushmitenergy/images/kulekhani.jpg') center/cover no-repeat;
          opacity: 0.1;
        }
        .page-banner .container {
          position: relative;
          z-index: 1;
        }
        .page-banner h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 12px;
        }
        .page-banner p {
          font-size: 1.1rem;
          opacity: 0.85;
        }
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
        .login-footer {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 20px;
          font-size: 0.85rem;
        }
        .login-footer a {
          color: var(--primary-blue);
        }
        .login-footer a:hover {
          text-decoration: underline;
        }
        .login-footer span {
          color: var(--text-light);
        }
        @media (max-width: 768px) {
          .page-banner h1 {
            font-size: 1.8rem;
          }
          .login-card {
            padding: 28px 24px;
          }
        }
      `}</style>
    </>
  );
}
