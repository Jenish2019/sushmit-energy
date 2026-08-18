import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import Reveal from '../../components/Reveal';
import { Download, FileText, Image as ImageIcon, FileZip, CalendarBlank, ArrowDown } from '@phosphor-icons/react/dist/ssr';
import { getMediaResources } from '../../lib/data';

export const dynamic = 'force-dynamic';

function iconFor(format) {
  const f = (format || '').toLowerCase();
  if (/zip|archive/i.test(f)) return <FileZip size={22} />;
  if (/png|jpg|jpeg|image/i.test(f)) return <ImageIcon size={22} />;
  return <FileText size={22} />;
}

export default async function ResourcesPage() {
  const [kit, pubs] = await Promise.all([
    getMediaResources('media-kit'),
    getMediaResources('publications'),
  ]);

  const sections = [
    { id: 'media', heading: 'Media Resources', intro: 'Company profile, logo files, photographs, and brand guidelines for journalists, investors, and partners.' },
    { id: 'publications', heading: 'Publications', intro: 'Reports, studies, and official documents from Sushmit Energy.' },
  ];

  return (
    <>
      <Header />
      <main>
        <PageHero title="Resources" subtitle="Downloadable media assets, reports, and publications from Sushmit Energy" />

        <section className="resources-section">
          <div className="container">
            {[0, 1].map((idx) => {
              const group = idx === 0 ? kit : pubs;
              const section = sections[idx];
              return (
                <div key={section.id} className="resources-block">
                  <Reveal>
                    <div className="resources-head">
                      <h2>{section.heading}</h2>
                      <p>{section.intro}</p>
                    </div>
                  </Reveal>
                  <div className="resources-list">
                    {group.map((item, i) => (
                      <Reveal key={i} delay={i * 50}>
                        <div className="resource-row">
                          <div className="resource-icon">{iconFor(item.format || item.type)}</div>
                          <div className="resource-info">
                            <div className="resource-title-row">
                              <h3>{item.title}</h3>
                              {item.type && <span className="tag tag-neutral">{item.type}</span>}
                            </div>
                            <p>{item.description}</p>
                            <div className="resource-meta">
                              {item.date && (
                                <span className="resource-date">
                                  <CalendarBlank size={13} />
                                  {item.date}
                                </span>
                              )}
                              {item.size ? <span className="resource-size">{item.size}</span> : null}
                            </div>
                          </div>
                          <a href={item.fileUrl || '#'} target={item.fileUrl ? '_blank' : undefined} rel={item.fileUrl ? 'noreferrer' : undefined} className="resource-download" aria-label={`Download ${item.title}`}>
                            {item.fileUrl ? <ArrowDown size={19} weight="bold" /> : <Download size={19} weight="bold" />}
                          </a>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .resources-section { padding: 90px 0 120px; background: var(--bg-white); }

        .resources-block { margin-bottom: 72px; }
        .resources-block:last-child { margin-bottom: 0; }
        .resources-head {
          display: flex;
          align-items: baseline;
          gap: 32px;
          margin-bottom: 40px;
          padding-bottom: 22px;
          border-bottom: 1px solid var(--border-color);
        }
        .resources-head h2 {
          font-size: clamp(1.5rem, 2.6vw, 2rem);
          font-weight: 500;
          white-space: nowrap;
        }
        .resources-head p {
          color: var(--text-muted);
          font-size: .95rem;
          line-height: 1.7;
          max-width: 560px;
        }

        .resources-list { border-top: 1px solid var(--border-color); }
        .resource-row {
          display: grid;
          grid-template-columns: 52px 1fr auto;
          align-items: center;
          gap: 22px;
          padding: 26px 8px;
          border-bottom: 1px solid var(--border-color);
          transition: background .25s, padding-left .3s var(--ease-out-expo);
        }
        .resource-row:hover { background: var(--bg-light); padding-left: 18px; }
        .resource-icon {
          width: 48px; height: 48px;
          border-radius: var(--radius-sm);
          background: var(--bg-light);
          border: 1px solid var(--border-color);
          display: flex; align-items: center; justify-content: center;
          color: var(--primary-blue);
        }
        .resource-info { min-width: 0; }
        .resource-title-row { display: flex; align-items: center; gap: 14px; margin-bottom: 6px; flex-wrap: wrap; }
        .resource-title-row h3 {
          font-size: 1.08rem;
          font-weight: 500;
          margin: 0;
        }
        .resource-info p {
          font-size: .9rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 10px;
          max-width: 720px;
        }
        .resource-meta { display: flex; gap: 16px; align-items: center; }
        .resource-date {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: .82rem;
          color: var(--text-muted);
        }
        .resource-size {
          font-size: .78rem;
          color: var(--text-light);
          letter-spacing: .04em;
        }
        .resource-download {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          color: var(--text-dark);
          display: flex; align-items: center; justify-content: center;
          transition: background .25s, color .25s, border-color .25s, transform .25s var(--ease-out-back);
        }
        .resource-row:hover .resource-download { background: var(--primary-green); border-color: var(--primary-green); color: #fff; transform: translateY(-2px); }

        @media (max-width: 768px) {
          .resources-section { padding: 64px 0 80px; }
          .resources-head { flex-direction: column; gap: 8px; }
          .resource-row { grid-template-columns: 44px 1fr; }
          .resource-download { grid-column: 2; justify-self: start; }
        }
      `}</style>
    </>
  );
}
