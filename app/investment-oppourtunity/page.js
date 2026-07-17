import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ExternalLink, FileDown, ArrowUpRight } from 'lucide-react';

const resources = [
  { name: 'Nepal Investment Guide 2018 - English Version', file: 'http://ibn.gov.np/uploads/files/repository/Nepal%20Investment%20Guide%202018.pdf' },
  { name: 'Nepal Investment Guide 2018 - Chinese Version', file: 'http://ibn.gov.np/uploads/files/repository/IBN_Investment%20Guide%20Book_Chinese.pdf' },
  { name: 'Nepal Investment Guide 2018 - Japanese Version', file: 'http://www.ibn.gov.np/uploads/files/repository/IBN_Investment%20Guide%20Book_Japanese_Final.pdf' },
];

const links = [
  { name: 'Nepal Investment Summit', url: 'http://investmentsummitnepal.com/' },
  { name: 'Government of Nepal Ministry of Energy', url: 'http://www.moen.gov.np/' },
  { name: 'Nepal Electricity Authority', url: 'http://www.nea.org.np/' },
  { name: 'Department of Electricity Development (DOED)', url: 'http://www.doed.gov.np/' },
  { name: 'Department of Land Reform and Management', url: 'http://www.dolrm.gov.np/' },
];

export default function InvestmentPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <h1>Investment Opportunity in Nepal</h1>
            <p>Harness Nepal&apos;s vast hydropower potential</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="investment-content">
              <h2>Sector Overview</h2>
              <p>
                Nepal is rich in water resources with multiple sources of water, including
                glaciers, snowmelt from the Himalayas, rainfall and ground water. There are 6,000
                rivers, including rivulets and tributaries, totalling about 45,000 km in length.
                The country contains 2.2% of the world&apos;s water resources.
              </p>
              <p>
                Nepal&apos;s theoretical capacity for producing power from hydropower projects is
                around 80,000 MW. However, as at 2014, installed capacity is only around 700 MW of
                electricity, despite the fact that demand is over 1,000 MW. Thus, Nepal remains
                one of the lowest energy consuming countries in the world. Demand for electricity
                is increasing at 7&ndash;9% per year, and according to the forecast from Nepal
                Electricity Authority, demand for electricity will reach 3,600 MW by 2027.
              </p>
              <p>
                To deal with the shortage of electricity in Nepal, IBN and other government
                agencies have stepped forward to implement mega hydropower projects. In September
                2014, Nepal signed its first Project Development Agreement (PDA, concession
                agreement) with a private developer, GMR LTD, to develop the Upper Karnali
                Hydropower Project, a 900 MW project. IBN has also signed another PDA with SJVNL,
                an Indian governmental entity, for the development of the 900 MW Arun III. The
                combined cost of these two projects exceeds USD 2.5 billion. In addition, Nepal
                has signed the Power Trade Agreement (PTA) with India, paving the way for the free
                flow of electricity as a commodity across the border.
              </p>
              <p>
                There are several other mega power projects (above 500 MW) in the early stages of
                development, and IBN has the mandate to take these projects forward. These
                projects are a high priority for the government and various incentives are in place
                for investors.
              </p>
            </div>

            <div className="investment-sections">
              <div className="inv-section">
                <h3>Important Links</h3>
                <div className="inv-table">
                  <div className="inv-table-header">
                    <span>#</span>
                    <span>Organization</span>
                    <span>Website</span>
                  </div>
                  {links.map((link, i) => (
                    <div key={i} className="inv-table-row">
                      <span>{i + 1}</span>
                      <span>{link.name}</span>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        Visit <ExternalLink size={14} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="inv-section">
                <h3>Related Resources</h3>
                <div className="resources-list">
                  {resources.map((res, i) => (
                    <a key={i} href={res.file} target="_blank" rel="noopener noreferrer" className="resource-item">
                      <FileDown size={20} />
                      <span>{res.name}</span>
                      <ArrowUpRight size={16} />
                    </a>
                  ))}
                </div>
              </div>
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
        .investment-content {
          max-width: 850px;
          margin: 0 auto 60px;
        }
        .investment-content h2 {
          font-size: 1.8rem;
          margin-bottom: 24px;
          color: var(--primary-blue);
        }
        .investment-content p {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--text-muted);
          margin-bottom: 16px;
          text-align: justify;
        }
        .investment-sections {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .inv-section h3 {
          font-size: 1.3rem;
          margin-bottom: 20px;
          color: var(--text-dark);
          border-bottom: 2px solid var(--primary-green);
          padding-bottom: 10px;
          display: inline-block;
        }
        .inv-table {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .inv-table-header {
          display: grid;
          grid-template-columns: 40px 1fr 1fr;
          padding: 12px 16px;
          background: var(--bg-light);
          font-weight: 600;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .inv-table-row {
          display: grid;
          grid-template-columns: 40px 1fr 1fr;
          padding: 12px 16px;
          border-top: 1px solid var(--border-color);
          font-size: 0.9rem;
          align-items: center;
        }
        .inv-table-row a {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--primary-blue);
          font-weight: 500;
          font-size: 0.85rem;
        }
        .inv-table-row a:hover { text-decoration: underline; }
        .resources-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .resource-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          background: var(--bg-light);
          border-radius: var(--radius-sm);
          color: var(--text-dark);
          transition: background 0.2s;
          text-decoration: none;
        }
        .resource-item:hover {
          background: #e8f5e9;
        }
        .resource-item span { flex: 1; font-size: 0.9rem; }
        .resource-item svg { flex-shrink: 0; color: var(--primary-green); }
        @media (max-width: 768px) {
          .investment-sections { grid-template-columns: 1fr; }
          .page-banner h1 { font-size: 1.8rem; }
        }
      `}</style>
    </>
  );
}
