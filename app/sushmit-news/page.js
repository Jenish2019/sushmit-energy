import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { CalendarBlank, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { getNews } from '../../lib/data';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function SushmitNewsPage() {
  const newsItems = await getNews('News');
  return (
    <>
      <Header />
      <main>
        <PageHero title="Sushmit Energy in the News" subtitle="Media coverage and news articles featuring Sushmit Energy" />

        <section className="section-padding">
          <div className="container">
            <div className="news-list">
              {newsItems.map((item, i) => (
                <Link key={i} href={`/media/${item.slug}`} className="news-card-link">
                <article className="news-card">
                  <div className="news-content">
                    <div className="news-meta">
                      <span className="news-date">
                        <CalendarBlank size={14} />
                        {item.date}
                      </span>
                      <span className="news-source">{item.source || item.category}</span>
                    </div>
                    <h2 className="news-title">{item.title}</h2>
                    <p className="news-summary">{item.summary}</p>
                    <span className="news-read-more">
                      Read Full Article <ArrowUpRight size={16} />
                    </span>
                  </div>
                </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .news-list {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .news-card-link { text-decoration: none; color: inherit; display: block; }
        .news-card {
          background: var(--bg-white);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          overflow: hidden;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .news-card-link:hover .news-card {
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .news-content {
          padding: 32px;
        }
        .news-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .news-date {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .news-source {
          background: var(--bg-light);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--primary-blue);
        }
        .news-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 10px;
          line-height: 1.4;
        }
        .news-summary {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .news-read-more {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--primary-blue);
          font-weight: 600;
          font-size: 0.9rem;
          transition: gap 0.3s;
        }
        .news-read-more:hover {
          gap: 10px;
        }
        @media (max-width: 768px) {
          .news-content {
            padding: 24px;
          }
          .news-title {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </>
  );
}
