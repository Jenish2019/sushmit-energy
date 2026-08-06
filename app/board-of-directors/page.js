import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { getBoardMembers, getPage } from '../../lib/data';
const FacebookIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const TwitterIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const LinkedinIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>;

export const dynamic = 'force-dynamic';

export default async function BoardPage() {
  const directors = await getBoardMembers();
  const page = await getPage('board-of-directors');
  return (
    <>
      <Header />
      <main>
        <PageHero title={page.title} subtitle={page.subtitle} />

        <section className="section-padding">
          <div className="container">
            <div className="board-grid">
              {directors.map((d, i) => (
                <div key={i} className="board-card">
                  <div className="board-img">
                    <img src={d.image} alt={d.name} />
                  </div>
                  <div className="board-info">
                    <h3>{d.name}</h3>
                    <span className="board-role">{d.title}</span>
                    {d.social && (
                      <div className="board-social">
                        {d.social.facebook && (
                          <a href={d.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <FacebookIcon size={18} />
                          </a>
                        )}
                        {d.social.twitter && (
                          <a href={d.social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <TwitterIcon size={18} />
                          </a>
                        )}
                        {d.social.linkedin && (
                          <a href={d.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <LinkedinIcon size={18} />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
.board-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 30px;
        }
        .board-card {
          background: white;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .board-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .board-img {
          height: 280px;
          overflow: hidden;
          background: var(--bg-light);
        }
        .board-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        .board-card:hover .board-img img {
          transform: scale(1.05);
        }
        .board-info {
          padding: 20px;
          text-align: center;
        }
        .board-info h3 {
          font-size: 1.1rem;
          margin: 0 0 4px;
        }
        .board-role {
          font-size: 0.9rem;
          color: var(--primary-green);
          font-weight: 600;
        }
        .board-social {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-top: 12px;
        }
        .board-social a {
          color: var(--text-muted);
          transition: color 0.2s;
        }
        .board-social a:hover { color: var(--primary-blue); }
        @media (max-width: 768px) {
          .board-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .board-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
