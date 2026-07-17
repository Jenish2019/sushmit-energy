import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FileText, Download, Calendar } from 'lucide-react';

const annualReports = [
  { year: '2024/25', date: 'October 2025', size: '4.8 MB' },
  { year: '2023/24', date: 'October 2024', size: '4.5 MB' },
  { year: '2022/23', date: 'October 2023', size: '4.2 MB' },
];

const quarterlyReports = [
  { quarter: 'Q3 2025/26', period: 'Jan–Mar 2026', size: '1.2 MB' },
  { quarter: 'Q2 2025/26', period: 'Oct–Dec 2025', size: '1.1 MB' },
  { quarter: 'Q1 2025/26', period: 'Jul–Sep 2025', size: '1.3 MB' },
];

export default function ReportsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <h1>Reports</h1>
            <p>Annual and quarterly reports for investors and stakeholders</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="reports-grid">
              <div className="report-section-card">
                <h2><FileText size={24} /> Annual Reports</h2>
                <div className="report-items">
                  {annualReports.map((r, i) => (
                    <div key={i} className="report-item">
                      <div className="report-item-info">
                        <span className="report-name">Annual Report {r.year}</span>
                        <span className="report-meta">
                          <Calendar size={12} /> {r.date} &middot; {r.size}
                        </span>
                      </div>
                      <a href="#" className="report-download-btn" title="Download">
                        <Download size={18} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="report-section-card">
                <h2><FileText size={24} /> Quarterly Reports</h2>
                <div className="report-items">
                  {quarterlyReports.map((r, i) => (
                    <div key={i} className="report-item">
                      <div className="report-item-info">
                        <span className="report-name">{r.quarter}</span>
                        <span className="report-meta">{r.period} &middot; {r.size}</span>
                      </div>
                      <a href="#" className="report-download-btn" title="Download">
                        <Download size={18} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
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
        .page-banner .container { position: relative; z-index: 1; }
        .page-banner h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 12px; }
        .page-banner p { font-size: 1.1rem; opacity: 0.85; }
        .reports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
          gap: 30px;
          max-width: 960px;
          margin: 0 auto;
        }
        .report-section-card {
          padding: 32px;
          background: white;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
        }
        .report-section-card h2 {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.3rem;
          margin-bottom: 24px;
          color: var(--primary-blue);
          padding-bottom: 16px;
          border-bottom: 2px solid var(--bg-light);
        }
        .report-items {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .report-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid var(--border-color);
        }
        .report-item:last-child {
          border-bottom: none;
        }
        .report-item-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .report-name {
          font-weight: 600;
          font-size: 0.95rem;
        }
        .report-meta {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .report-download-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-light);
          color: var(--primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s, color 0.3s;
          flex-shrink: 0;
        }
        .report-download-btn:hover {
          background: var(--primary-blue);
          color: white;
        }
        @media (max-width: 768px) {
          .reports-grid { grid-template-columns: 1fr; }
          .page-banner h1 { font-size: 1.8rem; }
        }
      `}</style>
    </>
  );
}
