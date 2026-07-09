import Header from '../components/Header';
import Banner from '../components/Banner';
import IntroSection from '../components/IntroSection';
import Projects from '../components/Projects';
import ChairmanMessage from '../components/ChairmanMessage';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <Banner />
      <IntroSection />
      <Projects />
      <ChairmanMessage />
      <Footer />
    </>
  );
}