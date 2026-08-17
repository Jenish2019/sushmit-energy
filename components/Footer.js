'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Envelope, ArrowUp, ArrowRight, Check } from '@phosphor-icons/react/dist/ssr';
import { DEFAULTS } from '../lib/defaults';

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </svg>
);

export default function Footer() {
  const [contact, setContact] = useState(DEFAULTS.contact);
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    let active = true;
    fetch('/api/public/settings', { cache: 'no-store' })
      .then((r) => r.json())
      .then((json) => {
        if (active && json.success && json.data.contact) {
          setContact({
            address: json.data.contact.address || DEFAULTS.contact.address,
            phone: json.data.contact.phone || DEFAULTS.contact.phone,
            email: json.data.contact.email || DEFAULTS.contact.email,
            fax: DEFAULTS.contact.fax,
          });
        }
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  const onSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/images/logo.png" alt="Sushmit Energy" className="footer-brand-logo" />
            <p className="footer-brand-tag">
              Building a sustainable energy future for Nepal through clean, renewable hydropower.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/SushmitEnergy/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://www.linkedin.com/company/sushmitcleanenergy/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="foot-title">Company</h4>
            <ul className="link-list">
              <li><Link href="/about-us/">About Us</Link></li>
              <li><Link href="/board-of-directors/">Board of Directors</Link></li>
              <li><Link href="/our-management-team/">Management Team</Link></li>
              <li><Link href="/projects/">Our Project</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="foot-title">Media</h4>
            <ul className="link-list">
              <li><Link href="/news/">News</Link></li>
              <li><Link href="/resources/">Resources</Link></li>
              <li><Link href="/gallery/">Gallery</Link></li>
              <li><Link href="/policy/">Policy</Link></li>
              <li><Link href="/reports/">Reports</Link></li>
            </ul>
          </div>

          <div className="footer-col footer-col--contact">
            <h4 className="foot-title">Contact</h4>
            <div className="footer-contact">
              <span className="contact-item"><MapPin size={16} /> {contact.address}</span>
              <span className="contact-item"><Phone size={16} /> {contact.phone}</span>
              <span className="contact-item"><Envelope size={16} /> {contact.email}</span>
            </div>
            <form className="newsletter-form" onSubmit={onSubscribe}>
              <input
                type="email"
                required
                placeholder="Your email address"
                aria-label="Email address"
                className="newsletter-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                {subscribed ? <Check size={16} weight="bold" /> : <ArrowRight size={16} weight="bold" />}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="copyright">
            © {new Date().getFullYear()} Sushmit Energy. All rights reserved.
          </p>
          <span className="footer-status">Hydropower Developer · Nepal</span>
          <button className="back-to-top" onClick={scrollTop} aria-label="Back to top">
            <ArrowUp size={18} weight="bold" />
          </button>
        </div>
      </div>

      <style>{`
        .footer {
          position: relative;
          background: linear-gradient(180deg, #0b2040 0%, #081a33 100%);
          color: #aebcd0;
          border-top: 3px solid transparent;
          border-image: var(--grad-brand) 1;
          overflow: hidden;
        }
        .footer::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(640px 320px at 88% 0%, rgba(15,122,68,.22), transparent 62%),
            radial-gradient(640px 320px at 6% 100%, rgba(10,77,163,.3), transparent 62%);
          pointer-events: none;
        }
        .container { position: relative; z-index: 1; }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1.4fr;
          gap: 48px;
          padding: 80px 0 60px;
        }
        .footer-brand-logo {
          height: 42px; width: auto;
          margin-bottom: 20px;
          filter: brightness(0) invert(1);
          opacity: .95;
        }
        .footer-brand-tag {
          max-width: 300px;
          font-size: .92rem;
          line-height: 1.75;
          color: #9db0c6;
          margin-bottom: 24px;
        }
        .footer-social { display: flex; gap: 10px; }
        .footer-social a {
          width: 38px; height: 38px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,.07);
          border: 1px solid rgba(255,255,255,.14);
          color: #c9d6e5;
          transition: background .25s, color .25s, transform .25s var(--ease-out-back), border-color .25s;
        }
        .footer-social a:hover { background: var(--primary-green); border-color: var(--primary-green); color: #fff; transform: translateY(-3px); }

        .foot-title {
          font-family: var(--font-display), sans-serif;
          font-size: .78rem;
          font-weight: 600;
          color: #fff;
          letter-spacing: .16em;
          text-transform: uppercase;
          margin-bottom: 22px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .foot-title::after { content: ''; flex: 1; max-width: 30px; height: 1px; background: var(--grad-brand); }
        .link-list { display: flex; flex-direction: column; gap: 11px; }
        .link-list a {
          color: #9db0c6;
          font-size: .92rem;
          position: relative;
          display: inline-flex;
          transition: color .2s, transform .2s var(--ease-out-expo);
        }
        .link-list a:hover { color: #7fd4a8; transform: translateX(4px); }

        .footer-contact { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #9db0c6;
          font-size: .9rem;
          line-height: 1.6;
        }
        .contact-item svg { flex-shrink: 0; margin-top: 3px; color: var(--accent-bright); }
        .newsletter-form { display: flex; gap: 8px; max-width: 300px; }
        .newsletter-input {
          flex: 1;
          min-width: 0;
          padding: 11px 14px;
          border: 1px solid rgba(255,255,255,.16);
          border-radius: var(--radius-sm);
          background: rgba(255,255,255,.06);
          color: #fff;
          font-size: .88rem;
          outline: none;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }
        .newsletter-input::placeholder { color: #74869c; }
        .newsletter-input:focus { border-color: var(--accent-bright); background: rgba(255,255,255,.09); box-shadow: 0 0 0 3px rgba(15,122,68,.2); }
        .newsletter-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          border: 1px solid var(--primary-green);
          border-radius: var(--radius-sm);
          cursor: pointer;
          background: var(--primary-green);
          color: #fff;
          transition: background .25s, transform .25s var(--ease-out-expo), box-shadow .25s;
        }
        .newsletter-btn:hover { background: var(--primary-green-dark); transform: translateX(2px); box-shadow: 0 0 0 4px rgba(15,122,68,.18); }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,.1);
          padding: 20px 0;
          background: rgba(4,12,26,.4);
        }
        .footer-bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .copyright { color: #74869c; font-size: .84rem; margin: 0; }
        .footer-status {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #9db0c6;
          font-size: .8rem;
          letter-spacing: .04em;
        }
        .footer-status::before {
          content: '';
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--accent-bright);
          box-shadow: 0 0 0 3px rgba(15,122,68,.25);
        }
        .back-to-top {
          width: 40px; height: 40px;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(255,255,255,.16);
          cursor: pointer;
          background: rgba(255,255,255,.06);
          color: #c9d6e5;
          display: flex; align-items: center; justify-content: center;
          transition: transform .25s var(--ease-out-back), background .25s, color .25s, border-color .25s;
        }
        .back-to-top:hover { transform: translateY(-4px); background: var(--primary-blue); border-color: var(--primary-blue); color: #fff; }

        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr; gap: 36px; padding: 60px 0 40px; }
          .footer-bottom-inner { flex-direction: column; text-align: center; justify-content: center; }
        }
      `}</style>
    </footer>
  );
}
