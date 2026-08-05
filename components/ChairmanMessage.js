import { Quotes } from '@phosphor-icons/react/dist/ssr';
import Reveal from './Reveal';
import { DEFAULTS } from '../lib/defaults';

export default function ChairmanMessage({ chairman = DEFAULTS.chairman }) {
  const quote = chairman.quote || DEFAULTS.chairman.quote;
  const name = chairman.name || DEFAULTS.chairman.name;
  const role = chairman.role || DEFAULTS.chairman.role;
  const image = chairman.image || DEFAULTS.chairman.image;

  return (
    <section className="chairman-section">
      <div className="chairman-bg" />
      <div className="container">
        <div className="chairman-layout">
          <Reveal variant="left" className="chairman-media">
            <div className="chairman-avatar">
              <img src={image} alt={name} className="chairman-img" loading="lazy" />
            </div>
            <div className="chairman-ring" aria-hidden="true" />
          </Reveal>

          <Reveal variant="right">
            <div className="chairman-content">
              <Quotes size={54} weight="fill" className="quote-icon" />
              <span className="section-label">A Word From Leadership</span>
              <blockquote className="chairman-quote">“{quote}”</blockquote>
              <div className="chairman-author">
                <strong>{name}</strong>
                <span>{role}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .chairman-section {
          padding: 110px 0;
          background: var(--bg-light);
          position: relative;
          overflow: hidden;
        }
        .chairman-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(520px 280px at 90% 10%, rgba(12,80,160,.08), transparent 60%),
            radial-gradient(520px 280px at 8% 90%, rgba(15,138,67,.1), transparent 60%);
          pointer-events: none;
        }
        .chairman-layout {
          position: relative;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 60px;
          align-items: center;
          max-width: 960px;
          margin: 0 auto;
        }
        .chairman-media { position: relative; }
        .chairman-avatar {
          position: relative;
          z-index: 2;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          overflow: hidden;
          border: 6px solid #fff;
          box-shadow: var(--shadow-lg);
        }
        .chairman-img { width: 100%; height: 100%; object-fit: cover; display: block; transform: scale(1.01); }
        .chairman-ring {
          position: absolute;
          inset: -18px;
          border-radius: 50%;
          border: 2px dashed var(--primary-green);
          animation: spin 30s linear infinite;
          z-index: 1;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .chairman-content { position: relative; }
        .quote-icon {
          color: var(--primary-green);
          opacity: .18;
          margin-bottom: 14px;
          display: block;
        }
        .chairman-quote {
          font-family: var(--font-display), sans-serif;
          font-size: 1.35rem;
          font-weight: 500;
          line-height: 1.7;
          color: var(--text-dark);
          margin: 0 0 28px;
          border: none;
          padding: 0;
          letter-spacing: -.01em;
        }
        .chairman-author {
          display: flex;
          flex-direction: column;
          gap: 3px;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
        }
        .chairman-author strong {
          font-family: var(--font-display), sans-serif;
          font-size: 1.15rem;
          color: var(--primary-blue);
        }
        .chairman-author span { font-size: .9rem; color: var(--text-muted); }
        .chairman-author span::before { content: '— '; color: var(--accent); }

        @media (prefers-reduced-motion: reduce) {
          .chairman-ring { animation: none; }
        }
        @media (max-width: 768px) {
          .chairman-layout {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 40px;
            justify-items: center;
          }
          .chairman-avatar { width: 200px; height: 200px; }
          .chairman-quote { font-size: 1.1rem; }
          .chairman-author { align-items: center; border-top-color: var(--border-soft); }
          .chairman-section { padding: 70px 0; }
        }
      `}</style>
    </section>
  );
}