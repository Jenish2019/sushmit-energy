'use client';

import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import Reveal from './Reveal';

export default function PageHero({ title, subtitle, backLink }) {
  return (
    <section className="page-hero">
      <div className="page-hero-grid" aria-hidden="true" />
      <div className="page-hero-glow" aria-hidden="true" />
      <div className="container page-hero-inner">
        <Reveal>
          {backLink && (
            <Link href={backLink.href} className="page-hero-back">
              <ArrowLeft size={16} weight="bold" />
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
          padding: 96px 0 84px;
          background: linear-gradient(160deg, #071b38 0%, #0a2e5c 55%, var(--primary-blue) 100%);
          color: #fff;
          overflow: hidden;
          text-align: center;
        }
        .page-hero::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
          opacity: .5;
        }
        .page-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(800px 400px at 50% 0%, #000 30%, transparent 75%);
          -webkit-mask-image: radial-gradient(800px 400px at 50% 0%, #000 30%, transparent 75%);
          pointer-events: none;
        }
        .page-hero-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(520px 260px at 12% 15%, rgba(15,138,67,.28), transparent 60%),
            radial-gradient(520px 260px at 88% 20%, rgba(240,165,0,.18), transparent 60%);
          pointer-events: none;
        }
        .page-hero-inner { position: relative; z-index: 2; }
        .page-hero-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 26px;
          color: rgba(255,255,255,.75);
          font-size: .88rem;
          font-weight: 500;
          padding: 8px 16px;
          border: 1px solid rgba(255,255,255,.2);
          border-radius: 999px;
          background: rgba(255,255,255,.06);
          backdrop-filter: blur(6px);
          transition: background .2s, color .2s, transform .2s var(--ease-out-expo);
        }
        .page-hero-back:hover { background: rgba(255,255,255,.14); color: #fff; transform: translateY(-2px); }
        .page-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display), sans-serif;
          font-size: .78rem;
          font-weight: 600;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 16px;
        }
        .page-hero-eyebrow::before {
          content: '';
          width: 28px;
          height: 2px;
          border-radius: 2px;
          background: var(--accent);
        }
        .page-hero h1 {
          font-size: clamp(2rem, 4.6vw, 3.2rem);
          font-weight: 800;
          letter-spacing: -.02em;
          line-height: 1.1;
          margin-bottom: 16px;
        }
        .page-hero p {
          font-size: 1.1rem;
          opacity: .82;
          max-width: 640px;
          margin: 0 auto;
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .page-hero { padding: 72px 0 60px; }
          .page-hero h1 { font-size: 1.8rem; }
          .page-hero p { font-size: 1rem; }
        }
      `}</style>
    </section>
  );
}