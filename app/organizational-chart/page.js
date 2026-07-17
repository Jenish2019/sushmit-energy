import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function OrgChartPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <h1>Organizational Structure</h1>
            <p>Our organizational framework</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="org-chart-wrapper">
              <img
                src="https://web.archive.org/web/20250714064752im_/https://www.sushmitenergy.com/wp-content/uploads/2017/01/organization-chart.png"
                alt="Sushmit Energy Organizational Chart"
                className="org-chart-img"
              />
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
        .org-chart-wrapper {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          padding: 40px;
          border: 1px solid var(--border-color);
        }
        .org-chart-img {
          width: 100%;
          height: auto;
          display: block;
        }
        @media (max-width: 768px) {
          .page-banner h1 { font-size: 1.8rem; }
          .org-chart-wrapper { padding: 20px; }
        }
      `}</style>
    </>
  );
}
