import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Calendar, ArrowUpRight } from 'lucide-react';

const newsItems = [
  {
    title: 'Sushmit Energy Completes 57.3 MW Myagdi Khola Project Feasibility Studies',
    date: 'February 20, 2026',
    summary: 'Detailed feasibility studies for the flagship 57.3 MW Myagdi Khola Hydropower Project have been successfully completed, confirming the project\'s technical and financial viability.',
    source: 'The Himalayan Times',
  },
  {
    title: 'Sushmit Energy to Invest NPR 2 Billion in Renewable Energy Expansion',
    date: 'December 12, 2025',
    summary: 'Sushmit Energy has announced plans to invest NPR 2 billion over the next three years to expand its renewable energy portfolio, including new hydro and solar projects across Nepal.',
    source: 'Kathmandu Post',
  },
  {
    title: 'Sushmit Energy Creates 500+ Jobs Through Hydropower Development',
    date: 'October 8, 2025',
    summary: 'Through its ongoing hydropower projects in Myagdi and other districts, Sushmit Energy has created over 500 direct and indirect employment opportunities for local communities.',
    source: 'Nepal Energy News',
  },
  {
    title: 'Nepal\'s Hydropower Sector Attracts Foreign Investment Through Companies Like Sushmit Energy',
    date: 'August 15, 2025',
    summary: 'Nepal\'s hydropower sector is seeing increased foreign direct investment, with companies like Sushmit Energy leading the way in sustainable project development and international partnerships.',
    source: 'The Rising Nepal',
  },
  {
    title: 'Sushmit Energy Contributes to National Grid Stability with Consistent Power Supply',
    date: 'June 3, 2025',
    summary: 'Sushmit Energy\'s operational projects have been consistently contributing to Nepal\'s national grid, helping to reduce load-shedding hours during the dry season.',
    source: 'Republica',
  },
];

export default function SushmitNewsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <h1>Sushmit Energy in the News</h1>
            <p>Media coverage and news articles featuring Sushmit Energy</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="news-list">
              {newsItems.map((item, i) => (
                <article key={i} className="news-card">
                  <div className="news-content">
                    <div className="news-meta">
                      <span className="news-date">
                        <Calendar size={14} />
                        {item.date}
                      </span>
                      <span className="news-source">{item.source}</span>
                    </div>
                    <h2 className="news-title">{item.title}</h2>
                    <p className="news-summary">{item.summary}</p>
                    <a href="#" className="news-read-more">
                      Read Full Article <ArrowUpRight size={16} />
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
        .page-banner {
          position: relative;
          padding: 100px 0;
          background: linear-gradient(135deg, var(--primary-blue-dark), var(--primary-blue));
          text-align: center;
          color: white;
        }
        .page-banner-overlay {
          position: absolute;
          inset: 0;
          background: url('https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/themes/sushmitenergy/images/kulekhani.jpg') center/cover no-repeat;
          opacity: 0.1;
        }
        .page-banner .container {
          position: relative;
          z-index: 1;
        }
        .page-banner h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 12px;
        }
        .page-banner p {
          font-size: 1.1rem;
          opacity: 0.85;
        }
        .news-list {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .news-card {
          background: var(--bg-white);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
          overflow: hidden;
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .news-card:hover {
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
          .page-banner h1 {
            font-size: 1.8rem;
          }
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
