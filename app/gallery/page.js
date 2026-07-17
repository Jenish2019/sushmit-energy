import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ArrowUpRight } from 'lucide-react';

const albums = [
  {
    title: 'Myagdi Khola Hydropower Project',
    img: 'https://web.archive.org/web/20260121105521im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/slider2-1024x576.jpg',
    link: '/updated-site-photos1/',
  },
  {
    title: 'Kunaban Khola Hydropower Project',
    img: 'https://web.archive.org/web/20260121105521im_/https://www.sushmitenergy.com/wp-content/uploads/2017/04/imageforsusmit-1024x576.png',
    link: '/kunaban-khola-hydropower-project/',
  },
  {
    title: 'Myagdi Khola-B Hydropower Project',
    img: 'https://web.archive.org/web/20260121105521im_/https://www.sushmitenergy.com/wp-content/uploads/2017/11/11.jpg',
    link: '/myagdi-khola-b-hydropower-project-2/',
  },
];

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <h1>Gallery</h1>
            <p>Photos from our projects and operations</p>
          </div>
        </section>

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
          .page-banner h1 { font-size: 1.8rem; }
        }
      `}</style>
    </>
  );
}
