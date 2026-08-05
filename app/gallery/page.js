import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { getAlbums } from '../../lib/data';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const fetched = await getAlbums();
  const albums = fetched.map((a) => ({ title: a.name, img: a.cover, link: a.link || '#' }));
  return (
    <>
      <Header />
      <main>
        <PageHero title="Gallery" subtitle="Photos from our projects and operations" />

        <section className="section-padding">
          <div className="container">
            <div className="gallery-grid">
              {albums.map((album, i) => (
                <a key={i} href={album.link} className="gallery-card">
                  <div className="gallery-img">
                    <img src={album.img} alt={album.title} />
                    <div className="gallery-hover">
                      <ArrowUpRight size={28} />
                    </div>
                  </div>
                  <div className="gallery-title-bar">
                    <h3>{album.title}</h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 30px;
        }
        .gallery-card {
          display: block;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
          transition: transform 0.3s, box-shadow 0.3s;
          text-decoration: none;
        }
        .gallery-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .gallery-img {
          position: relative;
          height: 260px;
          overflow: hidden;
        }
        .gallery-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        .gallery-card:hover .gallery-img img { transform: scale(1.08); }
        .gallery-hover {
          position: absolute;
          inset: 0;
          background: rgba(12,80,160,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .gallery-card:hover .gallery-hover { opacity: 1; }
        .gallery-title-bar {
          padding: 16px 20px;
          background: white;
        }
        .gallery-title-bar h3 {
          margin: 0;
          font-size: 1rem;
          color: var(--text-dark);
        }
        @media (max-width: 768px) {
          .gallery-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
