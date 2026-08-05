import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { Quotes } from '@phosphor-icons/react/dist/ssr';
import { getPage } from '../../lib/data';
import { DEFAULTS } from '../../lib/defaults';

export const dynamic = 'force-dynamic';

export default async function ChairmanMessagePage() {
  const chairman = await getPage('message-of-chairman');
  const title = chairman.title || DEFAULTS.chairman.title;
  const subtitle = chairman.subtitle || DEFAULTS.chairman.subtitle;
  const name = chairman.name || DEFAULTS.chairman.name;
  const role = chairman.role || DEFAULTS.chairman.role;
  const image = chairman.image || DEFAULTS.chairman.image;
  const heading = chairman.heading || DEFAULTS.chairman.heading;
  const intro = chairman.intro || DEFAULTS.chairman.intro;
  const paragraphs = chairman.paragraphs || DEFAULTS.chairman.paragraphs;
  const signoff = chairman.signoff || DEFAULTS.chairman.signoff;

  return (
    <>
      <Header />
      <main>
        <PageHero title={title} subtitle={subtitle} />

        <section className="section-padding">
          <div className="container">
            <div className="chairman-page-layout">
              <div className="chairman-page-img">
                <img
                  src={image}
                  alt={name}
                />
              </div>
              <div className="chairman-page-content">
                <Quotes size={48} className="chairman-quote-icon" />
                <h2>{heading}</h2>
                <p>{intro}</p>
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
                <div className="chairman-signoff">
                  <p>{signoff}</p>
                  <strong>{name}</strong>
                  <span>{role}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .chairman-page-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 50px;
          align-items: start;
          max-width: 1000px;
          margin: 0 auto;
        }
        .chairman-page-img {
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 4px solid var(--primary-green);
        }
        .chairman-page-img img {
          width: 100%;
          height: auto;
          display: block;
        }
        .chairman-page-content {
          position: relative;
        }
        .chairman-quote-icon {
          color: var(--primary-green);
          opacity: 0.15;
          margin-bottom: 20px;
        }
        .chairman-page-content h2 {
          font-size: 1.5rem;
          margin-bottom: 20px;
          color: var(--primary-blue);
        }
        .chairman-page-content p {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--text-muted);
          margin-bottom: 16px;
          text-align: justify;
        }
        .chairman-signoff {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid var(--border-color);
        }
        .chairman-signoff p { margin-bottom: 8px; }
        .chairman-signoff strong {
          display: block;
          font-size: 1.1rem;
          color: var(--text-dark);
        }
        .chairman-signoff span {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        @media (max-width: 768px) {
          .chairman-page-layout {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          .chairman-page-img {
            max-width: 250px;
            margin: 0 auto;
          }
        }
      `}</style>
    </>
  );
}
