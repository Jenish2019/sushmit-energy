import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Clock, Briefcase, ArrowUpRight, EnvelopeSimple } from '@phosphor-icons/react/dist/ssr';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import PageHero from '../../../components/PageHero';
import { getJobBySlug, getJobs } from '../../../lib/data';

export const dynamic = 'force-dynamic';

export default async function JobDetailPage({ params }) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);
  if (!job) notFound();

  const others = (await getJobs()).filter((j) => j.slug !== job.slug).slice(0, 4);
  const mailHref = `mailto:careers@sushmitenergy.com?subject=${encodeURIComponent(`Application for ${job.title}`)}&body=${encodeURIComponent(`Hi Sushmit Energy team,

I would like to apply for the position of ${job.title}.

[Attach your CV and cover letter and press send]

Full Name:
Phone:
Email:`)}`;

  return (
    <>
      <Header />
      <main>
        <PageHero title="Current Vacancies" subtitle="Join the Sushmit Energy team and power Nepal's future" backLink={{ href: '/current-vacancies', label: 'All Vacancies' }} />

        <section className="section-padding">
          <div className="container job-detail-layout">
            <article className="job-detail-main">
              <div className="job-detail-header">
                <div>
                  <span className="job-type">{job.type}</span>
                  <h1 className="job-title">{job.title}</h1>
                  <div className="job-meta">
                    {job.department && (
                      <span><Briefcase size={15} /> {job.department}</span>
                    )}
                    {job.location && (
                      <span><MapPin size={15} /> {job.location}</span>
                    )}
                    {job.deadline && (
                      <span><Clock size={15} /> Apply by: {job.deadline}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="job-section">
                <h2>Job Description</h2>
                <p className="job-description">{job.description}</p>
              </div>

              <div className="job-section">
                <h2>Requirements</h2>
                <ul className="job-requirements">
                  {job.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="job-apply">
                <h2>Ready to Apply?</h2>
                <p>
                  Send your CV and cover letter to{' '}
                  <a href="mailto:careers@sushmitenergy.com" className="email-link">careers@sushmitenergy.com</a>.
                  Please mention the position title in the subject line.
                </p>
                <a href={mailHref} className="btn btn-primary btn-lg">
                  Apply Now <ArrowUpRight size={18} />
                </a>
              </div>
            </article>

            <aside className="job-sidebar">
              <div className="job-sidebar-card">
                <h3>Other Open Positions</h3>
                <ul className="other-jobs">
                  {others.length ? others.map((o) => (
                    <li key={o.slug}>
                      <Link href={`/current-vacancies/${o.slug}`}>
                        <span className="other-job-title">{o.title}</span>
                        <span className="other-job-loc">{o.department && `${o.department} · `}{o.location}</span>
                      </Link>
                    </li>
                  )) : (
                    <li className="no-jobs">No other openings right now.</li>
                  )}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .job-detail-layout { display: grid; grid-template-columns: minmax(0,1fr) 320px; gap: 48px; align-items: start; max-width: 1100px; }
        .job-detail-main { background: var(--bg-white); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 40px; }
        .job-detail-header { margin-bottom: 28px; }
        .job-type { display:inline-block; background: var(--primary-green); color:#fff; padding:5px 16px; border-radius:20px; font-size:.78rem; font-weight:600; text-transform:uppercase; letter-spacing:.5px; margin-bottom:14px; }
        .job-title { font-size: 1.9rem; font-weight: 800; letter-spacing:-.02em; margin-bottom: 14px; line-height:1.2; }
        .job-meta { display:flex; flex-wrap:wrap; gap:18px; }
        .job-meta span { display:inline-flex; align-items:center; gap:7px; font-size:.88rem; color:var(--text-muted); }
        .job-meta svg { color: var(--primary-green); }
        .job-section { margin-bottom:28px; }
        .job-section h2 { font-size:1.25rem; font-weight:700; margin-bottom:12px; letter-spacing:-.01em; }
        .job-description { font-size:.98rem; line-height:1.8; color:var(--text-dark); }
        .job-requirements { list-style:none; margin:0; }
        .job-requirements li { position:relative; padding-left:22px; font-size:.95rem; line-height:1.7; color:var(--text-muted); margin-bottom:10px; }
        .job-requirements li::before { content:''; position:absolute; left:2px; top:9px; width:8px; height:8px; border-radius:50%; background:var(--primary-green); }
        .job-apply { background: var(--bg-light); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:24px; }
        .job-apply h2 { margin-top:0; }
        .job-apply p { font-size:.92rem; color:var(--text-muted); line-height:1.7; margin-bottom:18px; }
        .email-link { color:var(--primary-blue); font-weight:600; }
        .btn-lg { padding:14px 28px; font-size:1rem; }
        .job-sidebar { position:sticky; top:24px; }
        .job-sidebar-card { background:var(--bg-white); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:24px; }
        .job-sidebar-card h3 { font-size:1rem; font-weight:700; margin-bottom:16px; padding-bottom:14px; border-bottom:1px solid var(--border-color); }
        .other-jobs { list-style:none; display:flex; flex-direction:column; gap:6px; }
        .other-jobs a { display:flex; flex-direction:column; gap:4px; padding:10px 12px; border-radius:var(--radius-sm); transition:background .2s; }
        .other-jobs a:hover { background: var(--bg-light); }
        .other-job-title { font-size:.9rem; font-weight:600; color:var(--text-dark); }
        .other-jobs a:hover .other-job-title { color:var(--primary-blue); }
        .other-job-loc { font-size:.78rem; color:var(--text-muted); }
        .no-jobs { font-size:.88rem; color:var(--text-muted); }
        @media (max-width: 1024px) { .job-detail-layout { grid-template-columns:1fr; } .job-sidebar { position:static; } }
        @media (max-width: 640px) { .job-detail-main { padding:24px; } .job-title { font-size:1.5rem; } }
      `}</style>
    </>
  );
}