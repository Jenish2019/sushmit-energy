import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { FileText, Download, CalendarBlank } from '@phosphor-icons/react/dist/ssr';
import { getReports } from '../../lib/data';

export const dynamic = 'force-dynamic';

export default async function ReportsPage() {
  const reports = await getReports();
  const annualReports = reports.Annual || [];
  const quarterlyReports = reports.Quarterly || [];
  return (
    <>
      <Header />
      <main>
        <PageHero title="Reports" subtitle="Annual and quarterly reports for investors and stakeholders" />

        <section className="section-padding">
          <div className="container">
            <div className="reports-grid">
              <div className="report-section-card">
                <h2><FileText size={24} /> Annual Reports</h2>
                <div className="report-items">
                  {annualReports.map((r, i) => (
                    <div key={i} className="report-item">
                      <div className="report-item-info">
                        <span className="report-name">{r.title}</span>
                        <span className="report-meta">
                          <CalendarBlank size={12} /> {r.date} {r.size ? `· ${r.size}` : ''}
                        </span>
                      </div>
                      <a href={r.fileUrl || '#'} target={r.fileUrl ? '_blank' : undefined} rel={r.fileUrl ? 'noreferrer' : undefined} className="report-download-btn" title="Download">
                        <Download size={18} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="report-section-card">
                <h2><FileText size={24} /> Quarterly Reports</h2>
                <div className="report-items">
                  {quarterlyReports.map((r, i) => (
                    <div key={i} className="report-item">
                      <div className="report-item-info">
                        <span className="report-name">{r.title}</span>
                        <span className="report-meta">{r.date} {r.size ? `· ${r.size}` : ''}</span>
                      </div>
                      <a href={r.fileUrl || '#'} target={r.fileUrl ? '_blank' : undefined} rel={r.fileUrl ? 'noreferrer' : undefined} className="report-download-btn" title="Download">
                        <Download size={18} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .reports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
          gap: 30px;
          max-width: 960px;
          margin: 0 auto;
        }
        .report-section-card {
          padding: 32px;
          background: white;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
        }
        .report-section-card h2 {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.3rem;
          margin-bottom: 24px;
          color: var(--primary-blue);
          padding-bottom: 16px;
          border-bottom: 2px solid var(--bg-light);
        }
        .report-items {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .report-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid var(--border-color);
        }
        .report-item:last-child {
          border-bottom: none;
        }
        .report-item-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .report-name {
          font-weight: 600;
          font-size: 0.95rem;
        }
        .report-meta {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .report-download-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--bg-light);
          color: var(--primary-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s, color 0.3s;
          flex-shrink: 0;
        }
        .report-download-btn:hover {
          background: var(--primary-blue);
          color: white;
        }
        @media (max-width: 768px) {
          .reports-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
