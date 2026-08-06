import Header from '../components/Header';
import Banner from '../components/Banner';
import IntroSection from '../components/IntroSection';
import Projects from '../components/Projects';
import ChairmanMessage from '../components/ChairmanMessage';
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
      <Header />
      <main>
        <Banner slides={slides} eyebrow={homepage.bannerEyebrow} />
        <IntroSection
          intro={homepage.intro}
          stats={homepage.stats}
          history={homepage.history}
        />
        <Projects projects={projects} />
        <ChairmanMessage chairman={homepage.chairman} />
      </main>
      <Footer />
    </>
  );
}
