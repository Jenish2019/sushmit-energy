import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FileText, Download } from 'lucide-react';

export default function PolicyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <h1>Policy</h1>
            <p>Energy policies and regulatory framework</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="policy-card">
              <FileText size={40} className="policy-icon" />
              <h2>Energy Profile and Policy of Nepal</h2>
              <p>
                Comprehensive document covering Nepal&apos;s energy sector profile, policies, and
                regulatory framework for hydropower development and investment.
              </p>
              <a
                href="https://web.archive.org/web/20260121104039/https://www.sushmitenergy.com/wp-content/uploads/2017/12/Energy-Sector.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <Download size={18} /> Download PDF
              </a>
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
        .policy-card {
          max-width: 600px;
          margin: 0 auto;
          text-align: center;
          padding: 60px 40px;
          background: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
        }
        .policy-icon {
          color: var(--primary-blue);
          margin-bottom: 20px;
        }
        .policy-card h2 {
          font-size: 1.5rem;
          margin-bottom: 16px;
        }
        .policy-card p {
          color: var(--text-muted);
          margin-bottom: 28px;
          line-height: 1.6;
        }
        @media (max-width: 768px) {
          .page-banner h1 { font-size: 1.8rem; }
          .policy-card { padding: 40px 24px; }
        }
      `}</style>
    </>
  );
}
