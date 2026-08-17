'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import Reveal from './Reveal';
import { DEFAULTS } from '../lib/defaults';

const DEFAULT_INTRO = DEFAULTS.homepage.intro;
const DEFAULT_STATS = DEFAULTS.homepage.stats;

function useCountUp(target) {
  const [value, setValue] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? target : 0
  );
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const t0 = performance.now();
          const tick = (now) => {
            const p = Math.min((now - t0) / duration, 1);
            setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return [ref, value];
}

export default function IntroSection({
  intro = DEFAULT_INTRO,
  stats = DEFAULT_STATS,
}) {
  const image = intro.image || DEFAULT_INTRO.image;
  const badgeYears = intro.badgeYears || DEFAULT_INTRO.badgeYears;
  const badgeLabel = intro.badgeLabel || DEFAULT_INTRO.badgeLabel;
  const statList = Array.isArray(stats) && stats.length ? stats : DEFAULT_STATS;

  return (
    <section className="story" id="intro">
      <div className="container">
        <div className="story-grid">
          <Reveal variant="left">
            <figure className="story-figure">
              <div className="story-figure-inner">
                <img src={image} alt={intro.title || 'Sushmit Energy'} loading="lazy" />
              </div>
              <figcaption>
                <span className="tag tag-green">{badgeYears} {badgeLabel}</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal variant="right">
            <div className="story-copy">
              <span className="section-kicker">{intro.label || 'Welcome to'}</span>
              <h2 className="section-title">{intro.title || 'Sushmit Energy'}</h2>
              <div className="story-copy-text">
                {String(intro.text || '').split(/\n{2,}/).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <a href="/about-us/" className="link-more">
                More about us <ArrowRight size={15} weight="bold" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="story-stats-reveal">
          <div className="story-facts">
            {statList.map((s, i) => (
              <div className="story-fact" key={i}>
                <StatValue value={Number(s.value) || 0} />
                <span className="story-fact-label">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        .story {
          padding: 56px 0 64px;
          background: var(--bg-white);
          overflow: hidden;
        }

        .story-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
          gap: 64px;
          align-items: center;
        }

        .story-figure {
          margin: 0;
          position: relative;
          height: clamp(300px, 44vh, 460px);
          overflow: hidden;
          background: var(--bg-dark);
        }
        .story-figure-inner {
          position: absolute;
          inset: 0;
        }
        .story-figure-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(.9);
          transition: filter .6s ease, transform .9s var(--ease-out-expo);
        }
        .story-figure:hover .story-figure-inner img { filter: saturate(1.06); transform: scale(1.03); }
        .story-figure figcaption {
          position: absolute;
          left: 18px;
          bottom: 18px;
        }

        .story-copy .section-kicker { margin-bottom: 14px; }
        .story-copy-text p {
          color: var(--text-body);
          font-size: 1.02rem;
          line-height: 1.8;
          margin-bottom: 1.1em;
          max-width: 56ch;
        }
        .story-copy .link-more { margin-top: 14px; }

        .story-stats-reveal { margin-top: 44px; }
        .story-facts {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          border-top: 1px solid var(--border-color);
        }
        .story-fact {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 6px;
          padding: 26px 12px 22px;
          border-bottom: 1px solid var(--border-color);
        }
        .story-fact + .story-fact { border-left: 1px solid var(--border-color); }
        .story-fact-label {
          font-family: var(--font-display), sans-serif;
          font-size: .76rem;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .story-fact-value {
          font-family: var(--font-display), sans-serif;
          font-size: clamp(2.2rem, 3.6vw, 3rem);
          font-weight: 500;
          line-height: 1;
          color: var(--text-dark);
          letter-spacing: -0.02em;
        }
        .story-fact-value em {
          font-style: normal;
          color: var(--primary-green);
          font-size: 0.55em;
          vertical-align: super;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .story-grid { grid-template-columns: 1fr; gap: 40px; }
          .story-figure { height: clamp(260px, 38vh, 360px); }
          .story-facts { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 768px) {
          .story { padding: 40px 0 48px; }
          .story-facts { grid-template-columns: 1fr; }
          .story-fact + .story-fact { border-left: none; }
          .story-stats-reveal { margin-top: 32px; }
        }
      `}</style>
    </section>
  );
}

function StatValue({ value }) {
  const [ref, v] = useCountUp(value);
  return (
    <span ref={ref} className="story-fact-value">
      {v}
    </span>
  );
}
