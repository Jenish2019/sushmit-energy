import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import Reveal from './Reveal';
import { DEFAULTS } from '../lib/defaults';

export default function Projects({ projects = DEFAULTS.projects }) {
  const list = projects.map((p) => ({
    title: p.name || p.title,
    capacity: p.capacity || p.capacity,
    img: p.image || p.img,
    link: p.slug ? `/${p.slug}/` : p.link,
  }));

  return (
    <section className="projects-section">
      <div className="projects-glow" />
      <div className="projects-overlay">
        <div className="container">
          <Reveal>
            <div className="text-center projects-head">
              <span className="section-label section-label-light">What We Build</span>
              <h2 className="section-title" style={{ color: '#fff' }}>Our Projects</h2>
              <p className="section-subtitle" style={{ color: 'rgba(255,255,255,.72)' }}>
                Developing sustainable hydropower projects across Nepal
              </p>
            </div>
          </Reveal>
          <div className="projects-grid">
            {list.map((project, i) => (
              <Reveal key={i} delay={i * 90} className="project-reveal">
                <a href={project.link} className="project-card">
                  <div className="project-image">
                    <img src={project.img} alt={project.title} loading="lazy" />
                    <div className="project-overlay" />
                    <div className="project-capacity">{project.capacity}</div>
                    <div className="project-arrow">
                      <ArrowUpRight size={22} weight="bold" />
                    </div>
                  </div>
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <span className="project-view">View Project</span>
                  </div>
                </a>
              </Reveal>
            ))}
            <Reveal delay={list.length * 90} className="project-reveal">
              <a href="/projects/" className="project-card project-card-cta">
                <div className="project-cta-inner">
                  <span>View All Projects</span>
                  <span className="cta-circle"><ArrowUpRight size={24} weight="bold" /></span>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        .projects-section {
          background: linear-gradient(135deg, #0a2e5c, #061a36);
          position: relative;
          overflow: hidden;
        }
        .projects-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(700px 400px at 85% 10%, rgba(15,138,67,.22), transparent 60%),
            radial-gradient(700px 400px at 10% 90%, rgba(12,80,160,.3), transparent 60%);
          pointer-events: none;
        }
        .projects-overlay { position: relative; z-index: 1; padding: 110px 0; }
        .projects-head { margin-bottom: 8px; }
        .section-label-light { color: var(--accent); }
        .projects-head .section-subtitle { margin-bottom: 0; }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
          margin-top: 48px;
        }
        .project-reveal { display: block; height: 100%; }
        .project-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: var(--radius-lg);
          overflow: hidden;
          text-decoration: none;
          backdrop-filter: blur(6px);
          transition: transform .35s var(--ease-out-expo), box-shadow .35s, border-color .35s;
        }
        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px -20px rgba(0,0,0,.5);
          border-color: rgba(255,255,255,.28);
          background: rgba(255,255,255,.09);
        }
        .project-image { position: relative; height: 210px; overflow: hidden; }
        .project-image img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform .7s var(--ease-out-expo);
        }
        .project-card:hover .project-image img { transform: scale(1.12); }
        .project-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(5,16,36,.65));
          opacity: 0;
          transition: opacity .3s;
        }
        .project-card:hover .project-overlay { opacity: 1; }
        .project-capacity {
          position: absolute;
          top: 14px; left: 14px;
          font-family: var(--font-display), sans-serif;
          font-size: .78rem;
          font-weight: 700;
          color: #241a00;
          background: var(--accent);
          padding: 6px 12px;
          border-radius: 999px;
          box-shadow: var(--shadow-accent);
        }
        .project-arrow {
          position: absolute;
          right: 14px; bottom: -46px;
          width: 46px; height: 46px;
          border-radius: 14px;
          background: var(--primary-green);
          color: #fff;
          display: flex; align-items: center; justify-content: center;
          transition: bottom .3s var(--ease-out-expo), transform .3s var(--ease-out-back);
        }
        .project-card:hover .project-arrow { bottom: 14px; }
        .project-arrow:hover { transform: scale(1.1); }
        .project-info {
          padding: 18px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }
        .project-info h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #fff;
          margin: 0;
          line-height: 1.4;
          font-family: var(--font-display), sans-serif;
        }
        .project-view {
          font-size: .8rem;
          color: rgba(255,255,255,.6);
          transition: color .2s;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .project-card:hover .project-view { color: var(--accent); }

        .project-card-cta {
          align-items: center;
          justify-content: center;
          border-style: dashed;
          background: transparent;
        }
        .project-card-cta:hover { background: rgba(255,255,255,.08); border-style: dashed; }
        .project-cta-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          color: #fff;
          font-size: 1.05rem;
          font-weight: 600;
          padding: 40px 20px;
          text-align: center;
          font-family: var(--font-display), sans-serif;
        }
        .cta-circle {
          width: 56px; height: 56px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,.4);
          display: flex; align-items: center; justify-content: center;
          transition: all .3s var(--ease-out-back);
        }
        .project-card-cta:hover .cta-circle { background: var(--accent); border-color: var(--accent); color: #241a00; transform: rotate(45deg) scale(1.05); }

        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 560px) {
          .projects-grid { grid-template-columns: 1fr; }
          .projects-overlay { padding: 70px 0; }
        }
      `}</style>
    </section>
  );
}