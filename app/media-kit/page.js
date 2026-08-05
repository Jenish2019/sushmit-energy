import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { Download, Image, FileText, VideoCamera, FileZip } from '@phosphor-icons/react/dist/ssr';
import { getMediaResources } from '../../lib/data';

export const dynamic = 'force-dynamic';

export default async function MediaKitPage() {
  const fetched = await getMediaResources('media-kit');
  const resources = fetched.map((r) => {
    const format = r.format || r.type || 'PDF';
    const icon = /zip/i.test(format)
      ? <Image size={24} />
      : /mp4|video/i.test(format)
        ? <VideoCamera size={24} />
        : /archive/i.test(format)
          ? <FileZip size={24} />
          : <FileText size={24} />;
    return { ...r, format, icon };
  });
  return (
    <>
      <Header />
      <main>
        <PageHero title="Media Kit" subtitle="Downloadable resources for media and合作伙伴" />

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
                  <a href={item.fileUrl || '#'} target={item.fileUrl ? '_blank' : undefined} rel={item.fileUrl ? 'noreferrer' : undefined} className="resource-download">
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
