'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import Reveal from './Reveal';

export default function PageHero({ title, subtitle, backLink, image }) {
  const [heroImage, setHeroImage] = useState(image || '');

  useEffect(() => {
    if (image) return;
    let active = true;
    fetch('/api/public/settings', { cache: 'no-store' })
      .then((r) => r.json())
      .then((json) => {
        if (active && json.success) setHeroImage(json.data.settings?.pageHeroImage || '');
      })
      .catch(() => {});
    return () => { active = false; };
  }, [image]);

  return (
    <section className="page-hero">
      {heroImage && (
        <>
          <div className="page-hero-bg" style={{ backgroundImage: `url(${heroImage})` }} />
          <div className="page-hero-veil" />
        </>
      )}
      <div className="container page-hero-inner">
        <Reveal>
          {backLink && (
            <Link href={backLink.href} className="page-hero-back">
              <ArrowLeft size={15} weight="bold" />
              {backLink.label}
            </Link>
          )}
          <span className="page-hero-eyebrow">Sushmit Energy</span>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </Reveal>
      </div>

      <style>{`
        .page-hero {
          position: relative;
          padding: 96px 0 76px;
          background: linear-gradient(180deg, #eef4fb 0%, #f6f7f5 100%);
          border-bottom: 1px solid var(--border-color);
          color: var(--text-dark);
          overflow: hidden;
        }
        .page-hero::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--grad-brand);
          opacity: .9;
          z-index: 3;
        }
        .page-hero::after {
          content: '';
          position: absolute;
          right: -120px;
          top: -120px;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: radial-gradient(closest-side, rgba(10,77,163,.1), transparent);
          pointer-events: none;
        }
        .page-hero-inner { position: relative; z-index: 2; max-width: 900px; }
        .page-hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-size: cover;
          background-position: center;
          transform: scale(1.02);
        }
        .page-hero-veil {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(180deg, rgba(238,244,251,.82) 0%, rgba(246,247,245,.9) 100%);
        }
        .page-hero-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 34px;
          color: var(--text-muted);
          font-size: .84rem;
          font-weight: 500;
          transition: color .2s, transform .2s var(--ease-out-expo);
        }
        .page-hero-back:hover { color: var(--primary-blue); transform: translateX(-3px); }
        .page-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-display), sans-serif;
          font-size: .76rem;
          font-weight: 600;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--primary-green);
          margin-bottom: 20px;
        }
        .page-hero-eyebrow::before {
          content: '';
          width: 28px;
          height: 1px;
          background: var(--accent);
        }
        .page-hero h1 {
          font-size: clamp(2rem, 4.4vw, 3.4rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.05;
          margin-bottom: 20px;
        }
        .page-hero p {
          font-size: 1.1rem;
          color: var(--text-muted);
          max-width: 640px;
          line-height: 1.7;
        }
        @media (max-width: 768px) {
          .page-hero { padding: 68px 0 52px; }
          .page-hero h1 { font-size: 1.9rem; }
          .page-hero p { font-size: 1rem; }
        }
      `}</style>
    </section>
  );
}
