import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Linkedin } from 'lucide-react';

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </svg>
);

const team = [
  { name: 'Sushil Pokharel', role: 'Chairman', img: 'https://web.archive.org/web/20260315210330im_/https://www.sushmitenergy.com/wp-content/uploads/2017/01/sushil-pokharel.png' },
  { name: 'Rajendra Shrestha', role: 'Managing Director', img: 'https://web.archive.org/web/20260315210330im_/https://www.sushmitenergy.com/wp-content/uploads/2017/01/sushil-pokharel.png' },
  { name: 'Prakash Adhikari', role: 'Chief Operating Officer', img: 'https://web.archive.org/web/20260315210330im_/https://www.sushmitenergy.com/wp-content/uploads/2017/01/sushil-pokharel.png' },
  { name: 'Anita Thapa', role: 'Chief Financial Officer', img: 'https://web.archive.org/web/20260315210330im_/https://www.sushmitenergy.com/wp-content/uploads/2017/01/sushil-pokharel.png' },
  { name: 'Binod Acharya', role: 'Head of Engineering', img: 'https://web.archive.org/web/20260315210330im_/https://www.sushmitenergy.com/wp-content/uploads/2017/01/sushil-pokharel.png' },
  { name: 'Sunita Sharma', role: 'Company Secretary', img: 'https://web.archive.org/web/20260315210330im_/https://www.sushmitenergy.com/wp-content/uploads/2017/01/sushil-pokharel.png' },
];

export default function ManagementTeamPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <h1>Our Management Team</h1>
            <p>Dedicated professionals driving our vision forward</p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="intro-text">
              <p>
                Our management team comprises experienced professionals with deep expertise in
                hydropower development, finance, and project management. Together, they ensure
                Sushmit Energy delivers on its commitment to sustainable energy and investor value.
              </p>
            </div>

            <div className="team-grid">
              {team.map((member, i) => (
                <div key={i} className="team-card">
                  <div className="team-img">
                    <img src={member.img} alt={member.name} />
                  </div>
                  <div className="team-info">
                    <h3>{member.name}</h3>
                    <span className="team-role">{member.role}</span>
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
        .page-banner .container { position: relative; z-index: 1; }
        .page-banner h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 12px; }
        .page-banner p { font-size: 1.1rem; opacity: 0.85; }
        .intro-text {
          max-width: 700px;
          margin: 0 auto 60px;
          text-align: center;
        }
        .intro-text p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: var(--text-muted);
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 30px;
        }
        .team-card {
          background: white;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .team-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .team-img {
          height: 280px;
          overflow: hidden;
          background: var(--bg-light);
        }
        .team-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        .team-card:hover .team-img img { transform: scale(1.05); }
        .team-info {
          padding: 20px;
          text-align: center;
        }
        .team-info h3 { font-size: 1.05rem; margin: 0 0 4px; }
        .team-role { font-size: 0.85rem; color: var(--primary-green); font-weight: 600; }
        @media (max-width: 768px) {
          .page-banner h1 { font-size: 1.8rem; }
        }
      `}</style>
    </>
  );
}
