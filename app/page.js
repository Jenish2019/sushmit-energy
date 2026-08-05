import Header from '../components/Header';
import Banner from '../components/Banner';
import IntroSection from '../components/IntroSection';
import Projects from '../components/Projects';
import ChairmanMessage from '../components/ChairmanMessage';
import Footer from '../components/Footer';
import { getProjects, getPage, getBannerSlides } from '../lib/data';
import { DEFAULTS } from '../lib/defaults';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [projects, chairmanPage, aboutPage, slides] = await Promise.all([
    getProjects(),
    getPage('message-of-chairman'),
    getPage('about-us'),
    getBannerSlides(),
  ]);

  const intro = {
    ...DEFAULTS.homeAbout,
    text: aboutPage?.paragraphs?.[0] || aboutPage?.intro || DEFAULTS.homeAbout.text,
  };

  return (
    <>
      <Header />
      <main>
        <Banner slides={slides} />
        <IntroSection
          about={intro}
          history={DEFAULTS.homeHistory}
        />
        <Projects projects={projects} />
        <ChairmanMessage chairman={chairmanPage} />
      </main>
      <Footer />
    </>
  );
}
