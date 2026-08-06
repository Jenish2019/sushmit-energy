import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { Crosshair, Eye, CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { getPage } from '../../lib/data';
import { DEFAULTS } from '../../lib/defaults';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const about = await getPage('about-us');
  const paragraphs = about.paragraphs || DEFAULTS.about.paragraphs;
  const vision = about.vision || DEFAULTS.about.vision;
  const mission = about.mission || DEFAULTS.about.mission;
  const objectives = about.objectives || DEFAULTS.about.objectives;
  const title = about.title || DEFAULTS.about.title;
  const subtitle = about.subtitle || DEFAULTS.about.subtitle;

  return (
    <>
      <Header />
      <main>
        <PageHero title={title} subtitle={subtitle} />

        <section className="about-content section-padding">
          <div className="container">
            <div className="about-text">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="about-cards">
              <div className="about-card">
                <div className="about-card-icon" style={{ background: '#e8f5e9' }}>
                  <Eye size={32} style={{ color: 'var(--primary-green)' }} />
                </div>
                <h3>Vision</h3>
                <p>{vision}</p>
              </div>
              <div className="about-card">
                <div className="about-card-icon" style={{ background: '#e3f2fd' }}>
                  <Crosshair size={32} style={{ color: 'var(--primary-blue)' }} />
                </div>
                <h3>Mission</h3>
                <p>{mission}</p>
              </div>
              <div className="about-card">
                <div className="about-card-icon" style={{ background: '#e6f7ee' }}>
                  <CheckCircle size={32} style={{ color: '#0f8a43' }} />
                </div>
                <h3>Overall Objectives</h3>
                <p>{objectives}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
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
        }
      `}</style>
    </>
  );
}
