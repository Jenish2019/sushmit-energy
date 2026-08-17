import Header from '../components/Header';
import ScrollProgress from '../components/ScrollProgress';
import Banner from '../components/Banner';
import IntroSection from '../components/IntroSection';
import KunabanShowcase from '../components/KunabanShowcase';
import ChairmanMessage from '../components/ChairmanMessage';
import LatestUpdates from '../components/LatestUpdates';
import Footer from '../components/Footer';
import { getProjects, getBannerSlides, getHomepage } from '../lib/data';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [projects, slides, homepage] = await Promise.all([
    getProjects(),
    getBannerSlides(),
    getHomepage(),
  ]);

  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <div className="snap-section snap-hero">
          <Banner slides={slides} eyebrow={homepage.bannerEyebrow} />
        </div>
        <div className="snap-section snap-page">
          <IntroSection
            intro={homepage.intro}
            stats={homepage.stats}
          />
        </div>
        <div className="snap-section snap-page snap-page--showcase">
          <KunabanShowcase project={projects[0] || null} />
        </div>
        <div className="snap-section snap-page">
          <ChairmanMessage chairman={homepage.chairman} />
        </div>
        <div className="snap-section snap-page">
          <LatestUpdates />
        </div>
      </main>
      <Footer />

      <style>{`
        /* Full-screen "story" sections; normal scrolling (no scroll-snap) so the
           footer stays reachable at the bottom of the page */
        .snap-section {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
        }

        /* Page 1: hero fills exactly one screen */
        .snap-hero .hero {
          flex: 1 1 0%;
          height: auto;
          max-height: none;
          min-height: 560px;
          display: flex;
          flex-direction: column;
        }
        .snap-hero .hero .hero-content {
          flex: 1 1 auto;
          height: auto;
        }

        /* Story pages: fill one screen and vertically center their content */
        .snap-page > * {
          flex: 1 1 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .snap-page .section-padding {
          padding-block: clamp(48px, 9vh, 88px);
        }

        @media (max-width: 900px) {
          .snap-page > *,
          .snap-hero { align-items: flex-start; }
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
        }
      `}</style>
    </>
  );
}