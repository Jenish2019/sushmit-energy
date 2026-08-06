'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Users, FolderOpen, Lightning, ClockCounterClockwise, ChartLine, Gear, Clock, Crosshair,
} from '@phosphor-icons/react/dist/ssr';
import Reveal from './Reveal';
import { DEFAULTS } from '../lib/defaults';

const statIcons = [Users, FolderOpen, Lightning];
const timelineIcons = [Clock, Gear, ClockCounterClockwise, ChartLine];

const DEFAULT_INTRO = DEFAULTS.homepage.intro;
const DEFAULT_STATS = DEFAULTS.homepage.stats;
const DEFAULT_HISTORY = DEFAULTS.homepage.history;

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
          const duration = 1200;
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
  history = DEFAULT_HISTORY,
}) {
  const [activeTab, setActiveTab] = useState('about');

  const image = intro.image || DEFAULT_INTRO.image;
  const badgeYears = intro.badgeYears || DEFAULT_INTRO.badgeYears;
  const badgeLabel = intro.badgeLabel || DEFAULT_INTRO.badgeLabel;
  const historyLabel = history.label || 'Our Journey';
  const historyTitle = history.title || 'Our History';
  const historyText = history.text || DEFAULT_HISTORY.text;
  const historyItems = Array.isArray(history.items) && history.items.length ? history.items : DEFAULT_HISTORY.items;
  const statList = Array.isArray(stats) && stats.length ? stats : DEFAULT_STATS;

  return (
    <section className="intro-section" id="intro">
      <div className="container">
        <div className="intro-layout">
          <div className="intro-left">
            <Reveal variant="left">
              <div className="intro-image-wrapper">
                <img
                  src={image}
                  alt="Sushmit Energy"
                  className="intro-image"
                />
                <div className="intro-badge">
                  <span className="badge-years">{badgeYears}</span>
                  <span className="badge-label">{badgeLabel}</span>
                </div>
              </div>
            </Reveal>
            <div className="intro-tabs" role="tablist">
              <button
                role="tab"
                aria-selected={activeTab === 'about'}
                className={`intro-tab ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                <Crosshair size={18} weight="bold" />
                <span>About Us</span>
              </button>
              <button
                role="tab"
                aria-selected={activeTab === 'history'}
                className={`intro-tab ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                <ClockCounterClockwise size={18} weight="bold" />
                <span>Our History</span>
              </button>
            </div>
          </div>

          <div className="intro-right">
            <Reveal>
              {activeTab === 'about' ? (
                <div className="intro-content">
                  <span className="section-label">{intro.label || 'Welcome to'}</span>
                  <h2 className="section-title">{intro.title || 'Sushmit Energy'}</h2>
                  <p className="intro-text">{intro.text}</p>
                  <div className="stats-grid">
                    {statList.map((s, i) => (
                      <StatCard key={i} stat={{ ...s, icon: statIcons[i % statIcons.length], value: Number(s.value) || 0 }} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="intro-content">
                  <span className="section-label">{historyLabel}</span>
                  <h2 className="section-title">{historyTitle}</h2>
                  <p className="intro-text">
                    {historyText}
                  </p>
                  <div className="timeline-modern">
                    {historyItems.map((item, i) => {
                      const Icon = timelineIcons[i % timelineIcons.length];
                      return (
                        <div key={i} className="timeline-item">
                          <div className="timeline-marker" style={{ borderColor: item.color }}>
                            <Icon size={16} weight="bold" style={{ color: item.color }} />
                          </div>
                          <div className="timeline-card">
                            <span className="timeline-year">{item.year}</span>
                            <h4>{item.title}</h4>
                            <p>
                              {item.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        .intro-section {
          padding: 110px 0 120px;
          background: var(--bg-white);
          overflow: hidden;
        }
        .intro-layout {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 64px;
          align-items: center;
        }
        .intro-image-wrapper {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-xl);
        }
        .intro-image {
          width: 100%;
          height: 460px;
          object-fit: cover;
          display: block;
          transition: transform .7s var(--ease-out-expo);
        }
        .intro-image-wrapper::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(200deg, transparent 50%, rgba(5,16,36,.55));
        }
        .intro-image-wrapper:hover .intro-image { transform: scale(1.05); }
        .intro-badge {
          position: absolute;
          right: 22px;
          bottom: -28px;
          z-index: 3;
          background: linear-gradient(135deg, var(--primary-blue), var(--primary-blue-dark));
          color: #fff;
          padding: 18px 22px;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .badge-years {
          font-family: var(--font-display), sans-serif;
          font-size: 2rem;
          font-weight: 800;
          line-height: 1;
          color: var(--accent);
        }
        .badge-label {
          font-size: .78rem;
          line-height: 1.3;
          opacity: .9;
          text-transform: uppercase;
          letter-spacing: .04em;
        }

        .intro-tabs {
          display: flex;
          gap: 8px;
          margin-top: 34px;
        }
        .intro-tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 20px;
          border: 1.5px solid var(--border-color);
          border-radius: 999px;
          cursor: pointer;
          font-family: var(--font-display), sans-serif;
          font-size: .92rem;
          font-weight: 600;
          color: var(--text-body);
          background: var(--surface);
          transition: all .25s var(--ease-out-expo);
        }
        .intro-tab:hover { border-color: var(--primary-blue); color: var(--primary-blue); transform: translateY(-2px); }
        .intro-tab.active {
          background: linear-gradient(135deg, var(--primary-blue), var(--primary-blue-dark));
          color: #fff;
          border-color: var(--primary-blue);
          box-shadow: var(--shadow-md);
        }

        .section-label {
          font-family: var(--font-display), sans-serif;
          font-size: .8rem;
          font-weight: 600;
          color: var(--primary-green);
          text-transform: uppercase;
          letter-spacing: .16em;
          margin-bottom: 12px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .section-label::before { content: ''; width: 26px; height: 2px; border-radius: 2px; background: var(--accent); }
        .intro-content .section-title {
          font-size: clamp(1.9rem, 3vw, 2.5rem);
          font-weight: 700;
          margin-bottom: 20px;
          color: var(--text-dark);
          letter-spacing: -.02em;
        }
        .intro-text {
          color: var(--text-muted);
          font-size: 1.02rem;
          line-height: 1.8;
          margin-bottom: 36px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .stat-card {
          background: var(--bg-light);
          border: 1px solid var(--border-soft);
          border-radius: var(--radius-md);
          padding: 26px 16px;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: transform .3s var(--ease-out-expo), box-shadow .3s, border-color .3s;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--primary-blue), var(--accent));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .35s var(--ease-out-expo);
        }
        .stat-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-md); border-color: transparent; }
        .stat-card:hover::before { transform: scaleX(1); }
        .stat-icon {
          width: 52px; height: 52px;
          margin: 0 auto 14px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(240,165,0,.12);
          color: var(--accent-dark);
        }
        .stat-value {
          display: block;
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-dark);
          line-height: 1;
          font-family: var(--font-display), sans-serif;
        }
        .stat-value span { font-size: 1.2rem; color: var(--accent); }
        .stat-label { font-size: .84rem; color: var(--text-muted); margin-top: 6px; display: block; }

        .timeline-modern {
          display: flex;
          flex-direction: column;
          gap: 18px;
          position: relative;
          padding-left: 20px;
        }
        .timeline-modern::before {
          content: '';
          position: absolute;
          left: 8px;
          top: 6px; bottom: 6px;
          width: 2px;
          background: var(--border-color);
          border-radius: 2px;
        }
        .timeline-item { position: relative; }
        .timeline-marker {
          position: absolute;
          left: -20px;
          top: 2px;
          width: 34px; height: 34px;
          border-radius: 50%;
          background: var(--bg-white);
          border: 3px solid;
          display: flex; align-items: center; justify-content: center;
          z-index: 2;
          box-shadow: 0 2px 8px rgba(16,33,59,.14);
          transform: scale(1);
          transition: transform .25s var(--ease-out-back);
        }
        .timeline-item:hover .timeline-marker { transform: scale(1.15) rotate(8deg); }
        .timeline-card {
          flex: 1;
          padding: 20px 24px;
          background: var(--surface);
          border: 1px solid var(--border-soft);
          border-radius: var(--radius-md);
          transition: transform .3s var(--ease-out-expo), box-shadow .3s, border-color .3s;
        }
        .timeline-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); border-color: var(--primary-blue); }
        .timeline-year {
          display: inline-block;
          font-family: var(--font-display), sans-serif;
          font-weight: 700;
          font-size: 1rem;
          color: var(--primary-blue);
          background: rgba(12,80,160,.1);
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: 10px;
        }
        .timeline-card h4 { margin: 0 0 6px; font-size: 1rem; color: var(--text-dark); }
        .timeline-card p { margin: 0; font-size: .85rem; color: var(--text-muted); line-height: 1.6; }

        @media (max-width: 1024px) {
          .intro-layout { grid-template-columns: 1fr; gap: 44px; }
          .intro-image { height: 400px; }
        }
        @media (max-width: 768px) {
          .intro-section { padding: 70px 0 80px; }
          .stats-grid { grid-template-columns: 1fr; }
          .intro-content .section-title { font-size: 1.6rem; }
          .intro-image { height: 320px; }
        }
      `}</style>
    </section>
  );
}

function StatCard({ stat }) {
  const [ref, value] = useCountUp(stat.value);
  const Icon = stat.icon;
  return (
    <div ref={ref} className="stat-card">
      <div className="stat-icon"><Icon size={24} weight="bold" /></div>
      <span className="stat-value">{value}<span>+</span></span>
      <span className="stat-label">{stat.label}</span>
    </div>
  );
}