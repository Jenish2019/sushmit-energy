import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { MapPin, Clock, Briefcase, ArrowUpRight } from 'lucide-react';

const vacancies = [
  {
    title: 'Senior Hydropower Engineer',
    department: 'Engineering',
    location: 'Kathmandu, Nepal',
    type: 'Full-Time',
    deadline: 'August 30, 2026',
    description: 'We are seeking an experienced Senior Hydropower Engineer to lead the technical design and implementation of our ongoing hydropower projects in western Nepal.',
    requirements: [
      'Bachelor\'s degree in Civil/Mechanical/Electrical Engineering',
      '8+ years of experience in hydropower project development',
      'Experience with feasibility studies and detailed engineering',
      'Strong project management and team leadership skills',
    ],
  },
  {
    title: 'Environmental Compliance Officer',
    department: 'Environment & CSR',
    location: 'Myagdi, Nepal',
    type: 'Full-Time',
    deadline: 'August 15, 2026',
    description: 'Responsible for ensuring environmental compliance across all project sites and coordinating with regulatory bodies on environmental impact assessments.',
    requirements: [
      'Master\'s degree in Environmental Science or related field',
      '5+ years of experience in environmental compliance',
      'Knowledge of Nepal\'s environmental regulations and EIA processes',
      'Experience working on hydropower or infrastructure projects',
    ],
  },
  {
    title: 'Finance Manager',
    department: 'Finance',
    location: 'Kathmandu, Nepal',
    type: 'Full-Time',
    deadline: 'September 15, 2026',
    description: 'Manage the company\'s financial operations including budgeting, forecasting, investor reporting, and compliance with financial regulations.',
    requirements: [
      'CA or MBA in Finance from a recognized institution',
      '7+ years of experience in financial management',
      'Experience in the energy or infrastructure sector preferred',
      'Strong knowledge of Nepal tax laws and financial reporting standards',
    ],
  },
  {
    title: 'Community Relations Officer',
    department: 'CSR & Community Development',
    location: 'Myagdi, Nepal',
    type: 'Full-Time',
    deadline: 'August 20, 2026',
    description: 'Serve as the primary liaison between the company and local communities, managing stakeholder engagement and community development programs.',
    requirements: [
      'Bachelor\'s degree in Social Sciences, Rural Development, or related field',
      '3+ years of experience in community relations',
      'Excellent communication and negotiation skills',
      'Fluency in Nepali and English, knowledge of local dialects preferred',
    ],
  },
  {
    title: 'Junior Electrical Engineer',
    department: 'Engineering',
    location: 'Kathmandu, Nepal',
    type: 'Full-Time',
    deadline: 'September 1, 2026',
    description: 'Assist in the design, installation, and maintenance of electrical systems across our hydropower projects under the guidance of senior engineers.',
    requirements: [
      'Bachelor\'s degree in Electrical Engineering',
      '0–2 years of experience (fresh graduates encouraged to apply)',
      'Knowledge of power systems and electrical design software',
      'Willingness to work at project sites in remote areas',
    ],
  },
];

export default function VacanciesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <h1>Current Vacancies</h1>
            <p>Join the Sushmit Energy team and power Nepal\'s future</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="vacancies-intro">
              <p>
                At Sushmit Energy, we are always looking for talented and passionate individuals to join our team.
                If you are committed to making a difference in Nepal\'s renewable energy sector, we want to hear from you.
              </p>
              <p>
                To apply, please send your CV and cover letter to <a href="mailto:careers@sushmitenergy.com" className="email-link">careers@sushmitenergy.com</a>.
              </p>
            </div>

            <div className="vacancies-list">
              {vacancies.map((job, i) => (
                <div key={i} className="vacancy-card">
                  <div className="vacancy-header">
                    <div>
                      <h2 className="vacancy-title">{job.title}</h2>
                      <div className="vacancy-meta">
                        <span className="vacancy-meta-item">
                          <Briefcase size= {14} />
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
                  <a href={`mailto:careers@sushmitenergy.com?subject=Application for ${encodeURIComponent(job.title)}`} className="btn btn-primary">
                    Apply Now <ArrowUpRight size={18} />
                  </a>
                </div>
              ))}
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
        .page-banner .container {
          position: relative;
          z-index: 1;
        }
        .page-banner h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 12px;
        }
        .page-banner p {
          font-size: 1.1rem;
          opacity: 0.85;
        }
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
          .page-banner h1 {
            font-size: 1.8rem;
          }
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
