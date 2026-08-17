import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import { ArrowUpRight, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { getAllArticles } from '../../lib/data';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
  const posts = await getAllArticles();
  const [featured, ...rest] = posts;

  return (
    <>
      <Header />
      <main>
        <PageHero title="News" subtitle="Insights, stories, and updates from Sushmit Energy" />

        <section className="news-section">
          <div className="container">
            {featured && (
              <Reveal>
                <Link href={`/media/${featured.slug}`} className="news-featured">
                  <div className="news-featured-media">
                    {featured.image
                      ? <img src={featured.image} alt={featured.title} />
                      : <span className="news-featured-ph" />}
                  </div>
                  <div className="news-featured-body">
                    <div className="news-featured-meta">
                      <span className="tag tag-green">Featured</span>
                      <span className="news-date">{featured.date}</span>
                    </div>
                    <h2>{featured.title}</h2>
                    <p>{featured.summary}</p>
                    <span className="link-more">Read article <ArrowRight size={15} weight="bold" /></span>
                  </div>
                </Link>
              </Reveal>
            )}

            <div className="news-list">
              {rest.map((post, i) => (
                <Reveal key={i} delay={i * 60}>
                  <Link href={`/media/${post.slug}`} className="news-row">
                    <span className="news-row-cat tag tag-blue">{post.category}</span>
                    <span className="news-row-date">{post.date}</span>
                    <span className="news-row-title">{post.title}</span>
                    <span className="news-row-arrow" aria-hidden="true">
                      <ArrowUpRight size={20} weight="bold" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .news-section { padding: 100px 0 120px; background: var(--bg-white); }

        .news-featured {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 56px;
          align-items: center;
          text-decoration: none;
          margin-bottom: 90px;
        }
        .news-featured-media {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: var(--bg-light);
        }
        .news-featured-media img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
          transition: transform .8s var(--ease-out-expo);
        }
        .news-featured:hover .news-featured-media img { transform: scale(1.04); }
        .news-featured-ph {
          display: block;
          width: 100%; height: 100%;
          background: linear-gradient(135deg, var(--primary-blue), var(--primary-green));
          opacity: .85;
        }
        .news-featured-body .news-featured-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 20px;
        }
        .news-date { font-size: .84rem; color: var(--text-muted); letter-spacing: .03em; }
        .news-featured-body h2 {
          font-size: clamp(1.6rem, 2.8vw, 2.3rem);
          font-weight: 500;
          line-height: 1.25;
          margin-bottom: 18px;
          transition: color .2s;
        }
        .news-featured:hover .news-featured-body h2 { color: var(--primary-blue); }
        .news-featured-body p {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.75;
          margin-bottom: 26px;
        }

        .news-list { border-top: 1px solid var(--border-color); }
        .news-row {
          display: grid;
          grid-template-columns: 150px 170px 1fr auto;
          align-items: center;
          gap: 24px;
          padding: 30px 10px;
          border-bottom: 1px solid var(--border-color);
          text-decoration: none;
          transition: background .25s, padding-left .3s var(--ease-out-expo);
        }
        .news-row:hover { background: var(--bg-light); padding-left: 22px; }
        .news-row-cat { justify-self: start; }
        .news-row-date {
          font-family: var(--font-display), sans-serif;
          font-size: .86rem;
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: .04em;
        }
        .news-row-title {
          font-family: var(--font-display), sans-serif;
          font-size: 1.12rem;
          font-weight: 500;
          color: var(--text-dark);
          line-height: 1.4;
          transition: color .2s;
        }
        .news-row:hover .news-row-title { color: var(--primary-blue); }
        .news-row-arrow {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-dark);
          transition: background .25s, color .25s, transform .25s var(--ease-out-back);
        }
        .news-row:hover .news-row-arrow { background: var(--text-dark); color: #fff; transform: rotate(45deg); }

        @media (max-width: 900px) {
          .news-featured { grid-template-columns: 1fr; gap: 32px; }
          .news-row { grid-template-columns: 1fr auto; gap: 14px; }
          .news-row-cat, .news-row-date { display: none; }
        }
        @media (max-width: 560px) {
          .news-section { padding: 64px 0 80px; }
          .news-featured { margin-bottom: 56px; }
        }
      `}</style>
    </>
  );
}
