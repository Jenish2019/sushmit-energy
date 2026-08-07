'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  List, X, Phone, MapPin, Envelope, CaretDown, PhoneCall,
} from '@phosphor-icons/react/dist/ssr';
import { DEFAULTS } from '../lib/defaults';

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
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
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMobileSub, setOpenMobileSub] = useState({});
  const [site, setSite] = useState(DEFAULTS.settings);
  const headerRef = useRef(null);

  useEffect(() => {
    let active = true;
    fetch('/api/public/settings', { cache: 'no-store' })
      .then((r) => r.json())
      .then((json) => {
        if (active && json.success) {
          setSite({
            siteName: json.data.settings?.siteName || DEFAULTS.settings.siteName,
            sitePhone: json.data.settings?.sitePhone || DEFAULTS.settings.sitePhone,
            siteEmail: json.data.settings?.siteEmail || DEFAULTS.settings.siteEmail,
            address: json.data.settings?.address || DEFAULTS.settings.address,
          });
        }
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        setOpenDropdown(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  const toggleMobileSub = (label) =>
    setOpenMobileSub((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <>
      <header ref={headerRef} className={`header ${scrolled ? 'scrolled' : ''}`}>
        {/* Utility strip */}
        <div className="header-utility">
          <div className="container header-utility-inner">
            <div className="header-utility-links">
              <a href="/policy/">Policy</a>
              <span className="sep">•</span>
              <a href="/reports/">Reports</a>
              <span className="sep">•</span>
              <a href="/current-vacancies/">Careers</a>
            </div>
            <div className="header-utility-contact">
              <span className="utility-item">
                <Envelope size={13} weight="bold" />
                {site.siteEmail}
              </span>
              <span className="utility-item">
                <PhoneCall size={13} weight="bold" />
                {site.sitePhone}
              </span>
              <div className="utility-social">
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

        {/* Main bar */}
        <div className="header-main">
          <div className="container header-main-inner">
            <Link href="/" className="logo" aria-label={site.siteName}>
              <img src="/images/logo.png" alt={site.siteName} />
            </Link>

            <nav className="desktop-nav" aria-label="Primary">
              <ul className="nav-list">
                {navItems.map((item, i) => (
                  <li
                    key={item.label}
                    className={`nav-item ${item.children ? 'has-dropdown' : ''}`}
                    onMouseEnter={() => item.children && setOpenDropdown(i)}
                    onMouseLeave={() => setOpenDropdown(null)}
                    onFocus={() => item.children && setOpenDropdown(i)}
                    onBlur={() => setOpenDropdown(null)}
                  >
                    {item.children ? (
                      <>
                        <a
                          href="#"
                          className={`nav-link ${isActive(item.children[0].href) ? 'active' : ''}`}
                          onClick={(e) => e.preventDefault()}
                          aria-haspopup="true"
                          aria-expanded={openDropdown === i}
                        >
                          {item.label}
                          <CaretDown size={13} weight="bold" className="chevron" />
                        </a>
                        <div className={`dropdown ${openDropdown === i ? 'open' : ''}`}>
                          <ul>
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <a href={child.href} className={isActive(child.href) ? 'active' : ''}>
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <a href={item.href} className={`nav-link ${isActive(item.href) ? 'active' : ''}`}>
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="header-actions">
              <a href="/contact-us/" className="btn btn-accent header-cta">
                <PhoneCall size={17} weight="bold" />
                <span>Get in Touch</span>
              </a>
              <button
                className="mobile-toggle"
                onClick={() => setDrawerOpen(!drawerOpen)}
                aria-label="Toggle menu"
                aria-expanded={drawerOpen}
              >
                {drawerOpen ? <X size={26} weight="bold" /> : <List size={26} weight="bold" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`drawer-overlay ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)} aria-hidden="true" />
      <aside className={`mobile-drawer ${drawerOpen ? 'open' : ''}`} aria-hidden={!drawerOpen}>
        <div className="drawer-header">
          <img src="/images/logo.png" alt={site.siteName} className="drawer-logo" />
          <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
            <X size={24} weight="bold" />
          </button>
        </div>
        <ul className="drawer-nav">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <>
                  <button
                    className="drawer-link drawer-parent"
                    onClick={() => toggleMobileSub(item.label)}
                    aria-expanded={!!openMobileSub[item.label]}
                  >
                    <span>{item.label}</span>
                    <CaretDown size={16} weight="bold" className={`chevron ${openMobileSub[item.label] ? 'open' : ''}`} />
                  </button>
                  <ul className={`drawer-sub ${openMobileSub[item.label] ? 'open' : ''}`}>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <a href={child.href} onClick={() => setDrawerOpen(false)} className={isActive(child.href) ? 'active' : ''}>{child.label}</a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <a href={item.href} onClick={() => setDrawerOpen(false)} className={`drawer-link ${isActive(item.href) ? 'active' : ''}`}>{item.label}</a>
              )}
            </li>
          ))}
        </ul>
        <div className="drawer-footer">
          <a href="/contact-us/" className="btn btn-primary btn-block">Contact Us</a>
          <div className="drawer-contact">
            <span><PhoneCall size={15} /> {site.sitePhone}</span>
            <span><MapPin size={15} /> {site.address}</span>
          </div>
        </div>
      </aside>

      <style>{`
        /* ---------- Utility strip ---------- */
        .header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: var(--bg-white);
          transition: box-shadow .3s ease, background .3s ease;
        }
        .header.scrolled {
          box-shadow: var(--shadow-md);
          background: rgba(255,255,255,.85);
          backdrop-filter: blur(14px) saturate(1.4);
          -webkit-backdrop-filter: blur(14px) saturate(1.4);
        }
        .header-utility {
          background: linear-gradient(90deg, var(--primary-blue-dark), var(--primary-blue));
          color: rgba(255,255,255,.9);
          font-size: .78rem;
          transition: max-height .3s ease, padding .3s ease;
        }
        .header.scrolled .header-utility {
          max-height: 0;
          padding: 0;
          opacity: 0;
          overflow: hidden;
        }
        .header-utility-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 7px;
          padding-bottom: 7px;
          gap: 20px;
        }
        .header-utility-links,
        .header-utility-contact {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .header-utility-links a {
          color: rgba(255,255,255,.92);
          transition: color .2s;
        }
        .header-utility-links a:hover { color: #fff; }
        .header-utility .sep { opacity: .4; }
        .header-utility-contact { margin-left: auto; }
        .utility-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .utility-social {
          display: flex;
          align-items: center;
          gap: 4px;
          padding-left: 8px;
          border-left: 1px solid rgba(255,255,255,.25);
        }
        .utility-social a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          color: rgba(255,255,255,.9);
          transition: background .2s, color .2s;
        }
        .utility-social a:hover { background: rgba(255,255,255,.18); color: #fff; }

        /* ---------- Main bar ---------- */
        .header-main {
          position: relative;
        }
        .header-main-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          min-height: 72px;
        }
        .logo img { height: 52px; width: auto; display: block; }

        .desktop-nav { flex: 1; display: flex; justify-content: center; }
        .nav-list { display: flex; align-items: center; margin: 0; padding: 0; list-style: none; gap: 2px; }
        .nav-item { position: relative; }
        .nav-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 13px;
          color: var(--text-dark);
          font-family: var(--font-display), sans-serif;
          font-size: .92rem;
          font-weight: 600;
          letter-spacing: .01em;
          border-radius: 10px;
          white-space: nowrap;
          position: relative;
          transition: color .2s, background .2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 13px; right: 13px; bottom: 4px;
          height: 2px;
          border-radius: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .25s var(--ease-out-expo);
        }
        .nav-link:hover { color: var(--primary-blue); }
        .nav-link:hover::after,
        .nav-link.active::after { transform: scaleX(1); }
        .nav-link.active { color: var(--primary-blue); }
        .chevron { transition: transform .25s ease; opacity: .7; }
        .has-dropdown:hover .chevron,
        .has-dropdown:focus-within .chevron { transform: rotate(180deg); }

        .dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          min-width: 240px;
          background: var(--surface);
          border: 1px solid var(--border-soft);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          padding: 8px;
          opacity: 0;
          visibility: hidden;
          transition: opacity .22s ease, transform .22s var(--ease-out-expo), visibility .22s;
          z-index: 120;
        }
        .dropdown::before {
          content: '';
          position: absolute;
          top: -12px; left: 50%;
          transform: translateX(-50%);
          border: 7px solid transparent;
          border-bottom-color: var(--surface);
        }
        .dropdown.open { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }
        .dropdown li a {
          display: flex;
          align-items: center;
          padding: 10px 12px;
          border-radius: 8px;
          color: var(--text-body);
          font-size: .88rem;
          font-weight: 500;
          transition: background .18s, color .18s, padding-left .18s;
        }
        .dropdown li a:hover { background: var(--bg-soft); color: var(--primary-blue); padding-left: 16px; }
        .dropdown li a.active { background: var(--bg-soft); color: var(--primary-blue); }

        .header-actions { display: flex; align-items: center; gap: 14px; }
        .header-cta { padding: 11px 22px; font-size: .9rem; }
        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-dark);
          padding: 6px;
          border-radius: 8px;
        }

        /* ---------- Mobile drawer ---------- */
        .drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(16,33,59,.5);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          opacity: 0;
          visibility: hidden;
          transition: opacity .3s ease, visibility .3s;
          z-index: 2000;
        }
        .drawer-overlay.open { opacity: 1; visibility: visible; }
        .mobile-drawer {
          position: fixed;
          top: 0; right: 0;
          height: 100vh;
          width: min(360px, 88vw);
          background: var(--bg-white);
          z-index: 2001;
          transform: translateX(100%);
          transition: transform .32s var(--ease-out-expo);
          display: flex;
          flex-direction: column;
          box-shadow: -20px 0 50px rgba(16,33,59,.2);
        }
        .mobile-drawer.open { transform: translateX(0); }
        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          border-bottom: 1px solid var(--border-soft);
        }
        .drawer-logo { height: 40px; width: auto; }
        .drawer-close {
          background: var(--bg-soft);
          border: none;
          cursor: pointer;
          width: 40px; height: 40px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: var(--text-dark);
          transition: background .2s;
        }
        .drawer-close:hover { background: var(--border-color); }
        .drawer-nav { flex: 1; overflow-y: auto; padding: 12px; }
        .drawer-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          width: 100%;
          padding: 14px 12px;
          background: none;
          border: none;
          border-radius: 10px;
          color: var(--text-dark);
          font-family: var(--font-display), sans-serif;
          font-size: 1rem;
          font-weight: 600;
          text-align: left;
          cursor: pointer;
          transition: background .18s, color .18s;
        }
        .drawer-link:hover,
        .drawer-link.active { background: var(--bg-soft); color: var(--primary-blue); }
        .drawer-parent .chevron { transition: transform .25s ease; }
        .drawer-parent .chevron.open { transform: rotate(180deg); }
        .drawer-sub {
          overflow: hidden;
          max-height: 0;
          transition: max-height .3s ease;
          padding: 0 18px;
        }
        .drawer-sub.open { max-height: 360px; }
        .drawer-sub a {
          display: block;
          padding: 10px 12px;
          color: var(--text-body);
          font-size: .92rem;
          border-radius: 8px;
          transition: color .18s, background .18s;
        }
        .drawer-sub a:hover,
        .drawer-sub a.active { color: var(--primary-blue); background: var(--bg-soft); }
        .drawer-footer {
          padding: 16px 20px;
          border-top: 1px solid var(--border-soft);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .btn-block { width: 100%; }
        .drawer-contact {
          display: flex;
          flex-direction: column;
          gap: 6px;
          color: var(--text-muted);
          font-size: .82rem;
        }
        .drawer-contact span { display: inline-flex; align-items: center; gap: 8px; }

        @media (max-width: 1100px) {
          .desktop-nav { display: none; }
          .header-cta { display: none; }
          .header-actions { width: auto; }
          .mobile-toggle { display: flex; }
          .header-utility-contact .utility-item:first-of-type { display: none; }
        }
        @media (max-width: 560px) {
          .header-utility-links span.sep { display: none; }
          .header-utility-contact .utility-item { display: none; }
        }
      `}</style>
    </>
  );
}