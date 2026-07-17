import Header from '../../components/Header';
import Footer from '../../components/Footer';
const FacebookIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const TwitterIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;
const LinkedinIcon = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>;

const directors = [
  {
    name: 'Sushil Pokharel',
    role: 'Chairman',
    img: 'https://web.archive.org/web/20260121094210im_/https://www.sushmitenergy.com/wp-content/uploads/2017/01/sushil-pokharel.png',
    social: { facebook: 'https://www.facebook.com/sushilpokharel.NP', twitter: 'https://twitter.com/sushilpokharel1', linkedin: 'https://www.linkedin.com/in/sushilpokharel/' },
  },
  {
    name: 'Bhawani Devkota',
    role: 'Director',
    img: 'https://web.archive.org/web/20260121094210im_/https://www.sushmitenergy.com/wp-content/uploads/2018/01/bhawani-Devkota-1.jpg',
    social: { facebook: 'https://www.facebook.com/bhawani.devkota.5' },
  },
  {
    name: 'Subash C Baral',
    role: 'Director',
    img: 'https://web.archive.org/web/20260121094210im_/https://www.sushmitenergy.com/wp-content/uploads/2018/01/Subash-sir-photo.jpg',
  },
  {
    name: 'Binod Dhakal',
    role: 'Director',
    img: 'https://web.archive.org/web/20260121094210im_/https://www.sushmitenergy.com/wp-content/uploads/2017/04/Binod-Dhakal.jpg',
    social: { facebook: 'https://www.facebook.com/binod.dhakal.583' },
  },
  {
    name: 'Yadav Pokharel',
    role: 'Director',
    img: 'https://web.archive.org/web/20260121094210im_/https://www.sushmitenergy.com/wp-content/uploads/2017/04/19400098_10154699406841662_1875753842769488258_n.jpg',
    social: { facebook: 'https://www.facebook.com/yadabp', twitter: 'https://twitter.com/yadabpok', linkedin: 'https://www.linkedin.com/in/yad-pokharel-732a321b/' },
  },
];

export default function BoardPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <h1>Board of Directors</h1>
            <p>Our leadership team guiding Sushmit Energy&apos;s vision</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="board-grid">
              {directors.map((d, i) => (
                <div key={i} className="board-card">
                  <div className="board-img">
                    <img src={d.img} alt={d.name} />
                  </div>
                  <div className="board-info">
                    <h3>{d.name}</h3>
                    <span className="board-role">{d.role}</span>
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
        .page-banner .container { position: relative; z-index: 1; }
        .page-banner h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 12px; }
        .page-banner p { font-size: 1.1rem; opacity: 0.85; }
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
          .page-banner h1 { font-size: 1.8rem; }
          .board-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .board-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
