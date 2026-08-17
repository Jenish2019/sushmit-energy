import { notFound } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import PageHero from '../../../components/PageHero';
import AlbumLightbox from '../../../components/AlbumLightbox';
import { getAlbumBySlug } from '../../../lib/data';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);
  if (!album) return { title: 'Album Not Found' };
  return { title: `${album.name} - Gallery`, description: album.description || `${album.name} photo album` };
}

export default async function AlbumDetailPage({ params }) {
  const { slug } = await params;
  const album = await getAlbumBySlug(slug);
  if (!album) notFound();

  const imgUrl = (im) => (typeof im === 'string' ? im : im?.url || im?.image || '');
  const images = album.images || [];
  const displayImages = album.cover
    ? [{ url: album.cover, caption: '' }, ...images.filter((im) => imgUrl(im) !== album.cover)]
    : images;

  return (
    <>
      <Header />
      <main>
        <PageHero title={album.name} subtitle={album.description} image={album.cover} backLink={{ href: '/gallery', label: 'All Albums' }} />

        <section className="section-padding">
          <div className="container">
            <div className="album-count">
              {displayImages.length} photo{(displayImages.length === 1) ? '' : 's'}
            </div>
            <AlbumLightbox images={displayImages} />
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .album-count { font-size:.85rem; color:var(--text-muted); font-weight:600; letter-spacing:.04em; text-transform:uppercase; margin-bottom:22px; padding-bottom:14px; border-bottom:1px solid var(--border-color); }
      `}</style>
    </>
  );
}