import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import RichText from '../../components/RichText';
import { ArrowUpRight, Lightning } from '@phosphor-icons/react/dist/ssr';
import { getProjects, getPage } from '../../lib/data';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projects = await getProjects();
  const page = await getPage('projects');
  return (
    <>
      <Header />
      <main>
        <PageHero title={page.title} subtitle={page.subtitle} />

        <section className="section-padding">
          <div className="container">
            <div className="projects-list">
              {projects.map((project, i) => (
                <div key={i} className="project-detail-card">
                  <div className="project-detail-image">
                    <img src={project.image} alt={project.name} />
                  </div>
                  <div className="project-detail-content">
                    <div className="project-detail-meta">
                      <span className="project-capacity-badge">
                        <Lightning size={16} /> {project.capacity}
                      </span>
                      <span className="project-status">{project.status}</span>
                    </div>
                    <h2>{project.name}</h2>
                    <p className="project-location">{project.location}</p>
                    <RichText html={project.overview} className="project-description" />
                    <a href={`/${project.slug}/`} className="btn btn-primary">
                      View Details <ArrowUpRight size={18} />
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
        .projects-list {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .project-detail-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          background: var(--bg-white);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
          transition: box-shadow 0.3s;
        }
        .project-detail-card:hover {
          box-shadow: var(--shadow-md);
        }
        .project-detail-image {
          height: 100%;
          min-height: 300px;
          overflow: hidden;
        }
        .project-detail-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        .project-detail-card:hover .project-detail-image img {
          transform: scale(1.05);
        }
        .project-detail-content {
          padding: 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .project-detail-meta {
          display: flex;
          gap: 12px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }
        .project-capacity-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #e8f5e9;
          color: var(--primary-green);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .project-status {
          display: inline-flex;
          align-items: center;
          background: #e3f2fd;
          color: var(--primary-blue);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .project-detail-content h2 {
          font-size: 1.6rem;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .project-location {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 16px;
        }
        .project-description {
          font-size: 0.95rem;
          line-height: 1.7;
          color: var(--text-muted);
          margin-bottom: 24px;
        }
        @media (max-width: 768px) {
          .project-detail-card {
            grid-template-columns: 1fr;
          }
          .project-detail-image {
            min-height: 220px;
          }
          .project-detail-content {
            padding: 24px;
          }
          .project-detail-content h2 {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </>
  );
}
