import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { ArrowSquareOut, FileArrowDown, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { getPage } from '../../lib/data';
import { DEFAULTS } from '../../lib/defaults';

export const dynamic = 'force-dynamic';

export default async function InvestmentPage() {
  const investment = await getPage('investment-opportunity');
  const title = investment.title || DEFAULTS.investment.title;
  const subtitle = investment.subtitle || DEFAULTS.investment.subtitle;
  const heading = investment.heading || DEFAULTS.investment.heading;
  const paragraphs = investment.paragraphs || DEFAULTS.investment.paragraphs;
  const links = investment.links || DEFAULTS.investment.links;
  const resources = investment.resources || DEFAULTS.investment.resources;
  return (
    <>
      <Header />
      <main>
        <PageHero title={title} subtitle={subtitle} />

        <section className="section-padding">
          <div className="container">
            <div className="investment-content">
              <h2>{heading}</h2>
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="investment-sections">
              <div className="inv-section">
                <h3>Important Links</h3>
                <div className="inv-table">
                  <div className="inv-table-header">
                    <span>#</span>
                    <span>Organization</span>
                    <span>Website</span>
                  </div>
                  {links.map((link, i) => (
                    <div key={i} className="inv-table-row">
                      <span>{i + 1}</span>
                      <span>{link.name}</span>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        Visit <ArrowSquareOut size={14} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="inv-section">
                <h3>Related Resources</h3>
                <div className="resources-list">
                  {resources.map((res, i) => (
                    <a key={i} href={res.file} target="_blank" rel="noopener noreferrer" className="resource-item">
                      <FileArrowDown size={20} />
                      <span>{res.name}</span>
                      <ArrowUpRight size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .investment-content {
          max-width: 850px;
          margin: 0 auto 60px;
        }
        .investment-content h2 {
          font-size: 1.8rem;
          margin-bottom: 24px;
          color: var(--primary-blue);
        }
        .investment-content p {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--text-muted);
          margin-bottom: 16px;
          text-align: justify;
        }
        .investment-sections {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .inv-section h3 {
          font-size: 1.3rem;
          margin-bottom: 20px;
          color: var(--text-dark);
          border-bottom: 2px solid var(--primary-green);
          padding-bottom: 10px;
          display: inline-block;
        }
        .inv-table {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .inv-table-header {
          display: grid;
          grid-template-columns: 40px 1fr 1fr;
          padding: 12px 16px;
          background: var(--bg-light);
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .inv-table-row {
          display: grid;
          grid-template-columns: 40px 1fr 1fr;
          padding: 12px 16px;
          border-top: 1px solid var(--border-color);
          font-size: 0.9rem;
          align-items: center;
        }
        .inv-table-row a {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--primary-blue);
          font-weight: 500;
          font-size: 0.85rem;
        }
        .inv-table-row a:hover { text-decoration: underline; }
        .resources-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .resource-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          background: var(--bg-light);
          border-radius: var(--radius-sm);
          color: var(--text-dark);
          transition: background 0.2s;
          text-decoration: none;
        }
        .resource-item:hover {
          background: #e8f5e9;
        }
        .resource-item span { flex: 1; font-size: 0.9rem; }
        .resource-item svg { flex-shrink: 0; color: var(--primary-green); }
        @media (max-width: 768px) {
          .investment-sections { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
