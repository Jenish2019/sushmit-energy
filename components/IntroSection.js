'use client';

import { useState } from 'react';
import { Users, FolderOpen, Zap, History, LineChart, Cog, Clock, Target } from 'lucide-react';

const timeline = [
  { year: '2013', icon: Clock, color: '#2c3e50' },
  { year: '2014', icon: Cog, color: '#e74c3c' },
  { year: '2015', icon: History, color: '#7b3' },
  { year: '2016', icon: LineChart, color: '#20638f' },
];

const stats = [
  { icon: Users, value: '25', label: 'Engineers & Workers' },
  { icon: FolderOpen, value: '4', label: 'Projects In Progress' },
  { icon: Zap, value: '93', label: 'Megawatt Generate' },
];

export default function IntroSection() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <section className="intro-section">
      <div className="container">
        <div className="intro-layout">
          <div className="intro-left">
            <div className="intro-image-wrapper">
              <img
                src="https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/themes/sushmitenergy/images/sushilpkrl.jpg"
                alt="Sushmit Energy"
                className="intro-image"
              />
            </div>
            <div className="intro-tabs">
              <button
                className={`intro-tab ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                <Target size={20} />
                <div>
                  <strong>About Us</strong>
                  <span>Company Overview</span>
                </div>
              </button>
              <button
                className={`intro-tab ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                <History size={20} />
                <div>
                  <strong>Our History</strong>
                  <span>Defining Milestones</span>
                </div>
              </button>
            </div>
          </div>

          <div className="intro-right">
            {activeTab === 'about' && (
              <div className="intro-content">
                <div className="section-label">Welcome to</div>
                <h2 className="section-title">Sushmit Energy</h2>
                <p className="intro-text">
                  Sushmit Energy Pvt. Ltd is a leading hydropower project development company
                  established with the aim of expanding hydro energy investment in Nepali market.
                  We are currently working on four hydropower projects aimed at generating 93+ MW
                  of electricity upon its completion. We specialize in the development and
                  management of hydro projects with the aim of cost-effective investment and high
                  level of profit to the investors and the nation as well.
                </p>
                <div className="stats-grid">
                  {stats.map((s, i) => (
                    <div key={i} className="stat-card">
                      <div className="stat-icon">
                        <s.icon size={28} />
                      </div>
                      <span className="stat-value">{s.value}</span>
                      <span className="stat-label">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="intro-content">
                <h2 className="section-title">Our History</h2>
                <p className="intro-text">
                  Over 24 years of experience and knowledge of international standards,
                  technological changes, and industrial systems.
                </p>
                <div className="timeline-modern">
                  {timeline.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <div key={i} className="timeline-item">
                        <div className="timeline-marker" style={{ borderColor: item.color }}>
                          <Icon size={16} style={{ color: item.color }} />
                        </div>
                        <div className="timeline-card">
                          <span className="timeline-year">{item.year}</span>
                          <h4>Our Achievements</h4>
                          <p>
                            Over 24 years experience and knowledge international standards,
                            technological changes and industrial systems.
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .intro-section {
          padding: 100px 0;
          background: var(--bg-white);
        }
        .intro-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: start;
        }
        .intro-image-wrapper {
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }
        .intro-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .intro-image-wrapper:hover .intro-image {
          transform: scale(1.03);
        }
        .intro-tabs {
          display: flex;
          gap: 0;
          margin-top: -1px;
        }
        .intro-tab {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 24px;
          border: none;
          cursor: pointer;
          font-size: 0.9rem;
          text-align: left;
          transition: all 0.3s;
          background: var(--bg-light);
          color: var(--text-dark);
        }
        .intro-tab:first-child {
          border-radius: 0 0 0 var(--radius-md);
        }
        .intro-tab:last-child {
          border-radius: 0 0 var(--radius-md) 0;
        }
        .intro-tab.active {
          background: var(--primary-blue);
          color: white;
        }
        .intro-tab div strong {
          display: block;
          font-size: 0.95rem;
        }
        .intro-tab div span {
          font-size: 0.8rem;
          opacity: 0.8;
        }
        .section-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--primary-green);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 8px;
        }
        .intro-content .section-title {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 20px;
          color: var(--text-dark);
        }
        .intro-text {
          color: var(--text-muted);
          font-size: 1rem;
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
          border-radius: var(--radius-md);
          padding: 24px 16px;
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .stat-icon {
          display: flex;
          justify-content: center;
          margin-bottom: 12px;
          color: var(--primary-green);
        }
        .stat-value {
          display: block;
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--primary-blue);
        }
        .stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .timeline-modern {
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          padding-left: 30px;
        }
        .timeline-modern::before {
          content: '';
          position: absolute;
          left: 8px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--border-color);
        }
        .timeline-item {
          position: relative;
          display: flex;
          gap: 20px;
        }
        .timeline-marker {
          position: absolute;
          left: -30px;
          top: 4px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: white;
          border: 3px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }
        .timeline-card {
          flex: 1;
          padding: 20px;
          background: var(--bg-light);
          border-radius: var(--radius-md);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .timeline-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .timeline-year {
          display: inline-block;
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--primary-blue);
          margin-bottom: 6px;
        }
        .timeline-card h4 {
          margin: 0 0 6px;
          font-size: 1rem;
          color: var(--text-dark);
        }
        .timeline-card p {
          margin: 0;
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
        }
        @media (max-width: 768px) {
          .intro-layout {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .intro-section {
            padding: 60px 0;
          }
          .stats-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .intro-content .section-title {
            font-size: 1.6rem;
          }
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
