'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, ArrowDown } from '@phosphor-icons/react/dist/ssr';
import { DEFAULTS } from '../lib/defaults';

export default function Banner({ slides = DEFAULTS.bannerSlides, eyebrow = DEFAULTS.homepage.bannerEyebrow }) {
  const [current, setCurrent] = useState(0);
  const [offset, setOffset] = useState(0);
  const heroRef = useRef(null);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [next, slides.length]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setOffset(window.scrollY);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const parallax = Math.min(offset * 0.22, 320);
  const fade = Math.max(0, 1 - offset / 800);

  return (
    <section ref={heroRef} className="hero" id="top">
      <div className="hero-slides">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`hero-slide ${i === current ? 'active' : ''}`}
            style={{
              backgroundImage: `url(${slide.img})`,
              transform: `translateY(${i === current ? parallax : 0}px)`,
            }}
          >
            <div className="hero-veil" />
            <div className="hero-top-fade" />
          </div>
        ))}
      </div>

      <div className="hero-content" style={{ opacity: fade }}>
        <div className="container">
          <span className="hero-kicker">{eyebrow}</span>
          <h1 className="hero-title">{slides[current]?.title}</h1>
          <div className="hero-cta-row">
            <a href="/about-us/" className="hero-link">
              Learn More <ArrowRight size={17} weight="bold" />
            </a>
            <a href="/projects/" className="hero-link hero-link--light">
              Our Project <ArrowRight size={17} weight="bold" />
            </a>
          </div>
        </div>
      </div>

      <div className="hero-caption" style={{ opacity: fade }}>
        <div className="container">
          <span className="hero-caption-label">{eyebrow}</span>
          <span className="hero-caption-sep">/</span>
          <span className="hero-caption-count">
            {String(current + 1).padStart(2, '0')} — {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="hero-progress" aria-hidden="true">
        {slides.map((_, i) => (
          <span key={i} className={`hero-progress-bar ${i === current ? 'active' : ''}`} />
        ))}
      </div>

      <button className="hero-scroll" onClick={() => document.querySelector('#intro')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Scroll to intro">
        <span>Scroll</span>
        <ArrowDown size={15} weight="bold" />
      </button>

      <style>{`
        .hero {
          position: relative;
          height: 92vh;
          min-height: 600px;
          max-height: 900px;
          overflow: hidden;
          background: var(--bg-dark);
        }
        .hero-slides { position: absolute; inset: 0; }
        .hero-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 1s ease;
          will-change: transform, opacity;
        }
        .hero-slide.active { opacity: 1; animation: herozoom 10s ease-out forwards; }
        @keyframes herozoom {
          0% { transform: scale(1.02) translateY(0); }
          100% { transform: scale(1.12) translateY(0); }
        }
        .hero-veil {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(6,28,58,.34) 0%, rgba(6,28,58,.2) 42%, rgba(4,24,34,.78) 100%),
            linear-gradient(115deg, rgba(10,77,163,.42) 0%, rgba(12,60,110,.22) 48%, rgba(15,122,68,.34) 100%);
        }
        /* Light fade behind the transparent navbar so nav text stays readable */
        .hero-top-fade {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 160px;
          z-index: 3;
          background: linear-gradient(180deg, rgba(247,250,253,.68) 0%, rgba(247,250,253,.28) 55%, rgba(247,250,253,0) 100%);
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          will-change: opacity;
        }
        .hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          font-family: var(--font-display), sans-serif;
          font-size: .78rem;
          font-weight: 600;
          letter-spacing: .24em;
          text-transform: uppercase;
          color: rgba(255,255,255,.85);
          margin-bottom: 28px;
          animation: rise .8s var(--ease-out-expo) both;
        }
        .hero-kicker::before {
          content: '';
          width: 34px;
          height: 1px;
          background: var(--accent-bright);
        }
        .hero-title {
          font-size: clamp(2.4rem, 5.4vw, 4.6rem);
          font-weight: 500;
          color: #fff;
          line-height: 1.06;
          letter-spacing: -0.02em;
          max-width: 15ch;
          margin: 0 0 40px;
          text-shadow: 0 3px 30px rgba(0,0,0,.45);
          animation: rise .9s .1s var(--ease-out-expo) both;
        }
        .hero-cta-row {
          display: flex;
          gap: 34px;
          flex-wrap: wrap;
          animation: rise .9s .2s var(--ease-out-expo) both;
        }
        .hero-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display), sans-serif;
          font-size: .86rem;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #fff;
          padding-bottom: 5px;
          position: relative;
          transition: color .2s;
        }
        .hero-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: 0;
          width: 100%;
          height: 1px;
          background: var(--accent-bright);
          transform: scaleX(1);
          transform-origin: left;
          transition: transform .3s var(--ease-out-expo), background .2s;
        }
        .hero-link svg { transition: transform .25s var(--ease-out-expo); }
        .hero-link:hover { color: var(--accent-bright); }
        .hero-link:hover::after { transform: scaleX(.45); }
        .hero-link:hover svg { transform: translateX(4px); }
        .hero-link--light { color: rgba(255,255,255,.78); }
        .hero-link--light::after { background: rgba(255,255,255,.4); }
        .hero-link--light:hover { color: #fff; }

        @keyframes rise {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-caption {
          position: absolute;
          left: 0; right: 0;
          bottom: 34px;
          z-index: 3;
          will-change: opacity;
        }
        .hero-caption .container {
          display: flex;
          align-items: center;
          gap: 14px;
          color: rgba(255,255,255,.66);
          font-size: .76rem;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .hero-caption-label { color: rgba(255,255,255,.85); }
        .hero-caption-sep { color: var(--accent-bright); }

        .hero-progress {
          position: absolute;
          bottom: 0;
          left: 0; right: 0;
          z-index: 3;
          display: flex;
          gap: 0;
          height: 3px;
        }
        .hero-progress-bar {
          flex: 1;
          background: rgba(255,255,255,.18);
          position: relative;
          overflow: hidden;
        }
        .hero-progress-bar.active::after {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--accent-bright);
          transform-origin: left;
          animation: progress 7s linear forwards;
        }
        @keyframes progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        .hero-scroll {
          position: absolute;
          right: 34px;
          bottom: 90px;
          z-index: 4;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,.7);
          font-family: var(--font-display), sans-serif;
          font-size: .7rem;
          letter-spacing: .2em;
          text-transform: uppercase;
          writing-mode: vertical-rl;
          transition: color .2s;
        }
        .hero-scroll svg { animation: dropline 2s ease-in-out infinite; }
        .hero-scroll:hover { color: #fff; }
        @keyframes dropline {
          0%,100% { transform: translateY(0); opacity: .6; }
          50% { transform: translateY(8px); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-slide.active { animation: none; }
          .hero-progress-bar.active::after { animation: none; }
          .hero-kicker, .hero-title, .hero-cta-row { animation: none; opacity: 1; }
          .hero-scroll svg { animation: none; }
        }

        @media (max-width: 768px) {
          .hero { height: 80vh; min-height: 500px; max-height: 680px; }
          .hero-title { font-size: 2rem; }
          .hero-caption { bottom: 60px; }
          .hero-scroll { display: none; }
          .hero-caption-count { display: none; }
        }
      `}</style>
    </section>
  );
}
