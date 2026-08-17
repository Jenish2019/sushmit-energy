'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { PhoneCall, ArrowRight, X } from '@phosphor-icons/react/dist/ssr';
import { DEFAULTS } from '../lib/defaults';

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'Company',
    children: [
      { label: 'About Sushmit Energy', href: '/about-us/' },
      { label: 'Board of Directors', href: '/board-of-directors/' },
      { label: "Chairman's Message", href: '/message-of-chairman/' },
      { label: 'Management Team', href: '/our-management-team/' },
      { label: 'Investment Opportunity in Nepal', href: '/investment-oppourtunity/' },
    ],
  },
  { label: 'Our Project', href: '/projects/' },
  {
    label: 'Media',
    children: [
      { label: 'Gallery', href: '/gallery/' },
      { label: 'News', href: '/news/' },
      { label: 'Resources', href: '/resources/' },
    ],
  },
  { label: 'Contact Us', href: '/contact-us/' },
];

const menuCards = [
  { href: '/projects/', title: 'Our Project', text: 'Kunaban Khola Hydropower — 20 MW in Myagdi', img: DEFAULTS.projects[0]?.image || DEFAULTS.projects[0]?.img },
  { href: '/news/', title: 'Latest News', text: 'Company updates and announcements', img: DEFAULTS.news?.['Press Release']?.[0]?.image },
  { href: '/gallery/', title: 'Gallery', text: 'Our projects and people in pictures', img: DEFAULTS.galleryAlbums?.[0]?.cover },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
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
    if (menuOpen || drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, drawerOpen]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');
  const isHome = pathname === '/';

  const toggleMobileSub = (label) =>
    setOpenMobileSub((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <>
      <header ref={headerRef} className={`header ${scrolled ? 'scrolled' : ''} ${isHome ? 'home-fixed' : ''} ${isHome && !scrolled ? 'transparent' : ''}`}>
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
                        </a>
                        <div className={`dropdown ${openDropdown === i ? 'open' : ''}`}>
                          <ul>
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link href={child.href} className={isActive(child.href) ? 'active' : ''}>
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <Link href={item.href} className={`nav-link ${isActive(item.href) ? 'active' : ''}`}>
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="header-actions">
              <a href="/contact-us/" className="header-contact-link">
                Contact
                <ArrowRight size={15} weight="bold" />
              </a>
              <button
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
              >
                {menuOpen ? 'Close' : 'Menu'}
                <span className={`menu-toggle-bars ${menuOpen ? 'open' : ''}`} aria-hidden="true">
                  <i />
                  <i />
                </span>
              </button>
              <button
                className="mobile-toggle"
                onClick={() => setDrawerOpen(!drawerOpen)}
                aria-label="Toggle navigation"
                aria-expanded={drawerOpen}
              >
                {drawerOpen ? <X size={26} weight="bold" /> : <span className="burger" aria-hidden="true"><i /><i /><i /></span>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen menu overlay */}
      <div className={`menu-overlay ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="menu-overlay-inner container-wide">
          <div className="menu-overlay-left">
            <div className="menu-overlay-grid">
              {navItems.map((item) => (
                <div key={item.label} className={`menu-group ${openMobileSub[item.label] ? 'expanded' : ''}`}>
                  {item.children ? (
                    <>
                      <button className="menu-group-title" onClick={() => toggleMobileSub(item.label)}>
                        {item.label}
                        <ArrowRight size={16} weight="bold" className="menu-group-arrow" />
                      </button>
                      <ul className="menu-group-sub">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link href={child.href} onClick={() => setMenuOpen(false)} className={isActive(child.href) ? 'active' : ''}>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link href={item.href} onClick={() => setMenuOpen(false)} className={`menu-group-title ${isActive(item.href) ? 'active' : ''}`}>
                      {item.label}
                      <ArrowRight size={16} weight="bold" className="menu-group-arrow" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="menu-overlay-contact">
              <span>{site.sitePhone}</span>
              <span>{site.siteEmail}</span>
            </div>
          </div>
          <div className="menu-overlay-right">
            {menuCards.filter((c) => c.img).map((card, i) => (
              <Link key={i} href={card.href} className="menu-card" onClick={() => setMenuOpen(false)}>
                <div className="menu-card-media">
                  <img src={card.img} alt="" loading="lazy" />
                </div>
                <div className="menu-card-info">
                  <span className="menu-card-text">{card.text}</span>
                  <strong className="menu-card-title">{card.title}</strong>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

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
                    <ArrowRight size={15} weight="bold" className={`chevron ${openMobileSub[item.label] ? 'open' : ''}`} />
                  </button>
                  <ul className={`drawer-sub ${openMobileSub[item.label] ? 'open' : ''}`}>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} onClick={() => setDrawerOpen(false)} className={isActive(child.href) ? 'active' : ''}>{child.label}</Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link href={item.href} onClick={() => setDrawerOpen(false)} className={`drawer-link ${isActive(item.href) ? 'active' : ''}`}>{item.label}</Link>
              )}
            </li>
          ))}
        </ul>
        <div className="drawer-footer">
          <Link href="/contact-us/" className="btn btn-dark btn-block" onClick={() => setDrawerOpen(false)}>Contact Us</Link>
          <div className="drawer-contact">
            <span><PhoneCall size={15} /> {site.sitePhone}</span>
          </div>
        </div>
      </aside>

      <style>{`
        /* ---------- Header shell ---------- */
        .header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: var(--bg-white);
          border-bottom: 1px solid var(--border-color);
          transition: box-shadow .3s ease, background .3s ease, border-color .3s ease;
        }
        .header.scrolled {
          box-shadow: var(--shadow-md);
          border-color: transparent;
        }

        /* On the homepage the header floats over the hero (blends with banner) */
        .header.home-fixed {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
        }
        .header.transparent {
          background: rgb(255, 255, 255);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-color: transparent;
          box-shadow: none;
        }
        .header.transparent .logo img {
          filter: none;
        }
        .header.transparent .menu-toggle {
          background: rgba(255, 255, 255, 0.36);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }
        @media (prefers-reduced-motion: reduce) {
          .header.transparent { transition: none; }
        }

        /* ---------- Main bar ---------- */
        .header-main-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          min-height: 74px;
        }
        .logo img { height: 48px; width: auto; display: block; }

        .desktop-nav { flex: 1; display: flex; justify-content: center; }
        .nav-list { display: flex; align-items: center; margin: 0; padding: 0; list-style: none; gap: 4px; }
        .nav-item { position: relative; }
        .nav-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 13px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-dark);
          font-family: var(--font-display), sans-serif;
          font-size: .9rem;
          font-weight: 500;
          letter-spacing: .02em;
          white-space: nowrap;
          position: relative;
          transition: color .2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 13px; right: 13px; bottom: 2px;
          height: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .28s var(--ease-out-expo);
        }
        .nav-link:hover { color: var(--primary-blue); }
        .nav-link:hover::after,
        .nav-link.active::after { transform: scaleX(1); }
        .nav-link.active { color: var(--primary-blue); }

        .dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          min-width: 260px;
          background: var(--surface);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          padding: 10px;
          opacity: 0;
          visibility: hidden;
          transition: opacity .22s ease, transform .22s var(--ease-out-expo), visibility .22s;
          z-index: 120;
        }
        .dropdown::before {
          content: '';
          position: absolute;
          top: -7px;
          left: 50%;
          transform: translateX(-50%);
          border: 7px solid transparent;
          border-bottom-color: var(--surface);
          border-top: none;
        }
        .dropdown.open { opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0); }
        .dropdown li a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          color: var(--text-body);
          font-size: .88rem;
          font-weight: 500;
          transition: background .18s, color .18s, padding-left .18s;
        }
        .dropdown li a::after {
          content: '';
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0;
          transition: opacity .18s;
        }
        .dropdown li a:hover { background: var(--bg-light); color: var(--primary-blue); padding-left: 16px; }
        .dropdown li a:hover::after { opacity: 1; }
        .dropdown li a.active { background: var(--bg-light); color: var(--primary-blue); }

        .header-actions { display: flex; align-items: center; gap: 20px; }
        .header-contact-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-display), sans-serif;
          font-size: .86rem;
          font-weight: 600;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: var(--text-dark);
          padding: 8px 0;
          position: relative;
          transition: color .2s;
        }
        .header-contact-link::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: 2px;
          height: 1px;
          background: var(--text-dark);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .28s var(--ease-out-expo);
        }
        .header-contact-link:hover { color: var(--primary-blue); }
        .header-contact-link:hover::after { transform: scaleX(1); }
        .header-contact-link svg { transition: transform .25s var(--ease-out-expo); }
        .header-contact-link:hover svg { transform: translateX(4px); }

        /* Menu button (IEA style) */
        .menu-toggle {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-pill);
          padding: 9px 16px 9px 18px;
          cursor: pointer;
          font-family: var(--font-display), sans-serif;
          font-size: .82rem;
          font-weight: 600;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: var(--text-dark);
          transition: background .25s, color .25s, border-color .25s;
        }
        .menu-toggle:hover { background: var(--text-dark); color: #fff; border-color: var(--text-dark); }
        .menu-toggle-bars { display: flex; flex-direction: column; gap: 4px; }
        .menu-toggle-bars i {
          width: 20px; height: 1.6px;
          background: currentColor;
          transition: transform .3s var(--ease-out-expo), opacity .2s;
        }
        .menu-toggle-bars.open i:first-child { transform: translateY(5.6px) rotate(45deg); }
        .menu-toggle-bars.open i:last-child { transform: translateY(-5.6px) rotate(-45deg); }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-dark);
          padding: 6px;
        }
        .burger { display: flex; flex-direction: column; gap: 5px; width: 24px; }
        .burger i { height: 2px; background: currentColor; border-radius: 2px; }

        /* ---------- Full-screen menu overlay ---------- */
        .menu-overlay {
          position: fixed;
          inset: 0;
          z-index: 1500;
          background: var(--bg-white);
          overflow-y: auto;
          opacity: 0;
          visibility: hidden;
          transition: opacity .38s var(--ease-out-expo), visibility .38s;
        }
        .menu-overlay.open { opacity: 1; visibility: visible; }
        .menu-overlay-inner {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 60px;
          min-height: 100%;
          padding-top: 120px;
          padding-bottom: 60px;
          align-items: start;
        }
        .menu-overlay-left {
          border-top: 1px solid var(--border-color);
          padding-top: 40px;
        }
        .menu-overlay-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px 44px;
        }
        .menu-group-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: var(--font-display), sans-serif;
          font-size: clamp(1.4rem, 2.4vw, 1.9rem);
          font-weight: 500;
          color: var(--text-dark);
          padding: 4px 0;
          width: 100%;
          position: relative;
          transition: color .2s;
        }
        .menu-group-title:hover { color: var(--primary-blue); }
        .menu-group-title .menu-group-arrow {
          transition: transform .3s var(--ease-out-expo);
          opacity: .4;
        }
        .menu-group-title:hover .menu-group-arrow { opacity: 1; transform: translateX(4px); }
        .menu-group.expanded .menu-group-arrow { transform: rotate(90deg); }
        .menu-group-sub {
          max-height: 0;
          overflow: hidden;
          transition: max-height .4s var(--ease-out-expo), margin .4s var(--ease-out-expo);
          margin: 0;
        }
        .menu-group.expanded .menu-group-sub { max-height: 400px; margin-top: 10px; }
        .menu-group-sub a {
          display: block;
          padding: 7px 0;
          color: var(--text-muted);
          font-size: .95rem;
          border-bottom: 1px dashed var(--border-soft);
          transition: color .2s, padding-left .2s;
        }
        .menu-group-sub a:hover,
        .menu-group-sub a.active { color: var(--primary-blue); padding-left: 6px; }
        .menu-overlay-contact {
          display: flex;
          gap: 24px;
          margin-top: 56px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
          font-size: .84rem;
          color: var(--text-muted);
          letter-spacing: .03em;
        }
        .menu-overlay-right {
          display: grid;
          gap: 16px;
        }
        .menu-card {
          display: grid;
          grid-template-columns: 120px 1fr;
          align-items: center;
          gap: 20px;
          background: var(--bg-light);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
          text-decoration: none;
          transition: transform .3s var(--ease-out-expo), box-shadow .3s, border-color .3s;
        }
        .menu-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); border-color: var(--line-strong, #d9d9d4); }
        .menu-card-media { position: relative; height: 96px; overflow: hidden; }
        .menu-card-media img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform .6s var(--ease-out-expo); }
        .menu-card:hover .menu-card-media img { transform: scale(1.08); }
        .menu-card-info { padding-right: 18px; }
        .menu-card-text {
          display: block;
          font-size: .76rem;
          color: var(--text-muted);
          margin-bottom: 4px;
        }
        .menu-card-title {
          font-family: var(--font-display), sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-dark);
        }

        /* ---------- Mobile drawer ---------- */
        .drawer-overlay {
          position: fixed;
          inset: 0;
          background: rgba(16, 20, 26, .5);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          opacity: 0;
          visibility: hidden;
          transition: opacity .3s ease, visibility .3s;
          z-index: 2100;
        }
        .drawer-overlay.open { opacity: 1; visibility: visible; }
        .mobile-drawer {
          position: fixed;
          top: 0; right: 0;
          height: 100vh;
          width: min(360px, 88vw);
          background: var(--bg-white);
          z-index: 2101;
          transform: translateX(100%);
          transition: transform .32s var(--ease-out-expo);
          display: flex;
          flex-direction: column;
          box-shadow: -20px 0 50px rgba(16,20,26,.2);
        }
        .mobile-drawer.open { transform: translateX(0); }
        .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          border-bottom: 1px solid var(--border-color);
        }
        .drawer-logo { height: 40px; width: auto; }
        .drawer-close {
          background: var(--bg-light);
          border: none;
          cursor: pointer;
          width: 40px; height: 40px;
          border-radius: var(--radius-md);
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
          border-radius: var(--radius-sm);
          color: var(--text-dark);
          font-family: var(--font-display), sans-serif;
          font-size: 1rem;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: background .18s, color .18s;
        }
        .drawer-link:hover,
        .drawer-link.active { background: var(--bg-light); color: var(--primary-blue); }
        .drawer-parent .chevron { transition: transform .25s ease; }
        .drawer-parent .chevron.open { transform: rotate(90deg); }
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
          border-radius: var(--radius-sm);
          transition: color .18s, background .18s;
        }
        .drawer-sub a:hover,
        .drawer-sub a.active { color: var(--primary-blue); background: var(--bg-light); }
        .drawer-footer {
          padding: 16px 20px;
          border-top: 1px solid var(--border-color);
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
          .menu-toggle { display: none; }
          .header-contact-link { display: none; }
          .mobile-toggle { display: flex; }
        }
        @media (max-width: 900px) {
          .menu-overlay-inner { grid-template-columns: 1fr; padding-top: 110px; }
          .menu-overlay-right { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .menu-overlay-grid { grid-template-columns: 1fr; gap: 20px; }
          .menu-overlay-right { grid-template-columns: 1fr; }
          .menu-overlay-contact { flex-direction: column; gap: 8px; }
        }
      `}</style>
    </>
  );
}
