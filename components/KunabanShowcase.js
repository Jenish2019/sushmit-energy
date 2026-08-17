'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react';

export default function KunabanShowcase({ project }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 1.5;
      let p = (start - rect.top) / (end - start);
      p = Math.max(0, Math.min(1, p));
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  if (!project) return null;

  return (
    <section ref={ref} className="ks-section" id="our-project">
      <div className="ks-bg-wrap">
        <div
          className="ks-bg"
          style={{ backgroundImage: `url(${project.image})`, transform: `scale(${1.06 + progress * 0.14}) translateY(${progress * 40}px)` }}
        />
        <div className="ks-veil" />
        <div className="ks-veil-bottom" />
      </div>

      <div className="container ks-inner">
        <span className="ks-kicker">Our Project</span>
        <h2 className="ks-title">
          {project.name.split(' ').slice(0, 1).join(' ')} <em>{project.name.split(' ').slice(1).join(' ')}</em>
        </h2>
        <p className="ks-subtitle">{project.subtitle}</p>

        {(project.specs?.length > 0) && (
          <div className="ks-specs">
            {project.specs.map((s, i) => (
              <div className="ks-spec" key={i}>
                <span className="ks-spec-value">{s.value}</span>
                <span className="ks-spec-label">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="ks-actions">
          <a href="/projects/" className="ks-btn ks-btn--fill">
            Explore the project <ArrowRight size={16} weight="bold" />
          </a>
        </div>
      </div>

      <span className="ks-stat" aria-hidden="true">{project.capacity}</span>

      <style>{`
        .ks-section {
          position: relative;
          min-height: 100vh;
          min-height: 100svh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--bg-dark);
        }
        .ks-bg-wrap { position: absolute; inset: 0; }
        .ks-bg {
          position: absolute;
          inset: -60px 0;
          background-size: cover;
          background-position: center;
          will-change: transform;
        }
        .ks-veil {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(4,18,40,.86) 0%, rgba(4,18,40,.55) 55%, rgba(4,18,40,.18) 100%),
            linear-gradient(115deg, rgba(10,77,163,.3) 0%, rgba(15,122,68,.28) 100%);
        }
        .ks-veil-bottom {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 140px;
          background: linear-gradient(180deg, transparent, rgba(4,18,40,.55));
          pointer-events: none;
        }
        .ks-inner {
          position: relative;
          z-index: 2;
          padding: 64px 0 78px;
          max-width: 880px;
          margin-left: auto;
          margin-right: auto;
        }
        .ks-kicker {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-display), sans-serif;
          font-size: .72rem;
          font-weight: 600;
          letter-spacing: .26em;
          text-transform: uppercase;
          color: var(--accent-bright);
          margin-bottom: 18px;
        }
        .ks-kicker::before {
          content: '';
          width: 38px;
          height: 1px;
          background: var(--accent-bright);
        }
        .ks-title {
          font-family: var(--font-display), sans-serif;
          font-size: clamp(2.1rem, 4.4vw, 3.5rem);
          font-weight: 600;
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #fff;
          margin: 0 0 16px;
          max-width: 18ch;
          text-shadow: 0 3px 30px rgba(0,0,0,.5);
        }
        .ks-title em {
          font-style: normal;
          font-weight: 300;
          color: rgba(255,255,255,.78);
        }
        .ks-subtitle {
          color: rgba(255,255,255,.82);
          font-size: .98rem;
          line-height: 1.72;
          max-width: 56ch;
          margin-bottom: 22px;
        }
        .ks-specs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          max-width: 640px;
          margin-bottom: 26px;
        }
        .ks-spec {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 14px 16px;
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.2);
          border-radius: var(--radius-sm);
          backdrop-filter: blur(6px);
        }
        .ks-spec-value {
          font-family: var(--font-display), sans-serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: #fff;
          line-height: 1.2;
        }
        .ks-spec-label {
          font-size: .68rem;
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: rgba(255,255,255,.7);
        }
        .ks-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
        .ks-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display), sans-serif;
          font-size: .82rem;
          font-weight: 600;
          letter-spacing: .06em;
          text-transform: uppercase;
          padding: 13px 24px;
          border-radius: var(--radius-pill);
          transition: transform .3s var(--ease-out-expo), box-shadow .3s, background .3s, color .3s, border-color .3s;
        }
        .ks-btn svg { transition: transform .25s var(--ease-out-expo); }
        .ks-btn:hover svg { transform: translateX(4px); }
        .ks-btn--fill { background: var(--grad-brand); color: #fff; box-shadow: 0 12px 30px rgba(8,90,66,.35); }
        .ks-btn--fill:hover { transform: translateY(-3px); box-shadow: 0 18px 40px rgba(8,90,66,.45); }
        .ks-stat {
          position: absolute;
          right: 3%;
          bottom: 4%;
          z-index: 2;
          font-family: var(--font-display), sans-serif;
          font-size: clamp(2.6rem, 8vw, 6rem);
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1;
          color: rgba(255,255,255,.1);
          -webkit-text-stroke: 1px rgba(255,255,255,.22);
          pointer-events: none;
          user-select: none;
        }
        @media (max-width: 900px) {
          .ks-section { min-height: auto; padding: 48px 0 64px; }
          .ks-stat { display: none; }
          .ks-inner { padding: 24px 0; }
          .ks-specs { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </section>
  );
}
