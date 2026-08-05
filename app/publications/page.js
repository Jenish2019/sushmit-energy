import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { FileText, Download, CalendarBlank, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { getMediaResources } from '../../lib/data';

export const dynamic = 'force-dynamic';

export default async function PublicationsPage() {
  const publications = await getMediaResources('publications');
  return (
    <>
      <Header />
      <main>
        <PageHero title="Publications" subtitle="Reports, studies, and official documents from Sushmit Energy" />

        <section className="section-padding">
          <div className="container">
            <div className="publications-list">
              {publications.map((pub, i) => (
                <div key={i} className="publication-card">
                  <div className="pub-icon">
                    <FileText size={28} />
                  </div>
                  <div className="pub-info">
                    <div className="pub-type">{pub.type || 'Report'}</div>
                    <h2 className="pub-title">{pub.title}</h2>
                    <p className="pub-description">{pub.description}</p>
                    <div className="pub-meta">
                      <span className="pub-date">
                        <CalendarBlank size={14} />
                        {pub.date}
                      </span>
                      {pub.size ? <span className="pub-size">{pub.size}</span> : null}
                    </div>
                  </div>
                  <a href={pub.fileUrl || '#'} target={pub.fileUrl ? '_blank' : undefined} rel={pub.fileUrl ? 'noreferrer' : undefined} className="pub-download">
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
