import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FileText, ArrowUpRight } from 'lucide-react';

export default function ReportsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <h1>Reports</h1>
            <p>Annual and quarterly reports</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="reports-grid">
              <div className="report-section-card">
                <h2><FileText size={24} /> Annual Reports</h2>
                <p className="report-placeholder">Reports will be available here soon.</p>
              </div>
              <div className="report-section-card">
                <h2><FileText size={24} /> Quarterly Reports</h2>
                <p className="report-placeholder">Reports will be available here soon.</p>
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
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 30px;
          max-width: 900px;
          margin: 0 auto;
        }
        .report-section-card {
          padding: 40px;
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
          margin-bottom: 20px;
          color: var(--primary-blue);
        }
        .report-placeholder {
          color: var(--text-light);
          font-style: italic;
          margin: 0;
        }
        @media (max-width: 768px) {
          .reports-grid { grid-template-columns: 1fr; }
          .page-banner h1 { font-size: 1.8rem; }
        }
      `}</style>
    </>
  );
}
