import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Calendar, ArrowUpRight, TrendingUp, BarChart3, Lightbulb } from 'lucide-react';

const articles = [
  {
    title: 'Nepal\'s Hydropower Potential: Current Status and Future Prospects',
    date: 'March 10, 2026',
    summary: 'Nepal has an estimated hydropower potential of 83,000 MW, of which only about 3% has been developed. This article explores the current state of the sector and the immense opportunities ahead.',
    category: 'Industry Analysis',
  },
  {
    title: 'Government Announces New Policy to Boost Renewable Energy Investment',
    date: 'February 5, 2026',
    summary: 'The Government of Nepal has unveiled a new renewable energy policy offering tax incentives and streamlined approval processes to attract both domestic and foreign investment in the energy sector.',
    category: 'Policy Update',
  },
  {
    title: 'Regional Power Trade: Nepal\'s Role in South Asian Energy Security',
    date: 'January 18, 2026',
    summary: 'With cross-border electricity trade agreements in place, Nepal is positioning itself as a key energy exporter in South Asia, with potential to supply power to India, Bangladesh, and beyond.',
    category: 'Regional News',
  },
  {
    title: 'Climate Resilience in Hydropower: Adapting to Changing Weather Patterns',
    date: 'December 22, 2025',
    summary: 'As climate change affects glacial melt and rainfall patterns, Nepali hydropower developers are adopting new technologies and strategies to ensure long-term project viability.',
    category: 'Technology',
  },
  {
    title: 'Nepal Electricity Authority Reports Surplus Power Generation',
    date: 'November 8, 2025',
    summary: 'For the first time in its history, Nepal has achieved surplus electricity generation during the wet season, marking a major milestone in the country\'s energy journey.',
    category: 'Market Update',
  },
  {
    title: 'Hydropower and Sustainable Development: Balancing Energy and Environment',
    date: 'September 30, 2025',
    summary: 'Experts discuss how run-of-river hydropower projects can coexist with environmental conservation, highlighting best practices from successful projects across Nepal.',
    category: 'Sustainability',
  },
];

export default function EnergyNewsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <h1>Energy News</h1>
            <p>Industry insights, trends, and developments in the energy sector</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="news-grid">
              {articles.map((item, i) => (
                <article key={i} className="article-card">
                  <div className="article-icon">
                    {i % 3 === 0 ? <TrendingUp size={24} /> : i % 3 === 1 ? <BarChart3 size={24} /> : <Lightbulb size={24} />}
                  </div>
                  <span className="article-category">{item.category}</span>
                  <h2 className="article-title">{item.title}</h2>
                  <p className="article-summary">{item.summary}</p>
                  <div className="article-footer">
                    <span className="article-date">
                      <Calendar size={14} />
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
          .page-banner h1 {
            font-size: 1.8rem;
          }
          .news-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
