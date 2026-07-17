import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Zap, MapPin, BarChart3, Clock, CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function MyagdiKholaPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <Link href="/projects/" className="back-link">
              <ArrowLeft size={16} /> Back to Projects
            </Link>
            <h1>Myagdi Khola Hydropower Project</h1>
            <p>57.3 MW run-of-river hydropower project in Myagdi District</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="project-hero">
              <div className="project-hero-image">
                <img src="https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/slider1-1024x576.jpg" alt="Myagdi Khola Hydropower Project" />
              </div>
              <div className="project-hero-stats">
                <div className="stat-card">
                  <Zap size={28} />
                  <span className="stat-value">57.3 MW</span>
                  <span className="stat-label">Capacity</span>
                </div>
                <div className="stat-card">
                  <MapPin size={28} />
                  <span className="stat-value">Myagdi</span>
                  <span className="stat-label">District</span>
                </div>
                <div className="stat-card">
                  <BarChart3 size={28} />
                  <span className="stat-value">Ongoing</span>
                  <span className="stat-label">Status</span>
                </div>
                <div className="stat-card">
                  <Clock size={28} />
                  <span className="stat-value">2024</span>
                  <span className="stat-label">Start Date</span>
                </div>
              </div>
            </div>

            <div className="project-content">
              <div className="project-description-section">
                <h2>Project Overview</h2>
                <p>
                  The Myagdi Khola Hydropower Project is Sushmit Energy&apos;s flagship venture, representing a significant
                  investment in Nepal&apos;s renewable energy infrastructure. This 57.3 MW run-of-river hydropower project is
                  located in the Myagdi District of Gandaki Province, harnessing the flow of the Myagdi Khola river.
                </p>
                <p>
                  The project is designed to generate clean, sustainable electricity that will contribute to Nepal&apos;s
                  national grid, helping to meet the country&apos;s growing energy demands while reducing reliance on
                  fossil fuel-based power generation.
                </p>

                <h3>Key Features</h3>
                <ul className="feature-list">
                  <li><CheckCircle size={18} /> Run-of-river design minimizing environmental impact</li>
                  <li><CheckCircle size={18} /> Annual energy generation of approximately 300 GWh</li>
                  <li><CheckCircle size={18} /> State-of-the-art turbine and generator technology</li>
                  <li><CheckCircle size={18} /> Comprehensive fish passage and environmental mitigation measures</li>
                  <li><CheckCircle size={18} /> Community development programs in surrounding areas</li>
                </ul>

                <h3>Technical Specifications</h3>
                <div className="specs-table">
                  <div className="spec-row"><span>Installed Capacity</span><span>57.3 MW</span></div>
                  <div className="spec-row"><span>Type</span><span>Run-of-River</span></div>
                  <div className="spec-row"><span>Location</span><span>Myagdi District, Gandaki Province</span></div>
                  <div className="spec-row"><span>River</span><span>Myagdi Khola</span></div>
                  <div className="spec-row"><span>Annual Energy</span><span>~300 GWh</span></div>
                  <div className="spec-row"><span>Status</span><span>Under Development</span></div>
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
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.8);
          font-size: 0.9rem;
          margin-bottom: 20px;
        }
        .back-link:hover { color: white; }
        .page-banner h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 12px; }
        .page-banner p { font-size: 1.1rem; opacity: 0.85; }
        .project-hero { margin-bottom: 50px; }
        .project-hero-image {
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-bottom: 30px;
          max-height: 500px;
        }
        .project-hero-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .project-hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        .stat-card {
          background: var(--bg-white);
          border-radius: var(--radius-md);
          padding: 28px;
          text-align: center;
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-sm);
        }
        .stat-card svg { color: var(--primary-blue); margin-bottom: 12px; }
        .stat-value { display: block; font-size: 1.3rem; font-weight: 700; margin-bottom: 4px; }
        .stat-label { font-size: 0.85rem; color: var(--text-muted); }
        .project-content { max-width: 900px; margin: 0 auto; }
        .project-description-section h2 { font-size: 1.8rem; margin-bottom: 20px; }
        .project-description-section h3 { font-size: 1.3rem; margin: 30px 0 16px; }
        .project-description-section p {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.8;
          margin-bottom: 16px;
        }
        .feature-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .feature-list li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.95rem;
          color: var(--text-muted);
        }
        .feature-list li svg { color: var(--primary-green); flex-shrink: 0; }
        .specs-table {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .spec-row {
          display: flex;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.95rem;
        }
        .spec-row:last-child { border-bottom: none; }
        .spec-row span:first-child { font-weight: 600; color: var(--text-dark); }
        .spec-row span:last-child { color: var(--text-muted); }
        @media (max-width: 768px) {
          .page-banner h1 { font-size: 1.8rem; }
          .project-hero-stats { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </>
  );
}
