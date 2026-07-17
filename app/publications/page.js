import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FileText, Download, Calendar, ArrowUpRight } from 'lucide-react';

const publications = [
  {
    title: 'Annual Report 2024/25',
    date: 'October 2025',
    description: 'Comprehensive annual report detailing financial performance, project updates, and corporate governance for the fiscal year 2024/25.',
    type: 'Annual Report',
    size: '5.2 MB',
  },
  {
    title: 'Quarterly Progress Report - Q2 2025/26',
    date: 'January 2026',
    description: 'Quarterly update on project milestones, power generation statistics, and financial highlights for the second quarter.',
    type: 'Quarterly Report',
    size: '1.8 MB',
  },
  {
    title: 'Environmental Impact Assessment: Myagdi Khola Project',
    date: 'March 2025',
    description: 'Detailed environmental impact assessment report for the 57.3 MW Myagdi Khola Hydropower Project, including mitigation measures.',
    type: 'EIA Report',
    size: '12.4 MB',
  },
  {
    title: 'Social Impact Assessment: Kunaban Khola Project',
    date: 'January 2025',
    description: 'Social impact assessment examining the effects of the Kunaban Khola project on local communities and proposed benefit-sharing mechanisms.',
    type: 'SIA Report',
    size: '8.6 MB',
  },
  {
    title: 'Corporate Social Responsibility Report 2024',
    date: 'April 2025',
    description: 'Overview of CSR initiatives undertaken by Sushmit Energy including education, healthcare, and infrastructure development programs.',
    type: 'CSR Report',
    size: '3.1 MB',
  },
  {
    title: 'Technical Feasibility Study: Myagdi Khola-B Extension',
    date: 'November 2024',
    description: 'Technical feasibility study examining the extension potential of the Myagdi Khola-B project with updated resource assessment.',
    type: 'Technical Report',
    size: '9.7 MB',
  },
];

export default function PublicationsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <h1>Publications</h1>
            <p>Reports, studies, and official documents from Sushmit Energy</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="publications-list">
              {publications.map((pub, i) => (
                <div key={i} className="publication-card">
                  <div className="pub-icon">
                    <FileText size={28} />
                  </div>
                  <div className="pub-info">
                    <div className="pub-type">{pub.type}</div>
                    <h2 className="pub-title">{pub.title}</h2>
                    <p className="pub-description">{pub.description}</p>
                    <div className="pub-meta">
                      <span className="pub-date">
                        <Calendar size={14} />
                        {pub.date}
                      </span>
                      <span className="pub-size">{pub.size}</span>
                    </div>
                  </div>
                  <a href="#" className="pub-download">
                    <Download size={20} />
                  </a>
                </div>
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
        .publications-list {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .publication-card {
          display: flex;
          align-items: flex-start;
          gap: 24px;
          background: var(--bg-white);
          border-radius: var(--radius-md);
          padding: 28px;
          border: 1px solid var(--border-color);
          transition: box-shadow 0.3s;
        }
        .publication-card:hover {
          box-shadow: var(--shadow-md);
        }
        .pub-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          background: #fff3e0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #f57c00;
          flex-shrink: 0;
        }
        .pub-info {
          flex: 1;
        }
        .pub-type {
          display: inline-block;
          background: var(--bg-light);
          padding: 3px 10px;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
        }
        .pub-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .pub-description {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 12px;
        }
        .pub-meta {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .pub-date {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .pub-size {
          font-size: 0.82rem;
          color: var(--text-light);
        }
        .pub-download {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--primary-blue);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.3s, transform 0.3s;
          margin-top: 8px;
        }
        .pub-download:hover {
          background: var(--primary-blue-dark);
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .page-banner h1 {
            font-size: 1.8rem;
          }
          .publication-card {
            flex-direction: column;
          }
          .pub-download {
            align-self: flex-end;
          }
        }
      `}</style>
    </>
  );
}
