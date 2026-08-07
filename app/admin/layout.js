'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  SquaresFour, FileText, Users, ChatCircle, Briefcase,
  TrendUp, FolderOpen, Newspaper, Globe, Package, BookOpen,
  Image, Envelope, ShieldCheck, ChartBar, Gear, SignOut, List, X,
  CaretDown, Buildings, GitBranch, NotePencil, HouseSimple
} from '@phosphor-icons/react/dist/ssr';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: SquaresFour },
  { href: '/admin/content/homepage', label: 'Homepage', icon: HouseSimple },
  {
    label: 'Company', icon: Buildings,
    children: [
      { href: '/admin/company/about', label: 'About Us', icon: FileText },
      { href: '/admin/company/org-chart', label: 'Organizational Chart', icon: GitBranch },
      { href: '/admin/company/board', label: 'Board of Directors', icon: Users },
      { href: '/admin/company/chairman', label: "Chairman's Message", icon: ChatCircle },
      { href: '/admin/company/management', label: 'Management Team', icon: Briefcase },
      { href: '/admin/company/investment', label: 'Investment Opportunity', icon: TrendUp },
    ],
  },
  { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
  {
    label: 'Media', icon: Globe,
    children: [
      { href: '/admin/media/press-releases', label: 'Press Releases', icon: Newspaper },
      { href: '/admin/media/news', label: 'Sushmit News', icon: Newspaper },
      { href: '/admin/media/media-kit', label: 'Media Kit', icon: Package },
      { href: '/admin/media/blog', label: 'Blog', icon: NotePencil },
      { href: '/admin/media/publications', label: 'Publications', icon: BookOpen },
    ],
  },
  { href: '/admin/gallery', label: 'Gallery', icon: Image },
  { href: '/admin/contact', label: 'Contact Us', icon: Envelope },
  { href: '/admin/policy', label: 'Policy', icon: ShieldCheck },
  { href: '/admin/reports', label: 'Reports', icon: ChartBar },
  { href: '/admin/jobs', label: 'Job Board', icon: Briefcase },
  { href: '/admin/settings', label: 'Gear', icon: Gear },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [checking, setChecking] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState([
    'Company', 'Media',
  ]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch('/api/admin/auth/me');
        const data = await res.json();
        if (!res.ok || !data.success) {
          router.replace('/login');
          return;
        }
        if (active) setAdmin(data.data);
      } catch {
        router.replace('/login');
      } finally {
        if (active) setChecking(false);
      }
    })();
    return () => { active = false; };
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
    } catch {}
    router.replace('/login');
  };

  if (checking) {
    return <div className="admin-loading">Loading...</div>;
  }

  const toggleMenu = (label) => {
    setExpandedMenus(prev =>
      prev.includes(label) ? prev.filter(m => m !== label) : [...prev, label]
    );
  };

  const isActive = (href) => pathname === href || pathname.startsWith(href + '/');

  const isParentActive = (children) =>
    children.some(c => pathname === c.href || pathname.startsWith(c.href + '/'));

  return (
    <div className="admin-shell">
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          {!collapsed && <span className="sidebar-logo">Sushmit Energy</span>}
          <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <List size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            if (item.children) {
              const open = expandedMenus.includes(item.label);
              return (
                <div key={item.label} className="nav-group">
                  <button
                    className={`nav-link nav-group-toggle ${isParentActive(item.children) ? 'active' : ''}`}
                    onClick={() => toggleMenu(item.label)}
                  >
                    <item.icon size={20} />
                    {!collapsed && <><span>{item.label}</span><CaretDown size={16} className={`chevron ${open ? 'open' : ''}`} /></>}
                  </button>
                  {open && !collapsed && (
                    <div className="nav-submenu">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`nav-link nav-sublink ${isActive(child.href) ? 'active' : ''}`}
                        >
                          <child.icon size={16} />
                          <span>{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
              >
                <item.icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          {admin && (
            <div className="sidebar-admin">
              <span className="sidebar-admin-name">{admin.name || admin.email}</span>
              <span className="sidebar-admin-email">{admin.email}</span>
            </div>
          )}
          <Link href="/" className="nav-link">
            <Globe size={20} />
            {!collapsed && <span>View Site</span>}
          </Link>
          <button className="nav-link logout-btn" onClick={handleLogout}>
            <SignOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-content">
          {children}
        </div>
      </main>

      <style>{`
        .admin-shell { display: flex; min-height: 100vh; }
        .sidebar { width: var(--sidebar-width); background: var(--sidebar-bg); display: flex; flex-direction: column; transition: width 0.3s ease; position: fixed; top: 0; left: 0; height: 100vh; z-index: 100; overflow: hidden; }
        .sidebar.collapsed { width: var(--sidebar-collapsed-width); }
        .sidebar-header { display: flex; align-items: center; justify-content: space-between; padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.08); min-height: 64px; }
        .sidebar-logo { font-size: 1rem; font-weight: 700; color: var(--sidebar-text-active); white-space: nowrap; }
        .sidebar-toggle { background: none; border: none; color: var(--sidebar-text); cursor: pointer; padding: 6px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .sidebar-toggle:hover { color: var(--sidebar-text-active); background: var(--sidebar-hover); }
        .sidebar-nav { flex: 1; overflow-y: auto; padding: 12px 8px; }
        .sidebar-nav::-webkit-scrollbar { width: 4px; }
        .sidebar-nav::-webkit-scrollbar-thumb { background: var(--sidebar-hover); border-radius: 2px; }
        .nav-link { display: flex; align-items: center; gap: 12px; padding: 10px 12px; color: var(--sidebar-text); border-radius: 8px; transition: all 0.2s; font-size: 0.9rem; cursor: pointer; border: none; background: none; width: 100%; text-align: left; white-space: nowrap; }
        .nav-link:hover { background: var(--sidebar-hover); color: var(--sidebar-text-active); }
        .nav-link.active { background: var(--sidebar-active); color: var(--sidebar-text-active); }
        .nav-group-toggle { justify-content: space-between; }
        .nav-group-toggle .chevron { transition: transform 0.2s; margin-left: auto; }
        .nav-group-toggle .chevron.open { transform: rotate(180deg); }
        .nav-submenu { margin-left: 12px; margin-top: 2px; display: flex; flex-direction: column; gap: 2px; }
        .nav-sublink { padding: 8px 12px; font-size: 0.85rem; }
        .sidebar-footer { padding: 12px 8px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; gap: 4px; }
        .sidebar-admin { padding: 8px 12px; border-radius: 8px; background: var(--sidebar-hover); margin-bottom: 4px; overflow: hidden; }
        .sidebar-admin-name { display: block; font-size: 0.85rem; font-weight: 600; color: var(--sidebar-text-active); white-space: nowrap; }
        .sidebar-admin-email { display: block; font-size: 0.75rem; color: var(--sidebar-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .admin-loading { display: flex; align-items: center; justify-content: center; min-height: 100vh; color: var(--text-muted); font-size: 1rem; }
        .logout-btn { color: #ef4444; }
        .logout-btn:hover { background: rgba(239,68,68,0.1) !important; color: #ef4444 !important; }
        .admin-main { margin-left: var(--sidebar-width); flex: 1; min-height: 100vh; background: var(--bg-light); transition: margin-left 0.3s ease; }
        .sidebar.collapsed ~ .admin-main { margin-left: var(--sidebar-collapsed-width); }
        .admin-content { padding: 32px; }
        @media (max-width: 768px) { .sidebar { width: var(--sidebar-collapsed-width); } .sidebar .sidebar-logo, .sidebar .nav-link span, .sidebar .nav-group-toggle span, .sidebar .chevron, .sidebar .nav-submenu { display: none; } .admin-main { margin-left: var(--sidebar-collapsed-width); } }
      `}</style>
    </div>
  );
}
