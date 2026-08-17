import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import RichText from '../../components/RichText';
import { getPage } from '../../lib/data';
import { DEFAULTS } from '../../lib/defaults';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const about = await getPage('about-us');
  const paragraphs = about.paragraphs || DEFAULTS.about.paragraphs;
  const title = about.title || DEFAULTS.about.title;
  const subtitle = about.subtitle || DEFAULTS.about.subtitle;

  return (
    <>
      <Header />
      <main>
        <PageHero title={title} subtitle={subtitle} />

        <section className="about-content section-padding">
          <div className="container">
            <RichText html={paragraphs} className="about-text" />
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
      `}</style>
    </>
  );
}
