import Header from '../components/Header';
import ScrollProgress from '../components/ScrollProgress';
import Banner from '../components/Banner';
import Ticker from '../components/Ticker';
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

  const tickerItems = projects
    .filter((p) => p.name || p.title)
    .map((p) => ({ title: p.name || p.title, capacity: p.capacity || '' }));

  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <div className="snap-section snap-hero">
          <Banner slides={slides} eyebrow={homepage.bannerEyebrow} />
          <Ticker items={tickerItems} />
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
        html {
          scroll-snap-type: y proximity;
          scroll-behavior: smooth;
        }

        .snap-section {
          scroll-snap-align: start;
        }

        /* Page 1: hero + ticker fill exactly one screen */
        .snap-hero {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
        }
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
        .snap-hero .ticker {
          flex: 0 0 auto;
        }

        /* Story pages: fill one screen and vertically center their content */
        .snap-page {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
        }
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
          html { scroll-snap-type: y proximity; }
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