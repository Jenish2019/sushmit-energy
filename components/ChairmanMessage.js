import { Quotes } from '@phosphor-icons/react/dist/ssr';
import Reveal from './Reveal';
import { DEFAULTS } from '../lib/defaults';

export default function ChairmanMessage({ chairman = DEFAULTS.chairman }) {
  const quote = chairman.quote || DEFAULTS.chairman.quote;
  const name = chairman.name || DEFAULTS.chairman.name;
  const role = chairman.role || DEFAULTS.chairman.role;
  const image = chairman.image || DEFAULTS.chairman.image;
  const label = chairman.label || 'A Word From Leadership';

  return (
    <section className="chairman">
      <div className="chairman-grid" aria-hidden="true" />
      <div className="container">
        <div className="chairman-layout">
          <Reveal variant="left">
            <div className="chairman-media">
              <img src={image} alt={name} loading="lazy" />
              <span className="chairman-index" aria-hidden="true">SE</span>
            </div>
          </Reveal>

          <Reveal variant="mask">
            <div className="chairman-content">
              <span className="section-kicker chairman-kicker">{label}</span>
              <Quotes size={64} weight="fill" className="chairman-quote-icon" aria-hidden="true" />
              <blockquote className="chairman-quote">{quote}</blockquote>
              <div className="chairman-author">
                <strong>{name}</strong>
                <span>{role}</span>
              </div>
              <a href="/message-of-chairman/" className="link-more chairman-link">
                Full message <ArrowRightIcon />
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        .chairman {
          position: relative;
          background: var(--bg-dark);
          color: #d7dde4;
          padding: 130px 0;
          overflow: hidden;
        }
        .chairman::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(560px 340px at 88% 12%, rgba(15,122,68,.2), transparent 60%),
            radial-gradient(560px 340px at 8% 92%, rgba(10,77,163,.22), transparent 60%);
          pointer-events: none;
        }
        .chairman-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(900px 500px at 50% 50%, #000 20%, transparent 80%);
          -webkit-mask-image: radial-gradient(900px 500px at 50% 50%, #000 20%, transparent 80%);
          pointer-events: none;
        }

        .chairman-layout {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 80px;
          align-items: center;
          max-width: 1080px;
          margin: 0 auto;
        }
        .chairman-media {
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: var(--radius-sm);
        }
        .chairman-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(.35) contrast(1.02);
          transition: filter .6s ease, transform .8s var(--ease-out-expo);
        }
        .chairman-media:hover img { filter: grayscale(0); transform: scale(1.03); }
        .chairman-index {
          position: absolute;
          top: 18px;
          left: 18px;
          font-family: var(--font-display), sans-serif;
          font-size: .78rem;
          font-weight: 600;
          letter-spacing: .22em;
          color: rgba(255,255,255,.75);
          border: 1px solid rgba(255,255,255,.35);
          border-radius: var(--radius-pill);
          padding: 6px 14px;
          backdrop-filter: blur(4px);
          background: rgba(10,14,20,.25);
        }

        .chairman-content { position: relative; }
        .chairman-kicker { color: var(--accent-bright); }
        .chairman-quote-icon {
          color: var(--accent-bright);
          opacity: .35;
          margin: 26px 0 20px;
          display: block;
        }
        .chairman-quote {
          font-family: var(--font-display), sans-serif;
          font-size: clamp(1.35rem, 2.4vw, 1.9rem);
          font-weight: 400;
          line-height: 1.55;
          color: #f2f5f7;
          margin: 0 0 40px;
          letter-spacing: -0.01em;
        }
        .chairman-author {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding-top: 22px;
          border-top: 1px solid rgba(255,255,255,.14);
        }
        .chairman-author strong {
          font-family: var(--font-display), sans-serif;
          font-size: 1.1rem;
          color: #fff;
        }
        .chairman-author span {
          font-size: .86rem;
          color: rgba(215,221,228,.7);
          letter-spacing: .04em;
        }
        .chairman-link { margin-top: 28px; color: var(--accent-bright); }

        @media (max-width: 900px) {
          .chairman-layout { grid-template-columns: 1fr; gap: 48px; }
          .chairman-media { max-width: 320px; }
        }
        @media (max-width: 768px) {
          .chairman { padding: 84px 0; }
          .chairman-quote { font-size: 1.2rem; }
        }
      `}</style>
    </section>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}
