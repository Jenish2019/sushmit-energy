import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RichText from '../../components/RichText';
import Reveal from '../../components/Reveal';
import { Lightning, MapPin, CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { getMainProject, getPage } from '../../lib/data';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const project = await getMainProject();
  const page = await getPage('projects');

  if (!project) {
    return (
      <>
        <Header />
        <main>
          <section className="section-padding">
            <div className="container">
              <h1>Our Project</h1>
              <p>Project details are currently being prepared.</p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  const facts = [
    { label: 'River', value: project.river },
    { label: 'Type', value: project.type },
    ...(project.specs?.length ? project.specs.map((s) => ({ label: s.label, value: s.value })) : []),
  ];

  return (
    <>
      <Header />
      <main>
        <section className="pk-hero" id="top">
          <div
            className="pk-hero-bg"
            style={{ backgroundImage: `url(${project.image})` }}
          />
          <div className="pk-hero-veil" />
          <div className="pk-hero-content">
            <span className="pk-kicker">Our Project</span>
            <h1 className="pk-title">{project.name}</h1>
            {project.subtitle && <p className="pk-subtitle">{project.subtitle}</p>}
            <div className="pk-meta">
              {project.river && (
                <span className="pk-pill pk-pill--green"><Lightning size={14} weight="fill" /> {project.river}</span>
              )}
              {project.type && (
                <span className="pk-pill pk-pill--ghost"><MapPin size={14} weight="fill" /> {project.type}</span>
              )}
            </div>
          </div>
          <span className="pk-scrollline" aria-hidden="true" />
        </section>

        <section className="pk-overview section-padding">
          <div className="container">
            <div className="pk-overview-grid">
              <Reveal variant="mask" className="pk-overview-reveal">
                <div className="pk-overview-copy">
                  <span className="section-kicker">The Project</span>
                  <RichText html={project.overview} />
                </div>
              </Reveal>
              <Reveal variant="right" className="pk-facts-reveal">
                <aside className="pk-facts">
                  {facts.filter((f) => f.value).map((f) => (
                    <div className="pk-fact" key={f.label}>
                      <span className="pk-fact-label">{f.label}</span>
                      <span className="pk-fact-value">{f.value}</span>
                    </div>
                  ))}
                </aside>
              </Reveal>
            </div>
          </div>
        </section>

        {project.features?.length > 0 && (
          <section className="pk-features">
            <div className="container">
              <Reveal variant="mask">
                <div className="pk-features-head">
                  <span className="section-kicker pk-features-kicker">Highlights</span>
                  <h2 className="section-title">What makes it stand out</h2>
                </div>
              </Reveal>
              <div className="pk-features-grid">
                {project.features.map((f, i) => (
                  <Reveal key={i} delay={i * 60} className="pk-feature-reveal">
                    <div className="pk-feature">
                      <span className="pk-feature-icon"><CheckCircle size={18} weight="fill" /></span>
                      <p>{f}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="pk-image-band">
          <img src={project.image} alt={project.name} />
          <div className="pk-image-band-veil" />
          <blockquote className="pk-image-band-quote">
            <span>Kunaban Khola</span>
            <p>Clean, reliable and sustainable hydropower for Nepal.</p>
          </blockquote>
        </section>

        <section className="pk-cta section-padding">
          <div className="container">
            <Reveal variant="mask">
              <div className="pk-cta-box">
                <span className="section-kicker">Get involved</span>
                <h2>Be part of Nepal&rsquo;s clean energy future</h2>
                <p>Explore the investment opportunity behind the Kunaban Khola Hydropower Project.</p>
                <div className="pk-cta-actions">
                  <a href="/contact-us/" className="pk-btn pk-btn--fill">Talk to our team</a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .pk-hero {
          position: relative;
          min-height: 82svh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--bg-dark);
        }
        .pk-hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          animation: pkzoom 14s ease-out forwards;
        }
        @keyframes pkzoom { from { transform: scale(1.05); } to { transform: scale(1.12); } }
        .pk-hero-veil {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(6,28,58,.42) 0%, rgba(6,28,58,.22) 45%, rgba(4,24,34,.82) 100%),
            linear-gradient(115deg, rgba(10,77,163,.38) 0%, rgba(12,60,110,.16) 50%, rgba(15,122,68,.3) 100%);
        }
        .pk-hero-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 120px 28px 96px;
        }
        .pk-kicker {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-display), sans-serif;
          font-size: .78rem;
          font-weight: 600;
          letter-spacing: .24em;
          text-transform: uppercase;
          color: var(--accent-bright);
          margin-bottom: 26px;
          animation: pkrise .9s .05s var(--ease-out-expo) both;
        }
        .pk-kicker::before {
          content: '';
          width: 36px;
          height: 1px;
          background: var(--accent-bright);
        }
        .pk-title {
          font-family: var(--font-display), sans-serif;
          font-size: clamp(2.6rem, 6vw, 4.6rem);
          font-weight: 500;
          line-height: 1.06;
          letter-spacing: -0.02em;
          color: #fff;
          max-width: 16ch;
          margin: 0 0 24px;
          text-shadow: 0 3px 30px rgba(0,0,0,.45);
          animation: pkrise .9s .12s var(--ease-out-expo) both;
        }
        .pk-subtitle {
          max-width: 54ch;
          color: rgba(255,255,255,.82);
          font-size: 1.05rem;
          line-height: 1.7;
          margin-bottom: 34px;
          animation: pkrise .9s .2s var(--ease-out-expo) both;
        }
        .pk-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 40px;
          animation: pkrise .9s .28s var(--ease-out-expo) both;
        }
        .pk-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: .82rem;
          font-weight: 600;
          letter-spacing: .06em;
          text-transform: uppercase;
          color: rgba(255,255,255,.85);
          border: 1px solid rgba(255,255,255,.4);
          border-radius: var(--radius-pill);
          padding: 8px 18px;
          background: rgba(10,14,20,.3);
          backdrop-filter: blur(6px);
        }
        .pk-pill--green { color: #ffffff; background: var(--grad-brand); border-color: transparent; }
        .pk-pill--ghost { text-transform: none; }
        .pk-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display), sans-serif;
          font-size: .86rem;
          font-weight: 600;
          letter-spacing: .06em;
          text-transform: uppercase;
          padding: 15px 28px;
          border-radius: var(--radius-pill);
          transition: transform .3s var(--ease-out-expo), box-shadow .3s, background .3s, color .3s, border-color .3s;
        }
        .pk-btn--outline-dark { color: var(--text-dark); border: 1px solid var(--border-color); }
        .pk-btn--outline-dark:hover { border-color: var(--primary-green); color: var(--primary-green); }
        @keyframes pkrise { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .pk-scrollline {
          position: absolute;
          left: 50%;
          bottom: 0;
          width: 1px;
          height: 64px;
          transform: translateX(-50%);
          background: linear-gradient(180deg, rgba(255,255,255,.55), transparent);
          z-index: 2;
        }

        .pk-overview { background: var(--bg-white); }
        .pk-overview-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 80px;
          align-items: start;
        }
        .pk-overview-copy p {
          font-size: 1.08rem;
          line-height: 1.85;
          color: var(--text-muted);
          margin-bottom: 22px;
        }
        .pk-overview-copy .section-kicker { margin-bottom: 26px; }
        .pk-facts {
          border-top: 1px solid var(--border-color);
        }
        .pk-fact {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 18px;
          padding: 20px 0;
          border-bottom: 1px solid var(--border-color);
        }
        .pk-fact-label { font-size: .82rem; font-weight: 600; letter-spacing: .08em; text-transform: uppercase; color: var(--text-light); }
        .pk-fact-value { font-family: var(--font-display), sans-serif; font-size: 1.05rem; font-weight: 500; color: var(--text-dark); text-align: right; }

        .pk-features {
          background: var(--bg-blue);
          padding: 120px 0;
        }
        .pk-features-head { margin-bottom: 56px; }
        .pk-features-kicker { color: var(--primary-blue); }
        .pk-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .pk-feature {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: var(--bg-white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          padding: 26px;
          height: 100%;
          transition: transform .35s var(--ease-out-expo), box-shadow .35s, border-color .3s;
        }
        .pk-feature:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-color: rgba(10,77,163,.3); }
        .pk-feature-icon {
          flex-shrink: 0;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-green);
          color: var(--primary-green);
        }
        .pk-feature p { font-size: .98rem; line-height: 1.65; color: var(--text-dark); font-weight: 500; }

        .pk-image-band {
          position: relative;
          height: 56vh;
          min-height: 380px;
          overflow: hidden;
        }
        .pk-image-band img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(.2) contrast(1.04); }
        .pk-image-band-veil { position: absolute; inset: 0; background: linear-gradient(180deg, rgba(6,28,58,.1), rgba(6,28,58,.66)); }
        .pk-image-band-quote {
          position: absolute;
          left: 50%;
          bottom: 7%;
          transform: translateX(-50%);
          text-align: center;
          z-index: 2;
          max-width: 720px;
          padding: 0 24px;
        }
        .pk-image-band-quote span {
          font-family: var(--font-display), sans-serif;
          font-size: .8rem;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: var(--accent-bright);
        }
        .pk-image-band-quote p {
          font-family: var(--font-display), sans-serif;
          font-size: clamp(1.4rem, 3vw, 2.2rem);
          font-weight: 500;
          color: #fff;
          line-height: 1.4;
          margin-top: 14px;
        }

        .pk-cta { background: var(--bg-white); }
        .pk-cta-box {
          text-align: center;
          max-width: 640px;
          margin: 0 auto;
        }
        .pk-cta-box h2 {
          font-family: var(--font-display), sans-serif;
          font-size: clamp(1.9rem, 4vw, 2.8rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin: 18px 0 16px;
        }
        .pk-cta-box p { color: var(--text-muted); line-height: 1.7; margin-bottom: 34px; }
        .pk-cta-actions { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }

        @media (max-width: 960px) {
          .pk-overview-grid { grid-template-columns: 1fr; gap: 40px; }
          .pk-features-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 680px) {
          .pk-features-grid { grid-template-columns: 1fr; }
          .pk-hero-content { padding: 90px 0 80px; }
          .pk-cta-actions { flex-direction: column; align-items: stretch; }
          .pk-cta-actions .pk-btn { justify-content: center; }
        }
      `}</style>
    </>
  );
}