import { Lightning, MapPin, ChartBar, Clock, CheckCircle, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import PageHero from './PageHero';
import RichText from './RichText';
import Reveal from './Reveal';
import Link from 'next/link';

export default function ProjectDetail({ project }) {
  const stats = [
    { icon: Lightning, value: project.capacity, label: 'Capacity' },
    { icon: MapPin, value: project.location, label: 'Location' },
    { icon: ChartBar, value: project.status, label: 'Status' },
    { icon: Clock, value: project.startDate, label: 'Start Date' },
  ];

  return (
    <>
      <PageHero
        title={project.name}
        subtitle={project.subtitle}
        backLink={{ href: '/projects/', label: 'Back to Projects' }}
      />

      <section className="section-padding project-body">
        <div className="container">
          <div className="project-hero">
            <Reveal variant="scale">
              <div className="project-hero-image">
                <img src={project.image || ''} alt={project.name} loading="lazy" />
              </div>
            </Reveal>
            <div className="project-hero-stats">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Reveal key={i} delay={i * 80}>
                    <div className="stat-card">
                      <div className="stat-icon"><Icon size={24} weight="bold" /></div>
                      <span className="stat-value">{s.value}</span>
                      <span className="stat-label">{s.label}</span>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <div className="project-content">
            <Reveal>
              <div className="project-description-section">
                <h2>Project Overview</h2>
                <RichText html={project.overview} />

                <h3>Key Features</h3>
                <ul className="feature-list">
                  {(project.features || []).map((f, i) => (
                    <li key={i}><CheckCircle size={18} weight="fill" /> {f}</li>
                  ))}
                </ul>

                <h3>Technical Specifications</h3>
                <div className="specs-table">
                  <div className="spec-row"><span>Installed Capacity</span><span>{project.capacity}</span></div>
                  {project.type ? <div className="spec-row"><span>Type</span><span>{project.type}</span></div> : null}
                  {project.location ? <div className="spec-row"><span>Location</span><span>{project.location}</span></div> : null}
                  {project.river ? <div className="spec-row"><span>River</span><span>{project.river}</span></div> : null}
                  {project.annualEnergy ? <div className="spec-row"><span>Annual Energy</span><span>{project.annualEnergy}</span></div> : null}
                  {project.status ? <div className="spec-row"><span>Status</span><span>{project.status}</span></div> : null}
                </div>

                <Link href="/projects/" className="btn btn-primary project-cta">
                  Explore More Projects
                  <ArrowUpRight size={18} weight="bold" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <style>{`
        .project-body { background: var(--bg-white); }
        .project-hero { margin-bottom: 60px; }
        .project-hero-image {
          border-radius: var(--radius-xl);
          overflow: hidden;
          margin-bottom: 32px;
          max-height: 500px;
          box-shadow: var(--shadow-xl);
        }
        .project-hero-image img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .project-hero-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border-soft);
          border-radius: var(--radius-md);
          padding: 26px 20px;
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
        .stat-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); border-color: transparent; }
        .stat-card:hover::before { transform: scaleX(1); }
        .stat-icon {
          width: 50px; height: 50px;
          margin: 0 auto 14px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(12,80,160,.1);
          color: var(--primary-blue);
        }
        .stat-value {
          display: block;
          font-family: var(--font-display), sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-dark);
          margin-bottom: 4px;
          line-height: 1.3;
        }
        .stat-label { font-size: .84rem; color: var(--text-muted); }

        .project-content { max-width: 940px; margin: 0 auto; }
        .project-description-section h2 {
          font-family: var(--font-display), sans-serif;
          font-size: 1.8rem;
          color: var(--text-dark);
          letter-spacing: -.01em;
          margin-bottom: 20px;
          position: relative;
          display: inline-block;
        }
        .project-description-section h2::after {
          content: '';
          position: absolute;
          left: 0; bottom: -8px;
          width: 44px; height: 3px;
          border-radius: 2px;
          background: var(--accent);
        }
        .project-description-section h3 { font-size: 1.25rem; margin: 34px 0 16px; color: var(--text-dark); }
        .project-description-section p {
          font-size: 1.02rem;
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 16px;
        }
        .feature-list {
          list-style: none; padding: 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px 24px;
        }
        .feature-list li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: .95rem;
          color: var(--text-body);
          background: var(--bg-light);
          border: 1px solid var(--border-soft);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          transition: border-color .2s, transform .2s var(--ease-out-expo);
        }
        .feature-list li:hover { border-color: var(--primary-green); transform: translateY(-2px); }
        .feature-list li svg { color: var(--primary-green); flex-shrink: 0; margin-top: 2px; }
        .specs-table {
          border: 1px solid var(--border-soft);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
        }
        .spec-row {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding: 16px 20px;
          background: var(--surface);
          border-bottom: 1px solid var(--border-soft);
          font-size: .95rem;
          transition: background .15s;
        }
        .spec-row:nth-child(odd) { background: var(--bg-light); }
        .spec-row:last-child { border-bottom: none; }
        .spec-row:hover { background: var(--bg-soft); }
        .spec-row span:first-child { font-weight: 600; color: var(--text-dark); }
        .spec-row span:last-child { color: var(--text-muted); text-align: right; }

        .project-cta { margin-top: 36px; }

        @media (max-width: 768px) {
          .project-hero-stats { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .feature-list { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}