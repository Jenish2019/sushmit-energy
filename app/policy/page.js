import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { FileText, Download } from '@phosphor-icons/react/dist/ssr';
import { getPage } from '../../lib/data';
import { DEFAULTS } from '../../lib/defaults';

export const dynamic = 'force-dynamic';

export default async function PolicyPage() {
  const page = await getPage('policy');
  const title = page.heading || page.title || DEFAULTS.policy.heading;
  const description = page.description || DEFAULTS.policy.description;
  const fileUrl = page.file || page.fileUrl || DEFAULTS.policy.fileUrl;
  return (
    <>
      <Header />
      <main>
        <PageHero title="Policy" subtitle="Energy policies and regulatory framework" />

        <section className="section-padding">
          <div className="container">
            <div className="policy-card">
              <FileText size={40} className="policy-icon" />
              <h2>{title}</h2>
              <p>{description}</p>
              <a
                href={fileUrl}
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
          .policy-card { padding: 40px 24px; }
        }
      `}</style>
    </>
  );
}
