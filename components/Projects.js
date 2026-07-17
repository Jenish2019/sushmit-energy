import { ArrowUpRight } from 'lucide-react';

const projectList = [
  {
    title: 'Myagdi Khola Hydropower Project',
    capacity: '57.3 MW',
    img: "https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/slider1-1024x576.jpg",
    link: '/myagdi-khola-hydropower-project/',
  },
  {
    title: 'Kunaban Khola Hydropower Project',
    capacity: '24.78 MW',
    img: "https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/04/imageforsusmit-1024x576.png",
    link: '/kunaban-khola-hydropower-project/',
  },
  {
    title: 'Myagdi Khola-B Hydropower Project',
    capacity: '12.5 MW',
    img: "https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/04/imagfor2-1024x576.jpg",
    link: '/myagdi-khola-b-hydropower-project/',
  },
];

export default function Projects() {
  return (
    <section className="projects-section">
      <div className="projects-overlay">
        <div className="container">
          <div className="text-center">
            <h2 className="section-title" style={{ color: 'white' }}>Our Projects</h2>
            <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Developing sustainable hydropower projects across Nepal
            </p>
          </div>
          <div className="projects-grid">
            {projectList.map((project, i) => (
              <a key={i} href={project.link} className="project-card">
                <div className="project-image">
                  <img src={project.img} alt={project.title} />
                  <div className="project-hover">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <span className="project-capacity">{project.capacity}</span>
                </div>
              </a>
            ))}
            <a href="/projects/" className="project-card project-card-cta">
              <div className="project-cta-inner">
                <span>View All Projects</span>
                <ArrowUpRight size={24} />
              </div>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .projects-section {
          background: linear-gradient(135deg, var(--primary-blue-dark), #0a2e5c);
          position: relative;
          overflow: hidden;
        }
        .projects-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url('https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/themes/sushmitenergy/images/kulekhani.jpg') center/cover no-repeat;
          opacity: 0.15;
        }
        .projects-overlay {
          position: relative;
          z-index: 1;
          padding: 100px 0;
        }
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 40px;
        }
        .project-card {
          display: block;
          background: white;
          border-radius: var(--radius-md);
          overflow: hidden;
          text-decoration: none;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .project-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
        }
        .project-image {
          position: relative;
          height: 200px;
          overflow: hidden;
        }
        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        .project-card:hover .project-image img {
          transform: scale(1.1);
        }
        .project-hover {
          position: absolute;
          inset: 0;
          background: rgba(12,80,160,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .project-card:hover .project-hover {
          opacity: 1;
        }
        .project-info {
          padding: 20px;
        }
        .project-info h3 {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-dark);
          margin: 0 0 6px;
          line-height: 1.4;
        }
        .project-capacity {
          font-size: 0.85rem;
          color: var(--primary-green);
          font-weight: 700;
        }
        .project-card-cta {
          background: transparent;
          border: 2px solid rgba(255,255,255,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100%;
        }
        .project-cta-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          padding: 40px 20px;
          text-align: center;
        }
        .project-card-cta:hover {
          border-color: white;
          background: rgba(255,255,255,0.1);
        }
        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .projects-overlay {
            padding: 60px 0;
          }
        }
      `}</style>
    </section>
  );
}
