import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Download, Image, FileText, Video, FileArchive } from 'lucide-react';

const resources = [
  {
    title: 'Sushmit Energy Company Profile',
    description: 'Complete company overview including project portfolio, management team, and financial highlights.',
    format: 'PDF',
    size: '2.4 MB',
    icon: <FileText size={24} />,
  },
  {
    title: 'Logo Pack (PNG + SVG)',
    description: 'Official Sushmit Energy logo in various formats and resolutions for print and digital use.',
    format: 'ZIP',
    size: '1.8 MB',
    icon: <Image size={24} />,
  },
  {
    title: 'Project Photo Gallery (High Resolution)',
    description: 'High-resolution photos of our hydropower projects, suitable for publications and presentations.',
    format: 'ZIP',
    size: '15.6 MB',
    icon: <Image size={24} />,
  },
  {
    title: 'Corporate Brochure',
    description: 'Printed-quality brochure detailing our mission, vision, projects, and investment opportunities.',
    format: 'PDF',
    size: '4.2 MB',
    icon: <FileText size={24} />,
  },
  {
    title: 'Brand Guidelines',
    description: 'Official brand usage guidelines including color palette, typography, and logo usage rules.',
    format: 'PDF',
    size: '1.1 MB',
    icon: <FileArchive size={24} />,
  },
  {
    title: 'Company Overview Video',
    description: 'A short promotional video showcasing Sushmit Energy\'s projects and commitment to clean energy.',
    format: 'MP4',
    size: '48 MB',
    icon: <Video size={24} />,
  },
];

export default function MediaKitPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <h1>Media Kit</h1>
            <p>Downloadable resources for media and合作伙伴</p>
          </div>
        </section>

        <section className="intro section-padding">
          <div className="container">
            <div className="intro-text">
              <h2>Media Resources</h2>
              <p>
                Welcome to the Sushmit Energy media kit. Here you will find downloadable resources including our company profile,
                logo files, photographs, and brand guidelines. These materials are available for journalists, investors, and
                partners who wish to feature Sushmit Energy in their publications.
              </p>
              <p>
                For additional media inquiries, please contact us at <a href="mailto:info@sushmitenergy.com" className="email-link">info@sushmitenergy.com</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="resources-section section-padding">
          <div className="container">
            <div className="resources-grid">
              {resources.map((item, i) => (
                <div key={i} className="resource-card">
                  <div className="resource-icon">{item.icon}</div>
                  <div className="resource-info">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="resource-meta">
                      <span className="resource-format">{item.format}</span>
                      <span className="resource-size">{item.size}</span>
                    </div>
                  </div>
                  <a href="#" className="resource-download">
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
        .intro {
          padding: 60px 0 0;
        }
        .intro-text {
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        .intro-text h2 {
          font-size: 1.8rem;
          margin-bottom: 20px;
        }
        .intro-text p {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .email-link {
          color: var(--primary-blue);
          font-weight: 600;
        }
        .email-link:hover {
          text-decoration: underline;
        }
        .resources-section {
          padding-top: 40px;
        }
        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 20px;
        }
        .resource-card {
          display: flex;
          align-items: center;
          gap: 20px;
          background: var(--bg-white);
          border-radius: var(--radius-md);
          padding: 24px;
          border: 1px solid var(--border-color);
          transition: box-shadow 0.3s;
        }
        .resource-card:hover {
          box-shadow: var(--shadow-md);
        }
        .resource-icon {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: var(--bg-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-blue);
          flex-shrink: 0;
        }
        .resource-info {
          flex: 1;
          min-width: 0;
        }
        .resource-info h3 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 6px;
        }
        .resource-info p {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-bottom: 10px;
        }
        .resource-meta {
          display: flex;
          gap: 12px;
        }
        .resource-format {
          background: #e3f2fd;
          color: var(--primary-blue);
          padding: 2px 10px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .resource-size {
          font-size: 0.75rem;
          color: var(--text-light);
          align-self: center;
        }
        .resource-download {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--primary-green);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.3s, transform 0.3s;
        }
        .resource-download:hover {
          background: var(--primary-green-dark);
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .page-banner h1 {
            font-size: 1.8rem;
          }
          .resources-grid {
            grid-template-columns: 1fr;
          }
          .resource-card {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </>
  );
}
