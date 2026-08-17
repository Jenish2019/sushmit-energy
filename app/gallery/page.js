import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { getAlbums } from '../../lib/data';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const fetched = await getAlbums();
  const albums = fetched.map((a) => ({ title: a.name, img: a.cover, link: a.slug ? `/gallery/${a.slug}` : (a.link || '#') }));
  return (
    <>
      <Header />
      <main>
        <PageHero title="Gallery" subtitle="Photos from our projects and operations" />

        <section className="gallery-section">
          <div className="container">
            <div className="gallery-grid">
              {albums.map((album, i) => (
                <a key={i} href={album.link} className="gallery-card">
                  <div className="gallery-img">
                    {album.img ? <img src={album.img} alt={album.title} loading="lazy" /> : (
                      <div className="gallery-img-placeholder"><ArrowUpRight size={30} /></div>
                    )}
                    <span className="gallery-arrow" aria-hidden="true">
                      <ArrowUpRight size={22} weight="bold" />
                    </span>
                  </div>
                  <div className="gallery-title-bar">
                    <h3>{album.title}</h3>
                    <span className="gallery-open">Open album</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .gallery-section { padding: 90px 0 120px; background: var(--bg-white); }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 28px;
        }
        .gallery-card {
          display: block;
          text-decoration: none;
          border-top: 1px solid var(--border-color);
          padding-top: 18px;
          transition: border-color .3s;
        }
        .gallery-card:hover { border-color: var(--text-dark); }
        .gallery-img {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: var(--bg-light);
        }
        .gallery-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .8s var(--ease-out-expo);
        }
        .gallery-img-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          background: var(--bg-light);
        }
        .gallery-card:hover .gallery-img img { transform: scale(1.06); }
        .gallery-arrow {
          position: absolute;
          right: 14px; bottom: 14px;
          width: 42px; height: 42px;
          border-radius: 50%;
          background: var(--accent-bright);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity .35s var(--ease-out-expo), transform .35s var(--ease-out-expo);
        }
        .gallery-card:hover .gallery-arrow { opacity: 1; transform: translateY(0); }
        .gallery-title-bar {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 14px;
          padding-top: 16px;
        }
        .gallery-title-bar h3 {
          margin: 0;
          font-size: 1.12rem;
          font-weight: 500;
          color: var(--text-dark);
        }
        .gallery-open {
          font-size: .76rem;
          color: var(--text-light);
          letter-spacing: .06em;
          text-transform: uppercase;
          transition: color .2s;
        }
        .gallery-card:hover .gallery-open { color: var(--primary-blue); }
        @media (max-width: 768px) {
          .gallery-section { padding: 64px 0 80px; }
          .gallery-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
