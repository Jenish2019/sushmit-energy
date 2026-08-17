import Link from 'next/link';
import { ArrowRight, ArrowUpRight, CalendarBlank, Newspaper } from '@phosphor-icons/react/dist/ssr';
import Reveal from './Reveal';
import { getRecentArticles } from '../lib/data';

export const dynamic = 'force-dynamic';

export default async function LatestUpdates() {
  const articles = await getRecentArticles(6);

  if (!articles || !articles.length) return null;

  return (
    <section className="updates">
      <div className="container">
        <div className="updates-head">
          <Reveal variant="mask">
            <span className="section-kicker">Latest</span>
            <h2 className="section-title">Updates &amp; News</h2>
          </Reveal>
          <Reveal>
            <Link href="/news/" className="link-more updates-all">
              All news <ArrowRight size={15} weight="bold" />
            </Link>
          </Reveal>
        </div>

        <div className="updates-grid">
          {articles.map((a, i) => (
            <Reveal key={i} delay={i * 80} className="updates-reveal">
              <Link href={`/media/${a.slug}`} className={`update-card ${a.image ? '' : 'update-card--nophoto'}`}>
                <div className="update-media">
                  {a.image ? (
                    <img src={a.image} alt={a.title} loading="lazy" />
                  ) : (
                    <div className="update-media-fallback">
                      <span className="update-fallback-glyph"><Newspaper size={40} weight="thin" /></span>
                      <span className="update-fallback-brand">Sushmit Energy</span>
                    </div>
                  )}
                  {a.category && <span className="update-cat">{a.category}</span>}
                </div>
                <div className="update-body">
                  <span className="update-date">
                    <CalendarBlank size={14} weight="fill" />
                    {a.date}
                  </span>
                  <h3>{a.title}</h3>
                  <span className="update-arrow" aria-hidden="true">
                    <ArrowUpRight size={20} weight="bold" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        .updates {
          padding: 72px 0 84px;
          background: linear-gradient(180deg, var(--bg-white) 0%, var(--bg-green) 30%, var(--bg-green) 72%, var(--bg-white) 100%);
          position: relative;
        }
        .updates::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent 4%, rgba(15,122,68,.35), transparent 96%);
        }
        .updates-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 30px;
          margin-bottom: 40px;
        }
        .updates-all { padding-bottom: 6px; color: var(--primary-green); }

        .updates-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .updates-reveal { height: 100%; }

        .update-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--bg-white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          overflow: hidden;
          text-decoration: none;
          transition: transform .4s var(--ease-out-expo), box-shadow .4s, border-color .3s;
        }
        .update-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: rgba(15,122,68,.35);
        }

        .update-media {
          position: relative;
          height: 150px;
          flex-shrink: 0;
          overflow: hidden;
          background: var(--bg-light);
        }
        .update-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .8s var(--ease-out-expo), filter .5s;
        }
        .update-card:hover .update-media img { transform: scale(1.07); }

        .update-media::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(6,28,58,0) 55%, rgba(6,28,58,.28) 100%);
          opacity: 0;
          transition: opacity .4s;
        }
        .update-card:hover .update-media::after { opacity: 1; }

        .update-media-fallback {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background:
            radial-gradient(340px 200px at 85% 0%, rgba(10,77,163,.25), transparent 65%),
            radial-gradient(340px 220px at 10% 100%, rgba(15,122,68,.32), transparent 65%),
            linear-gradient(135deg, var(--bg-dark) 0%, #0c2c52 100%);
        }
        .update-fallback-glyph { color: rgba(255,255,255,.28); }
        .update-fallback-brand {
          font-family: var(--font-display), sans-serif;
          font-size: .72rem;
          letter-spacing: .3em;
          text-transform: uppercase;
          color: rgba(255,255,255,.55);
        }

        .update-cat {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          font-size: .7rem;
          font-weight: 600;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: #fff;
          background: var(--grad-brand);
          border-radius: var(--radius-pill);
          padding: 6px 14px;
          box-shadow: 0 6px 18px rgba(6,28,58,.28);
        }

        .update-body {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
          padding: 16px 18px 18px;
        }
        .update-date {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: .74rem;
          font-weight: 600;
          letter-spacing: .04em;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .update-date svg { color: var(--primary-green); }
        .update-body h3 {
          font-size: 1rem;
          font-weight: 500;
          line-height: 1.45;
          color: var(--text-dark);
          margin: 0;
          padding-right: 6px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color .2s;
        }
        .update-card:hover .update-body h3 { color: var(--primary-green); }
        .update-arrow {
          position: absolute;
          right: 16px;
          bottom: 16px;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-dark);
          background: var(--bg-white);
          transition: background .25s, color .25s, border-color .25s, transform .3s var(--ease-out-back);
        }
        .update-card:hover .update-arrow {
          background: var(--primary-green);
          border-color: var(--primary-green);
          color: #fff;
          transform: rotate(45deg);
        }

        @media (max-width: 960px) {
          .updates-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 700px) {
          .updates { padding: 48px 0 56px; }
          .updates-head { flex-direction: column; align-items: flex-start; }
          .updates-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}