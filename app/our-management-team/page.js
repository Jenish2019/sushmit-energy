import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import RichText from '../../components/RichText';
import { getManagementMembers, getPage } from '../../lib/data';
import { LinkedinLogo } from '@phosphor-icons/react/dist/ssr';

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </svg>
);

export const dynamic = 'force-dynamic';

export default async function ManagementTeamPage() {
  const team = await getManagementMembers();
  const page = await getPage('our-management-team');
  return (
    <>
      <Header />
      <main>
        <PageHero title={page.title} subtitle={page.subtitle} />

        <section className="section-padding">
          <div className="container">
            <RichText html={page.intro} className="intro-text" />

            <div className="team-grid">
              {team.map((member, i) => (
                <div key={i} className="team-card">
                  <div className="team-img">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="team-info">
                    <h3>{member.name}</h3>
                    <span className="team-role">{member.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
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
      `}</style>
    </>
  );
}
