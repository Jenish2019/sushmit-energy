'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, ChevronDown, Search } from 'lucide-react';

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

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Company',
    children: [
      { label: 'About Sushmit Energy', href: '/about-us/' },
      { label: 'Organizational Chart', href: '/organizational-chart/' },
      { label: 'Board of Directors', href: '/board-of-directors/' },
      { label: "Chairman's Message", href: '/message-of-chairman/' },
      { label: 'Management Team', href: '/our-management-team/' },
      { label: 'Investment Opportunity in Nepal', href: '/investment-oppourtunity/' },
    ],
  },
  { label: 'Projects', href: '/projects/' },
  {
    label: 'Media',
    children: [
      { label: 'Press Releases', href: '/press-releases/' },
      { label: 'Sushmit Energy in the News', href: '/sushmit-news/' },
      { label: 'Energy News', href: '/informationenergy/' },
      { label: 'Media Kit', href: '/media-kit/' },
      { label: 'Blog', href: '/blog/' },
      { label: 'Publications', href: '/publications/' },
    ],
  },
  {
    label: 'Job Board',
    children: [
      { label: 'Current Vacancies', href: '/current-vacancies/' },
      { label: 'Drop Your Resume', href: '/resume/' },
    ],
  },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Contact Us', href: '/contact-us/' },
  { label: 'Login', href: '/login/' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-top-bar">
        <div className="container">
          <div className="top-bar-inner">
            <div className="top-bar-links">
              <a href="/policy/">Policy</a>
              <a href="/reports/">Reports</a>
            </div>
            <div className="top-bar-social">
              <a href="https://www.facebook.com/SushmitEnergy/" target="_blank" rel="noopener noreferrer">
                <FacebookIcon />
              </a>
              <a href="https://www.linkedin.com/company/sushmitcleanenergy/" target="_blank" rel="noopener noreferrer">
                <LinkedinIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <div className="header-main-inner">
            <a href="/" className="logo">
              <img src="/images/logo.png" alt="Sushmit Energy" />
            </a>

            <div className="header-info">
              <div className="info-item">
                <MapPin size={20} />
                <div>
                  <span className="info-label">Address</span>
                  <span className="info-value">Subidhanagar, Kathmandu, Nepal</span>
                </div>
              </div>
              <div className="info-item">
                <Phone size={20} />
                <div>
                  <span className="info-label">Call Us</span>
                  <span className="info-value">+977-15199027</span>
                </div>
              </div>
            </div>

            <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <nav className={`nav-bar ${menuOpen ? 'open' : ''}`}>
        <div className="container">
          <ul className="nav-list">
            {navItems.map((item, i) => (
              <li
                key={i}
                className={`nav-item ${item.children ? 'has-dropdown' : ''} ${openDropdown === i ? 'dropdown-open' : ''}`}
                onMouseEnter={() => setOpenDropdown(i)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.children ? (
                  <>
                    <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
                      {item.label} <ChevronDown size={14} className="chevron" />
                    </a>
                    <ul className="dropdown">
                      {item.children.map((child, j) => (
                        <li key={j}>
                          <a href={child.href}>{child.label}</a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a href={item.href} className="nav-link">{item.label}</a>
                )}
              </li>
            ))}
            <li className="nav-item search-item">
              <button className="search-btn" aria-label="Search">
                <Search size={18} />
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <style>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: white;
          transition: box-shadow 0.3s ease;
        }
        .header.scrolled {
          box-shadow: var(--shadow-md);
        }
        .header-top-bar {
          background: var(--primary-blue);
          padding: 6px 0;
        }
        .top-bar-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .top-bar-links {
          display: flex;
          gap: 20px;
        }
        .top-bar-links a {
          color: rgba(255,255,255,0.85);
          font-size: 0.8rem;
          transition: color 0.2s;
        }
        .top-bar-links a:hover {
          color: white;
        }
        .top-bar-social {
          display: flex;
          gap: 12px;
        }
        .top-bar-social a {
          color: rgba(255,255,255,0.85);
          transition: color 0.2s;
          display: flex;
        }
        .top-bar-social a:hover {
          color: white;
        }
        .header-main {
          padding: 16px 0;
          background: white;
        }
        .header-main-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }
        .logo img {
          height: 50px;
          width: auto;
        }
        .header-info {
          display: flex;
          gap: 30px;
        }
        .info-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--primary-blue);
        }
        .info-item svg {
          flex-shrink: 0;
        }
        .info-label {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .info-value {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-dark);
        }
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-dark);
          padding: 4px;
        }
        .nav-bar {
          background: var(--primary-blue);
        }
        .nav-list {
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .nav-item {
          position: relative;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 12px 18px;
          color: rgba(255,255,255,0.9);
          font-size: 0.85rem;
          font-weight: 500;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }
        .nav-link:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }
        .chevron {
          transition: transform 0.2s;
        }
        .dropdown-open .chevron {
          transform: rotate(180deg);
        }
        .dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 220px;
          background: white;
          box-shadow: var(--shadow-lg);
          border-radius: var(--radius-sm);
          padding: 8px 0;
          opacity: 0;
          visibility: hidden;
          transform: translateY(8px);
          transition: all 0.2s ease;
          z-index: 100;
        }
        .nav-item:hover .dropdown,
        .dropdown-open .dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        .dropdown li a {
          display: block;
          padding: 10px 20px;
          color: var(--text-dark);
          font-size: 0.85rem;
          transition: background 0.2s, color 0.2s;
        }
        .dropdown li a:hover {
          background: var(--bg-light);
          color: var(--primary-blue);
        }
        .search-item {
          margin-left: auto;
        }
        .search-btn {
          background: none;
          border: none;
          color: rgba(255,255,255,0.9);
          cursor: pointer;
          padding: 12px 18px;
          display: flex;
          transition: color 0.2s;
        }
        .search-btn:hover {
          color: white;
        }
        @media (max-width: 1024px) {
          .header-info {
            display: none;
          }
          .mobile-toggle {
            display: flex;
          }
          .nav-bar {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
          }
          .nav-bar.open {
            max-height: 80vh;
            overflow-y: auto;
          }
          .nav-list {
            flex-direction: column;
            align-items: stretch;
          }
          .nav-link {
            padding: 14px 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
          }
          .dropdown {
            position: static;
            box-shadow: none;
            opacity: 1;
            visibility: visible;
            transform: none;
            display: none;
            background: rgba(255,255,255,0.1);
            border-radius: 0;
          }
          .dropdown-open .dropdown {
            display: block;
          }
          .dropdown li a {
            color: rgba(255,255,255,0.85);
            padding-left: 36px;
          }
          .dropdown li a:hover {
            background: rgba(255,255,255,0.1);
            color: white;
          }
          .search-item {
            margin-left: 0;
          }
        }
      `}</style>
    </header>
  );
}
