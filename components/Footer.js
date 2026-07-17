'use client';

import { MapPin, Phone, Mail } from 'lucide-react';

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4 className="foot-title">Contact Info</h4>
              <ul className="contact-list">
                <li>
                  <MapPin size={18} />
                  <span>Sushmit Bhawan -2nd Floor, House No 166/40467<br />Subidhanagar - 35, Kathmandu, Nepal</span>
                </li>
                <li>
                  <Phone size={18} />
                  <span>+977-15199027<br />+977-5199454</span>
                </li>
                <li>
                  <Mail size={18} />
                  <span>info@sushmitenergy.com</span>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="foot-title">Quick Links</h4>
              <ul className="link-list">
                <li><a href="/">Home</a></li>
                <li><a href="/about-us/">Company</a></li>
                <li><a href="/projects/">Projects</a></li>
                <li><a href="/current-vacancies/">Job Board</a></li>
                <li><a href="/gallery/">Gallery</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="foot-title">Resources</h4>
              <ul className="link-list">
                <li><a href="/policy/">Policy</a></li>
                <li><a href="/reports/">Reports</a></li>
                <li><a href="/press-releases/">Press Releases</a></li>
                <li><a href="/blog/">Blog</a></li>
                <li><a href="/contact-us/">Contact Us</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4 className="foot-title">Newsletter</h4>
              <p className="newsletter-text">Subscribe to get the latest updates.</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Your email address" className="newsletter-input" />
                <button type="submit" className="btn btn-green newsletter-btn">Subscribe</button>
              </form>
              <div className="footer-social">
                <a href="https://www.facebook.com/SushmitEnergy/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FacebookIcon />
                </a>
                <a href="https://www.linkedin.com/company/sushmitcleanenergy/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <LinkedinIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <img src="/images/logo.png" alt="Sushmit Energy" className="footer-logo" />
            <p className="copyright">
              &copy; {new Date().getFullYear()} Sushmit Energy. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .footer-top {
          background: var(--primary-green);
          color: white;
          padding: 60px 0 40px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }
        .foot-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 2px solid rgba(255,255,255,0.3);
          padding-bottom: 10px;
          display: inline-block;
        }
        .contact-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .contact-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.9rem;
          line-height: 1.5;
        }
        .contact-list svg {
          margin-top: 3px;
          flex-shrink: 0;
        }
        .link-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .link-list a {
          color: rgba(255,255,255,0.85);
          font-size: 0.9rem;
          transition: color 0.2s;
        }
        .link-list a:hover {
          color: white;
        }
        .newsletter-text {
          font-size: 0.9rem;
          margin-bottom: 16px;
          opacity: 0.9;
        }
        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .newsletter-input {
          padding: 12px 16px;
          border: none;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          outline: none;
        }
        .newsletter-btn {
          justify-content: center;
          background: var(--primary-blue);
        }
        .newsletter-btn:hover {
          background: var(--primary-blue-dark);
        }
        .footer-social {
          display: flex;
          gap: 16px;
          margin-top: 20px;
        }
        .footer-social a {
          color: white;
          transition: opacity 0.2s;
          display: flex;
        }
        .footer-social a:hover {
          opacity: 0.8;
        }
        .footer-bottom {
          background: #1a1a2e;
          padding: 20px 0;
        }
        .footer-bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .footer-logo {
          height: 36px;
          width: auto;
          opacity: 0.8;
        }
        .copyright {
          color: rgba(255,255,255,0.6);
          font-size: 0.85rem;
          margin: 0;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
          .footer-bottom-inner {
            flex-direction: column;
            text-align: center;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
