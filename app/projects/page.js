import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ArrowUpRight, Zap } from 'lucide-react';

const projects = [
  {
    name: 'Myagdi Khola Hydropower Project',
    capacity: '57.3 MW',
    location: 'Myagdi District',
    status: 'Ongoing',
    description:
      'A major hydropower project harnessing the flow of Myagdi Khola river. The project aims to generate 57.3 MW of clean electricity, contributing significantly to Nepal\'s energy grid.',
    img: "https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/slider1-1024x576.jpg",
  },
  {
    name: 'Kunaban Khola Hydropower Project',
    capacity: '24.78 MW',
    location: 'Kunaban Khola',
    status: 'Ongoing',
    description:
      'A medium-capacity hydropower project designed to utilize the water resources of Kunaban Khola efficiently. The project represents sustainable development in the region.',
    img: "https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/04/imageforsusmit-1024x576.png",
  },
  {
    name: 'Myagdi Khola-B Hydropower Project',
    capacity: '12.5 MW',
    location: 'Myagdi District',
    status: 'Ongoing',
    description:
      'A secondary project on the Myagdi Khola river system, complementing the main Myagdi Khola project. Designed to maximize the hydroelectric potential of the watershed.',
    img: "https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/04/imagfor2-1024x576.jpg",
  },
];

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <h1>Our Projects</h1>
            <p>Developing 93+ MW of sustainable hydropower across Nepal</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="projects-list">
              {projects.map((project, i) => (
                <div key={i} className="project-detail-card">
                  <div className="project-detail-image">
                    <img src={project.img} alt={project.name} />
                  </div>
                  <div className="project-detail-content">
                    <div className="project-detail-meta">
                      <span className="project-capacity-badge">
                        <Zap size={16} /> {project.capacity}
                      </span>
                      <span className="project-status">{project.status}</span>
                    </div>
                    <h2>{project.name}</h2>
                    <p className="project-location">{project.location}</p>
                    <p className="project-description">{project.description}</p>
                    <a href={`/${project.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}/`} className="btn btn-primary">
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
          .page-banner h1 {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </>
  );
}
