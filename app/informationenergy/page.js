import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { CalendarBlank, ArrowUpRight, TrendUp, ChartBar, Lightbulb } from '@phosphor-icons/react/dist/ssr';
import { getNews } from '../../lib/data';

export const dynamic = 'force-dynamic';

export default async function EnergyNewsPage() {
  const articles = await getNews('Energy');
  return (
    <>
      <Header />
      <main>
        <PageHero title="Energy News" subtitle="Industry insights, trends, and developments in the energy sector" />

        <section className="section-padding">
          <div className="container">
            <div className="news-grid">
              {articles.map((item, i) => (
                <article key={i} className="article-card">
                  <div className="article-icon">
                    {i % 3 === 0 ? <TrendUp size={24} /> : i % 3 === 1 ? <ChartBar size={24} /> : <Lightbulb size={24} />}
                  </div>
                  <span className="article-category">{item.category}</span>
                  <h2 className="article-title">{item.title}</h2>
                  <p className="article-summary">{item.summary}</p>
                  <div className="article-footer">
                    <span className="article-date">
                      <CalendarBlank size={14} />
                      {item.date}
                    </span>
                    <a href="#" className="article-read-more">
                      Read <ArrowUpRight size={14} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 28px;
        }
        .article-card {
          background: var(--bg-white);
          border-radius: var(--radius-md);
          padding: 28px;
          border: 1px solid var(--border-color);
          transition: box-shadow 0.3s, transform 0.3s;
          display: flex;
          flex-direction: column;
        }
        .article-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-3px);
        }
        .article-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--bg-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-blue);
          margin-bottom: 16px;
        }
        .article-category {
          display: inline-block;
          background: #e8f5e9;
          color: var(--primary-green);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 14px;
          align-self: flex-start;
        }
        .article-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 10px;
          line-height: 1.4;
        }
        .article-summary {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 20px;
          flex: 1;
        }
        .article-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid var(--border-color);
        }
        .article-date {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: var(--text-light);
        }
        .article-read-more {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--primary-blue);
          font-weight: 600;
          font-size: 0.85rem;
          transition: gap 0.3s;
        }
        .article-read-more:hover {
          gap: 8px;
        }
        @media (max-width: 768px) {
          .news-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
