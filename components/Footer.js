'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Envelope, ArrowUp, Check, PaperPlaneTilt, Lightning } from '@phosphor-icons/react/dist/ssr';
import { DEFAULTS } from '../lib/defaults';

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
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
            <h4 className="foot-title">Quick Links</h4>
            <ul className="link-list">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about-us/">Company</Link></li>
              <li><Link href="/projects/">Projects</Link></li>
              <li><Link href="/current-vacancies/">Job Board</Link></li>
              <li><Link href="/gallery/">Gallery</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="foot-title">Resources</h4>
            <ul className="link-list">
              <li><Link href="/policy/">Policy</Link></li>
              <li><Link href="/reports/">Reports</Link></li>
              <li><Link href="/press-releases/">Press Releases</Link></li>
              <li><Link href="/blog/">Blog</Link></li>
              <li><Link href="/contact-us/">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="foot-title">Stay Updated</h4>
            <p className="newsletter-text">Subscribe to get the latest project updates and company news.</p>
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
              <button type="submit" className="newsletter-btn">
                {subscribed ? <Check size={18} weight="bold" /> : <PaperPlaneTilt size={18} weight="bold" />}
                {subscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </form>
            <div className="footer-contact">
              <span className="contact-item"><MapPin size={15} /> {contact.address}</span>
              <span className="contact-item"><Phone size={15} /> {contact.phone}</span>
              <span className="contact-item"><Envelope size={15} /> {contact.email}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="copyright">
            © {new Date().getFullYear()} Sushmit Energy. All rights reserved.
          </p>
          <span className="footer-status">
            <Lightning size={13} weight="fill" /> 93+ MW clean energy in the making
          </span>
          <button className="back-to-top" onClick={scrollTop} aria-label="Back to top">
            <ArrowUp size={18} weight="bold" />
          </button>
        </div>
      </div>

      <style>{`
        .footer {
          background: #0b1426;
          color: #c8d3e0;
          position: relative;
          overflow: hidden;
        }
        .footer::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(600px 300px at 15% 0%, rgba(12,80,160,.35), transparent 60%),
            radial-gradient(600px 300px at 85% 100%, rgba(15,138,67,.22), transparent 60%);
          pointer-events: none;
        }
        .container { position: relative; z-index: 1; }
        .footer-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.4fr;
          gap: 48px;
          padding: 80px 0 56px;
        }
        .footer-brand-logo { height: 44px; width: auto; margin-bottom: 18px; }
        .footer-brand-tag {
          max-width: 300px;
          font-size: .9rem;
          line-height: 1.7;
          color: #8fa1b8;
          margin-bottom: 20px;
        }
        .footer-social { display: flex; gap: 12px; }
        .footer-social a {
          width: 40px; height: 40px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,.08);
          color: #e6edf5;
          transition: background .25s, color .25s, transform .25s var(--ease-out-back);
        }
        .footer-social a:hover { background: var(--primary-green); color: #fff; transform: translateY(-3px); }

        .foot-title {
          font-family: var(--font-display), sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
          letter-spacing: .04em;
          text-transform: uppercase;
          margin-bottom: 22px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .foot-title::after { content: ''; flex: 1; max-width: 34px; height: 2px; border-radius: 2px; background: var(--accent); }

        .link-list { display: flex; flex-direction: column; gap: 12px; }
        .link-list a {
          color: #8fa1b8;
          font-size: .9rem;
          position: relative;
          transition: color .2s, padding-left .2s;
        }
        .link-list a::before {
          content: '';
          position: absolute;
          left: -14px; top: 50%;
          transform: translateY(-50%);
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--accent);
          opacity: 0;
          transition: opacity .2s;
        }
        .link-list a:hover { color: #fff; padding-left: 10px; }
        .link-list a:hover::before { opacity: 1; }

        .newsletter-text { font-size: .88rem; line-height: 1.6; color: #8fa1b8; margin-bottom: 16px; }
        .newsletter-form { display: flex; gap: 10px; margin-bottom: 20px; }
        .newsletter-input {
          flex: 1;
          min-width: 0;
          padding: 12px 16px;
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 12px;
          background: rgba(255,255,255,.06);
          color: #fff;
          font-size: .88rem;
          outline: none;
          transition: border-color .2s, background .2s;
        }
        .newsletter-input::placeholder { color: #6b7c90; }
        .newsletter-input:focus { border-color: var(--accent); background: rgba(255,255,255,.09); }
        .newsletter-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0 20px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          background: var(--accent);
          color: #241a00;
          font-family: var(--font-display), sans-serif;
          font-weight: 600;
          font-size: .88rem;
          transition: transform .2s var(--ease-out-expo), background .2s, box-shadow .2s;
          white-space: nowrap;
        }
        .newsletter-btn:hover { background: #ffb41f; transform: translateY(-2px); box-shadow: var(--shadow-accent); }

        .footer-contact { display: flex; flex-direction: column; gap: 10px; margin-top: 8px; border-top: 1px solid rgba(255,255,255,.08); padding-top: 18px; }
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: #8fa1b8;
          font-size: .85rem;
          line-height: 1.5;
        }
        .contact-item svg { flex-shrink: 0; margin-top: 2px; color: var(--primary-green); }

        .footer-bottom {
          border-top: 1px solid rgba(255,255,255,.08);
          background: rgba(0,0,0,.25);
          padding: 20px 0;
        }
        .footer-bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .copyright { color: #6b7c90; font-size: .85rem; margin: 0; }
        .footer-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #8fa1b8;
          font-size: .82rem;
        }
        .footer-status svg { color: var(--accent); }
        .back-to-top {
          width: 44px; height: 44px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          background: linear-gradient(135deg, var(--primary-blue), var(--primary-blue-dark));
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          transition: transform .25s var(--ease-out-back), box-shadow .25s;
        }
        .back-to-top:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }

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