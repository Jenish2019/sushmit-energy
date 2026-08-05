'use client';

import { useState, useEffect, useCallback } from 'react';
import { CaretLeft, CaretRight, ArrowDown } from '@phosphor-icons/react/dist/ssr';
import { DEFAULTS } from '../lib/defaults';

export default function Banner({ slides = DEFAULTS.bannerSlides }) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(next, 6500);
    return () => clearInterval(t);
  }, [next, slides.length]);

  return (
    <section className="banner">
      <div className="banner-slides">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`banner-slide ${i === current ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="banner-overlay" />
            <div className="banner-content">
              <span className="banner-eyebrow">Clean Energy · Hydropower · Nepal</span>
              <h1 className="banner-title">{slide.title}</h1>
              <div className="banner-cta-row">
                <a href="/about-us/" className="btn btn-accent banner-cta">
                  Learn More
                </a>
                <a href="/projects/" className="btn btn-outline-light">Our Projects</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="banner-arrow banner-arrow-left" onClick={prev} aria-label="Previous slide">
        <CaretLeft size={24} weight="bold" />
      </button>
      <button className="banner-arrow banner-arrow-right" onClick={next} aria-label="Next slide">
        <CaretRight size={24} weight="bold" />
      </button>

      <div className="banner-progress" aria-hidden="true">
        {slides.map((_, i) => (
          <span key={i} className={`progress-bar ${i === current ? 'active' : ''}`} />
        ))}
      </div>

      <div className="banner-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <a href="#intro" className="banner-scroll" aria-label="Scroll down">
        <ArrowDown size={20} weight="bold" />
      </a>

      <style>{`
        .banner {
          position: relative;
          height: 86vh;
          min-height: 560px;
          max-height: 780px;
          overflow: hidden;
          background: #051024;
        }
        .banner-slides { position: relative; height: 100%; }
        .banner-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity .9s ease;
          will-change: transform, opacity;
        }
        .banner-slide.active {
          opacity: 1;
          animation: kenburns 9s ease-out forwards;
        }
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        .banner-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(5,16,36,.45) 0%, rgba(5,16,36,.55) 50%, rgba(5,16,36,.85) 100%),
            linear-gradient(120deg, rgba(12,80,160,.55), rgba(15,138,67,.35));
        }
        .banner-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 24px;
          max-width: 860px;
          margin: 0 auto;
        }
        .banner-eyebrow {
          font-family: var(--font-display), sans-serif;
          font-size: .8rem;
          font-weight: 600;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: rgba(255,255,255,.85);
          background: rgba(255,255,255,.14);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,.22);
          padding: 8px 18px;
          border-radius: 999px;
          margin-bottom: 26px;
          animation: rise .7s var(--ease-out-expo) both;
        }
        .banner-title {
          font-size: clamp(2.1rem, 5vw, 3.6rem);
          font-weight: 800;
          color: white;
          line-height: 1.15;
          margin-bottom: 32px;
          letter-spacing: -.02em;
          text-shadow: 0 4px 26px rgba(0,0,0,.4);
          animation: rise .8s .08s var(--ease-out-expo) both;
        }
        .banner-cta-row {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
          animation: rise .8s .18s var(--ease-out-expo) both;
        }
        .banner-cta { font-size: 1rem; padding: 15px 34px; }
        @keyframes rise {
          from { opacity: 0; transform: translateY(26px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .banner-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 4;
          background: rgba(255,255,255,.12);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,.22);
          color: white;
          width: 50px; height: 50px;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background .25s, transform .25s var(--ease-out-back), border-color .25s;
        }
        .banner-arrow:hover { background: var(--accent); border-color: var(--accent); color: #241a00; transform: translateY(-50%) scale(1.06); }
        .banner-arrow-left { left: 24px; }
        .banner-arrow-right { right: 24px; }

        .banner-progress {
          position: absolute;
          bottom: 32px;
          right: 24px;
          z-index: 4;
          display: flex;
          gap: 5px;
        }
        .progress-bar {
          width: 30px; height: 3px;
          border-radius: 2px;
          background: rgba(255,255,255,.3);
          overflow: hidden;
          position: relative;
        }
        .progress-bar.active::after {
          content: '';
          position: absolute; inset: 0;
          background: var(--accent);
          transform-origin: left;
          animation: progress 6.5s linear forwards;
        }
        @keyframes progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }

        .banner-dots {
          position: absolute;
          bottom: 26px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 4;
          display: flex;
          gap: 8px;
        }
        .dot {
          width: 9px; height: 9px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,.4);
          cursor: pointer;
          transition: all .3s var(--ease-out-back);
        }
        .dot.active { background: var(--accent); transform: scale(1.5); }

        .banner-scroll {
          position: absolute;
          bottom: 22px;
          left: 24px;
          z-index: 4;
          color: rgba(255,255,255,.8);
          animation: bounce 2.2s infinite;
        }
        @keyframes bounce {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .banner-slide.active { animation: none; }
          .progress-bar.active::after { animation: none; }
          .banner-eyebrow, .banner-title, .banner-cta-row { animation: none; opacity: 1; }
        }

        @media (max-width: 768px) {
          .banner { min-height: 460px; max-height: 560px; height: 74vh; }
          .banner-arrow { width: 40px; height: 40px; border-radius: 12px; }
          .banner-arrow-left { left: 12px; }
          .banner-arrow-right { right: 12px; }
          .banner-eyebrow { margin-bottom: 18px; }
          .banner-scroll { display: none; }
          .banner-progress { right: 14px; }
        }
      `}</style>
    </section>
  );
}