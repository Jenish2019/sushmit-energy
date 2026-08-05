import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { getPage } from '../../lib/data';
import { DEFAULTS } from '../../lib/defaults';

export const dynamic = 'force-dynamic';

export default async function OrgChartPage() {
  const page = await getPage('organizational-chart');
  const title = page.title || DEFAULTS.orgChart.title;
  const subtitle = page.subtitle || DEFAULTS.orgChart.subtitle;
  const image = page.image || DEFAULTS.orgChart.image;

  return (
    <>
      <Header />
      <main>
        <PageHero title={title} subtitle={subtitle} />

        <section className="section-padding">
          <div className="container">
            <div className="org-chart-wrapper">
              <img
                src={image}
                alt="Sushmit Energy Organizational Chart"
                className="org-chart-img"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .org-chart-wrapper {
          max-width: 900px;
          margin: 0 auto;
          background: white;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          padding: 40px;
          border: 1px solid var(--border-color);
        }
        .org-chart-img {
          width: 100%;
          height: auto;
          display: block;
        }
        @media (max-width: 768px) {
          .org-chart-wrapper { padding: 20px; }
        }
      `}</style>
    </>
  );
}
