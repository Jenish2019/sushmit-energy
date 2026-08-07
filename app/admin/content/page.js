'use client';

import Link from 'next/link';
import { Image, Globe, FolderOpen, Newspaper, NotePencil } from '@phosphor-icons/react/dist/ssr';

const sections = [
  { href: '/admin/content/about', label: 'About Us', icon: FileTextIcon, desc: 'Company profile, mission, vision & objectives', count: '1 page' },
  { href: '/admin/content/services', label: 'Services', icon: Globe, desc: 'Service offerings & descriptions', count: '0 items' },
  { href: '/admin/projects', label: 'Projects', icon: FolderOpen, desc: 'Hydropower project details & status', count: '3 items' },
  { href: '/admin/content/news', label: 'News & Press', icon: Newspaper, desc: 'Press releases, news articles & updates', count: '0 items' },
  { href: '/admin/gallery', label: 'Gallery', icon: Image, desc: 'Photo albums & media gallery management', count: '0 items' },
];

function FileTextIcon({ size }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
}

export default function ContentPage() {
  return (
    <>
      <div className="page-header">
        <h1>Content Management</h1>
        <p>Manage all website content from one place</p>
      </div>

      <div className="sections-grid">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="section-card">
            <div className="section-card-icon">
              <section.icon size={28} />
            </div>
            <div className="section-card-body">
              <h3>{section.label}</h3>
              <p>{section.desc}</p>
            </div>
            <div className="section-card-footer">
              <span className="count-badge">{section.count}</span>
              <span className="manage-link">Manage &rarr;</span>
            </div>
          </Link>
        ))}
      </div>

      <style>{`
        .page-header {
          margin-bottom: 32px;
        }
        .page-header h1 {
          font-size: 1.75rem;
          font-weight: 700;
        }
        .page-header p {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-top: 4px;
        }
        .sections-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .section-card {
          background: var(--bg-white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: all 0.2s;
        }
        .section-card:hover {
          border-color: var(--primary-blue);
          box-shadow: var(--shadow-md);
          transform: translateY(-2px);
        }
        .section-card-icon {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--primary-blue), var(--primary-blue-dark));
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .section-card-body h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .section-card-body p {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .section-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid var(--border-color);
        }
        .count-badge {
          font-size: 0.8rem;
          color: var(--text-muted);
          background: var(--bg-light);
          padding: 4px 10px;
          border-radius: 20px;
        }
        .manage-link {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--primary-blue);
        }
        @media (max-width: 1024px) {
          .sections-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .sections-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
