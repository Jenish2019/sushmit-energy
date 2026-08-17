'use client';

export default function Ticker({ items = [] }) {
  if (!items.length) return null;

  const row = [...items, ...items];

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        <div className="ticker-row">
          {row.map((item, i) => (
            <span className="ticker-item" key={i}>
              <strong>{item.title}</strong>
              {item.capacity ? <em>{item.capacity}</em> : null}
              <i className="ticker-dot" />
            </span>
          ))}
        </div>
      </div>
      <style>{`
        .ticker {
          position: relative;
          overflow: hidden;
          background: var(--grad-brand);
          padding: 15px 0;
          transform: translateZ(0);
        }
        .ticker::before,
        .ticker::after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          width: 60px;
          z-index: 2;
          pointer-events: none;
        }
        .ticker::before { left: 0; background: linear-gradient(90deg, rgba(6,28,58,.4), transparent); }
        .ticker::after { right: 0; background: linear-gradient(-90deg, rgba(6,28,58,.4), transparent); }
        .ticker-track { display: flex; }
        .ticker-row {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: 0;
          white-space: nowrap;
          animation: ticker-scroll 28s linear infinite;
          will-change: transform;
        }
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 0 26px;
          color: rgba(255,255,255,.92);
          font-family: var(--font-display), sans-serif;
        }
        .ticker-item strong {
          font-size: .9rem;
          font-weight: 600;
          letter-spacing: .06em;
          text-transform: uppercase;
        }
        .ticker-item em {
          font-style: normal;
          font-size: .78rem;
          font-weight: 600;
          letter-spacing: .1em;
          color: rgba(255,255,255,.7);
          border: 1px solid rgba(255,255,255,.4);
          border-radius: var(--radius-pill);
          padding: 3px 10px;
        }
        .ticker-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,.85);
          margin-left: 14px;
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-row { animation: none; }
        }
      `}</style>
    </div>
  );
}
