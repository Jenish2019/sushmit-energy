import Header from '../../components/Header';
import Footer from '../../components/Footer';

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
            <div className="text-center" style={{ maxWidth: 700, margin: '0 auto 60px' }}>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
                Our management team comprises experienced professionals with deep expertise in
                hydropower development, finance, and project management. Together, they ensure
                Sushmit Energy delivers on its commitment to sustainable energy and investor value.
              </p>
            </div>

            <div className="team-grid">
              {[
                { name: 'Sushil Pokharel', role: 'Chairman', img: 'https://web.archive.org/web/20260315210330im_/https://www.sushmitenergy.com/wp-content/uploads/2017/01/sushil-pokharel.png' },
              ].map((member, i) => (
                <div key={i} className="team-card">
                  <div className="team-img">
                    <img src={member.img} alt={member.name} />
                  </div>
                  <div className="team-info">
                    <h3>{member.name}</h3>
                    <span>{member.role}</span>
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
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
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
        .team-info span { font-size: 0.85rem; color: var(--primary-green); font-weight: 600; }
        @media (max-width: 768px) {
          .page-banner h1 { font-size: 1.8rem; }
        }
      `}</style>
    </>
  );
}
