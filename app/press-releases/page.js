import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Calendar, ArrowUpRight } from 'lucide-react';

const releases = [
  {
    title: 'Sushmit Energy Announces Successful Commissioning of Myagdi Khola-B Project',
    date: 'March 15, 2026',
    summary: 'Sushmit Energy Pvt. Ltd. is pleased to announce the successful commissioning of its 12.5 MW Myagdi Khola-B Hydropower Project, marking a significant milestone in the company\'s expansion of clean energy generation in Nepal.',
    category: 'Press Release',
  },
  {
    title: 'Sushmit Energy Reports Strong Financial Performance for Fiscal Year 2024/25',
    date: 'January 28, 2026',
    summary: 'The Board of Directors of Sushmit Energy Pvt. Ltd. has announced impressive financial results for the fiscal year 2024/25, with revenue growth driven by increased power generation across all operational projects.',
    category: 'Financial',
  },
  {
    title: 'Sushmit Energy Partners with International Investors for New Hydro Projects',
    date: 'November 10, 2025',
    summary: 'Sushmit Energy has entered into a strategic partnership agreement with international investors to develop new hydropower projects with a combined capacity of 50 MW in the Karnali Province.',
    category: 'Press Release',
  },
  {
    title: 'Sushmit Energy Wins "Best Hydropower Developer" Award at Nepal Energy Summit 2025',
    date: 'September 5, 2025',
    summary: 'Sushmit Energy was honored with the "Best Hydropower Developer" award at the Nepal Energy Summit 2025, recognizing the company\'s outstanding contributions to Nepal\'s renewable energy sector.',
    category: 'Award',
  },
  {
    title: 'Community Development Initiatives Launched in Myagdi Project Areas',
    date: 'July 22, 2025',
    summary: 'As part of its corporate social responsibility program, Sushmit Energy has launched comprehensive community development initiatives in the Myagdi district, focusing on education, healthcare, and infrastructure.',
    category: 'CSR',
  },
  {
    title: 'Sushmit Energy Achieves ISO Certification for Environmental Management',
    date: 'May 18, 2025',
    summary: 'Sushmit Energy has successfully achieved ISO 14001:2015 certification for its environmental management systems, demonstrating the company\'s commitment to sustainable hydropower development.',
    category: 'Press Release',
  },
];

export default function PressReleasesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <h1>Press Releases</h1>
            <p>Latest news and announcements from Sushmit Energy</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="releases-list">
              {releases.map((item, i) => (
                <article key={i} className="release-card">
                  <div className="release-header">
                    <span className="release-category">{item.category}</span>
                    <span className="release-date">
                      <Calendar size={14} />
                      {item.date}
                    </span>
                  </div>
                  <h2 className="release-title">{item.title}</h2>
                  <p className="release-summary">{item.summary}</p>
                  <a href="#" className="release-read-more">
                    Read More <ArrowUpRight size={16} />
                  </a>
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
        .releases-list {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .release-card {
          background: var(--bg-white);
          border-radius: var(--radius-md);
          padding: 32px;
          border: 1px solid var(--border-color);
          transition: box-shadow 0.3s, transform 0.3s;
        }
        .release-card:hover {
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
          .page-banner h1 {
            font-size: 1.8rem;
          }
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
