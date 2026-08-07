import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { CalendarBlank, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { getNews } from '../../lib/data';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function PressReleasesPage() {
  const releases = await getNews('Press Release');
  return (
    <>
      <Header />
      <main>
        <PageHero title="Press Releases" subtitle="Latest news and announcements from Sushmit Energy" />

        <section className="section-padding">
          <div className="container">
            <div className="releases-list">
              {releases.map((item, i) => (
                <Link key={i} href={`/media/${item.slug}`} className="release-card-link">
                <article className="release-card">
                  <div className="release-header">
                    <span className="release-category">{item.category}</span>
                    <span className="release-date">
                      <CalendarBlank size={14} />
                      {item.date}
                    </span>
                  </div>
                  <h2 className="release-title">{item.title}</h2>
                  <p className="release-summary">{item.summary}</p>
                  <span className="release-read-more">
                    Read More <ArrowUpRight size={16} />
                  </span>
                </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .releases-list {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .release-card-link { text-decoration: none; color: inherit; display: block; }
        .release-card {
          background: var(--bg-white);
          border-radius: var(--radius-md);
          padding: 32px;
          border: 1px solid var(--border-color);
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .release-card-link:hover .release-card {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .release-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .release-category {
          background: var(--primary-blue);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .release-date {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .release-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 10px;
          line-height: 1.4;
        }
        .release-summary {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .release-read-more {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--primary-blue);
          font-weight: 600;
          font-size: 0.9rem;
          transition: gap 0.3s;
        }
        .release-read-more:hover {
          gap: 10px;
        }
        @media (max-width: 768px) {
          .release-card {
            padding: 24px;
          }
          .release-title {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  );
}
