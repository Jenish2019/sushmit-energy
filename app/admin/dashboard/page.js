'use client';

import Link from 'next/link';
import {
  SquaresFour, FolderSimple, Image, Newspaper, FolderOpen,
  Users, TrendUp, ArrowUpRight, NotePencil, Globe
} from '@phosphor-icons/react/dist/ssr';

const stats = [
  { label: 'Content Sections', value: '6', icon: FolderSimple, color: '#0c50a0', bg: '#e8f0fe' },
  { label: 'Published Pages', value: '27', icon: SquaresFour, color: '#0f8a43', bg: '#e6f7ee' },
  { label: 'Media Assets', value: '0', icon: Image, color: '#9333ea', bg: '#f3e8ff' },
  { label: 'Pending Updates', value: '0', icon: NotePencil, color: '#0b6e35', bg: '#e6f7ee' },
];

const quickLinks = [
  { href: '/admin/content/banners', label: 'Manage Banners', icon: Image, desc: 'Update homepage banners & hero sections' },
  { href: '/admin/content/about', label: 'Edit About Page', icon: FileTextIcon, desc: 'Update company vision, mission & objectives' },
  { href: '/admin/content/services', label: 'Manage Services', icon: Globe, desc: 'Edit service offerings & descriptions' },
  { href: '/admin/content/projects', label: 'Manage Projects', icon: FolderOpen, desc: 'Update hydropower project details' },
  { href: '/admin/content/news', label: 'News & Updates', icon: Newspaper, desc: 'Post news articles & press releases' },
  { href: '/admin/content/gallery', label: 'Manage Gallery', icon: Image, desc: 'UploadSimple & organize photo albums' },
];

function FileTextIcon({ size }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
}

export default function AdminDashboard() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to the Sushmit Energy admin panel</p>
        </div>
        <Link href="/" className="view-site-btn">
          <GlobeIcon size={16} />
          View Site
        </Link>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <div className="stat-icon" style={{ background: stat.bg, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="section-heading">
        <h2>Quick Actions</h2>
      </div>

      <div className="quick-links-grid">
        {quickLinks.map((link) => (
          <Link key={link.href} href={link.href} className="quick-link-card">
            <div className="ql-icon">
              <link.icon size={22} />
            </div>
            <div className="ql-info">
              <span className="ql-label">{link.label}</span>
              <span className="ql-desc">{link.desc}</span>
            </div>
            <ArrowUpRight size={18} className="ql-arrow" />
          </Link>
        ))}
      </div>

      <style>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
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
        .view-site-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 10px 18px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-dark);
          font-size: 0.9rem;
          font-weight: 500;
          transition: all 0.2s;
          background: var(--bg-white);
        }
        .view-site-btn:hover {
          border-color: var(--primary-blue);
          color: var(--primary-blue);
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }
        .stat-card {
          background: var(--bg-white);
          border-radius: var(--radius-md);
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1px solid var(--border-color);
          transition: box-shadow 0.2s;
        }
        .stat-card:hover {
          box-shadow: var(--shadow-md);
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .stat-info {
          display: flex;
          flex-direction: column;
        }
        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
        }
        .stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .section-heading {
          margin-bottom: 20px;
        }
        .section-heading h2 {
          font-size: 1.25rem;
          font-weight: 600;
        }
        .quick-links-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .quick-link-card {
          background: var(--bg-white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          transition: all 0.2s;
        }
        .quick-link-card:hover {
          border-color: var(--primary-blue);
          box-shadow: var(--shadow-md);
        }
        .quick-link-card:hover .ql-arrow {
          opacity: 1;
          transform: translateX(2px);
        }
        .ql-icon {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: var(--bg-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-blue);
          flex-shrink: 0;
        }
        .ql-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .ql-label {
          font-weight: 600;
          font-size: 0.95rem;
        }
        .ql-desc {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .ql-arrow {
          color: var(--primary-blue);
          opacity: 0;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .quick-links-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr; }
          .page-header { flex-direction: column; gap: 12px; }
        }
      `}</style>
    </>
  );
}

function GlobeIcon({ size }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
}
