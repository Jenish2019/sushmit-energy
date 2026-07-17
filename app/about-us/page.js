import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Target, Eye, CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <h1>About Sushmit Energy</h1>
            <p>Leading hydropower development company in Nepal</p>
          </div>
        </section>

        <section className="about-content section-padding">
          <div className="container">
            <div className="about-text">
              <p>
                <strong>Sushmit Energy Pvt. Ltd</strong> is a leading hydropower project
                development company established with the aim of expanding hydro energy investment
                in the Nepali market. We specialize in the development and management of hydro
                projects with the aim of cost-effective investment and high level of profit to the
                investors and the nation as well. We are continuously working for leading the
                hydro energy sectors and qualified us in investment engineering. We value the
                time, money and energy of our partners and guarantee the highest return possible.
              </p>
              <p>
                Sushmit Energy is currently working on four hydropower projects aimed at
                generating 93+ MW of electricity upon its completion. Backed by energy, financial
                and hydro experts, we can handle any size of project and accomplish the desired
                results.
              </p>
            </div>

            <div className="about-cards">
              <div className="about-card">
                <div className="about-card-icon" style={{ background: '#e8f5e9' }}>
                  <Eye size={32} style={{ color: 'var(--primary-green)' }} />
                </div>
                <h3>Vision</h3>
                <p>
                  We envision developing alternative and eco-friendly sources of energy by
                  promoting people&apos;s participation, investment and advanced technology where
                  the value of shareholders are maximized and better wealth is created.
                </p>
              </div>
              <div className="about-card">
                <div className="about-card-icon" style={{ background: '#e3f2fd' }}>
                  <Target size={32} style={{ color: 'var(--primary-blue)' }} />
                </div>
                <h3>Mission</h3>
                <p>
                  We will create an atmosphere of investment for the people and ensure value of
                  their profit increment by suggesting the best hydro product for investment,
                  managing the company professionally, selecting the best products, and involving
                  partnership in the sphere of energy investment.
                </p>
              </div>
              <div className="about-card">
                <div className="about-card-icon" style={{ background: '#fff3e0' }}>
                  <CheckCircle size={32} style={{ color: '#f57c00' }} />
                </div>
                <h3>Overall Objectives</h3>
                <p>
                  To be the hydropower production and investment experts which will ultimately
                  provide our stakeholders a high value of shares and dignity to be associated
                  with.
                </p>
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
        .about-text {
          max-width: 800px;
          margin: 0 auto 60px;
        }
        .about-text p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--text-muted);
          margin-bottom: 20px;
        }
        .about-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .about-card {
          background: var(--bg-white);
          border-radius: var(--radius-md);
          padding: 40px 30px;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .about-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .about-card-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }
        .about-card h3 {
          font-size: 1.3rem;
          margin-bottom: 12px;
          color: var(--text-dark);
        }
        .about-card p {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-muted);
        }
        @media (max-width: 768px) {
          .about-cards {
            grid-template-columns: 1fr;
          }
          .page-banner h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </>
  );
}
