import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { MapPin, Clock, Briefcase, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { getJobs } from '../../lib/data';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function VacanciesPage() {
  const vacancies = await getJobs();
  return (
    <>
      <Header />
      <main>
        <PageHero title="Current Vacancies" subtitle="Join the Sushmit Energy team and power Nepal\'s future" />

        <section className="section-padding">
          <div className="container">
            <div className="vacancies-intro">
              <p>
                At Sushmit Energy, we are always looking for talented and passionate individuals to join our team.
                If you are committed to making a difference in Nepal&apos;s renewable energy sector, we want to hear from you.
              </p>
              <p>
                Click a role to view full details, or send your CV and cover letter to <a href="mailto:careers@sushmitenergy.com" className="email-link">careers@sushmitenergy.com</a>.
              </p>
            </div>

            <div className="vacancies-list">
              {vacancies.map((job, i) => (
                <div key={i} className="vacancy-card">
                  <div className="vacancy-header">
                    <div>
                      <h2 className="vacancy-title">
                        <Link href={`/current-vacancies/${job.slug}`}>{job.title}</Link>
                      </h2>
                      <div className="vacancy-meta">
                        <span className="vacancy-meta-item">
                          <Briefcase size={14} />
                          {job.department}
                        </span>
                        <span className="vacancy-meta-item">
                          <MapPin size={14} />
                          {job.location}
                        </span>
                        <span className="vacancy-meta-item">
                          <Clock size={14} />
                          Apply by: {job.deadline}
                        </span>
                      </div>
                    </div>
                    <span className="vacancy-type">{job.type}</span>
                  </div>
                  <p className="vacancy-description">{job.description}</p>
                  <div className="vacancy-requirements">
                    <h4>Requirements:</h4>
                    <ul>
                      {job.requirements.map((req, j) => (
                        <li key={j}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="vacancy-actions">
                    <Link href={`/current-vacancies/${job.slug}`} className="btn btn-outline">
                      View Details <ArrowUpRight size={18} />
                    </Link>
                    <a href={`mailto:careers@sushmitenergy.com?subject=Application for ${encodeURIComponent(job.title)}`} className="btn btn-primary">
                      Apply Now <ArrowUpRight size={18} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
.vacancies-intro {
          max-width: 800px;
          margin: 0 auto 50px;
          text-align: center;
        }
        .vacancies-intro p {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 12px;
        }
        .email-link {
          color: var(--primary-blue);
          font-weight: 600;
        }
        .email-link:hover {
          text-decoration: underline;
        }
        .vacancies-list {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .vacancy-card {
          background: var(--bg-white);
          border-radius: var(--radius-md);
          padding: 32px;
          border: 1px solid var(--border-color);
          transition: box-shadow 0.3s;
        }
        .vacancy-card:hover {
          box-shadow: var(--shadow-md);
        }
        .vacancy-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 16px;
        }
        .vacancy-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .vacancy-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
        }
        .vacancy-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .vacancy-type {
          background: var(--primary-green);
          color: white;
          padding: 4px 14px;
          border-radius: 20px;
          font-size: 0.78rem;
          font-weight: 600;
          white-space: nowrap;
        }
        .vacancy-title a { color: var(--text-dark); text-decoration: none; transition: color .2s; }
        .vacancy-title a:hover { color: var(--primary-blue); }
        .vacancy-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .vacancy-description {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 20px;
        }
        .vacancy-requirements {
          margin-bottom: 24px;
        }
        .vacancy-requirements h4 {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 10px;
        }
        .vacancy-requirements ul {
          list-style: disc;
          padding-left: 20px;
        }
        .vacancy-requirements li {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 4px;
        }
        @media (max-width: 768px) {
          .vacancy-header {
            flex-direction: column;
          }
          .vacancy-card {
            padding: 24px;
          }
        }
      `}</style>
    </>
  );
}
