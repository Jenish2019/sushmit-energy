'use client';

import { useEffect, useState } from 'react';
import { FloppyDisk, User, ShieldCheck, Bell, Image, CircleNotch, Check } from '@phosphor-icons/react/dist/ssr';
import UploadButton from '@/components/UploadButton';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Sushmit Energy',
    siteEmail: '',
    sitePhone: '',
    address: '',
    pageHeroImage: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch('/api/admin/settings', { cache: 'no-store' });
        const json = await res.json();
        if (!active) return;
        if (json.success && json.data) setSettings({ ...settings, ...json.data });
      } catch (e) {
        if (active) setError(e.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
        cache: 'no-store',
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'FloppyDisk failed');
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'security', label: 'Security', icon: ShieldCheck },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'media', label: 'Media', icon: Image },
  ];

  const [activeTab, setActiveTab] = useState('general');

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Gear</h1>
          <p>Manage site configuration & preferences</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? <CircleNotch size={18} className="spin" /> : <FloppyDisk size={18} />}
          {saved ? 'Saved!' : 'FloppyDisk Changes'}
        </button>
      </div>

      <div className="settings-layout">
        <div className="settings-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="settings-panel">
          {loading ? (
            <div className="settings-loading"><CircleNotch size={20} className="spin" /> Loading...</div>
          ) : (
            <>
              {activeTab === 'general' && (
                <div className="form-card">
                  <div className="form-section">
                    <h3>Site Name</h3>
                    <input className="form-input" value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} />
                  </div>
                  <div className="form-section">
                    <h3>Contact Email</h3>
                    <input className="form-input" value={settings.siteEmail || ''} onChange={(e) => setSettings({ ...settings, siteEmail: e.target.value })} />
                  </div>
                  <div className="form-section">
                    <h3>Contact Phone</h3>
                    <input className="form-input" value={settings.sitePhone || ''} onChange={(e) => setSettings({ ...settings, sitePhone: e.target.value })} />
                  </div>
                  <div className="form-section">
                    <h3>Address</h3>
                    <input className="form-input" value={settings.address || ''} onChange={(e) => setSettings({ ...settings, address: e.target.value })} />
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="form-card">
                  <div className="form-section">
                    <h3>Change Password</h3>
                    <input className="form-input" type="password" placeholder="Current password" />
                    <input className="form-input" type="password" placeholder="New password" style={{ marginTop: 10 }} />
                    <input className="form-input" type="password" placeholder="Confirm new password" style={{ marginTop: 10 }} />
                    <button className="btn btn-primary" style={{ marginTop: 16 }}>Update Password</button>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="form-card">
                  <p style={{ color: 'var(--text-muted)' }}>Notification settings coming soon.</p>
                </div>
              )}

              {activeTab === 'media' && (
                <div className="form-card">
                  <div className="form-section">
                    <h3>Page Header Background Image</h3>
                    <p className="field-note">This image appears behind the page title on every page header. If empty, the default gradient is used.</p>
                    <div className="image-input-row">
                      <input className="form-input" value={settings.pageHeroImage || ''} onChange={(e) => setSettings({ ...settings, pageHeroImage: e.target.value })} placeholder="https://..." />
                      <UploadButton onUploaded={(url) => setSettings({ ...settings, pageHeroImage: url })} accept="image/*" label="Upload" />
                    </div>
                    {settings.pageHeroImage && (
                      <div className="hero-preview">
                        <img
                          src={settings.pageHeroImage}
                          alt="Page header preview"
                          onError={(e) => { e.target.style.display = 'none' }}
                        />
                        {settings.pageHeroImage && (
                          <button type="button" className="hero-preview-clear" onClick={() => setSettings({ ...settings, pageHeroImage: '' })} title="Remove image">
                            <Check size={14} /> Clear
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
          {error && <div className="settings-error">{error}</div>}
          {saved && <div className="toast-success">Gear saved successfully</div>}
        </div>
      </div>

      <style>{`
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .page-header h1 { font-size: 1.5rem; font-weight: 700; }
        .page-header p { color: var(--text-muted); font-size: 0.9rem; margin-top: 2px; }
        .settings-layout { display: flex; gap: 24px; align-items: flex-start; }
        .settings-tabs { display: flex; flex-direction: column; gap: 6px; width: 200px; flex-shrink: 0; }
        .tab-btn { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); background: var(--bg-white); color: var(--text-muted); cursor: pointer; font-size: 0.9rem; font-family: inherit; transition: all 0.2s; text-align: left; }
        .tab-btn:hover { border-color: var(--primary-blue); color: var(--primary-blue); }
        .tab-btn.active { border-color: var(--primary-blue); background: #e8f0fe; color: var(--primary-blue); font-weight: 600; }
        .settings-panel { flex: 1; max-width: 600px; }
        .settings-loading { display: flex; align-items: center; gap: 10px; padding: 40px; color: var(--text-muted); }
        .settings-error { padding: 12px 20px; background: #fee2e2; color: #dc2626; border-radius: var(--radius-sm); font-size: 0.9rem; margin-top: 16px; }
        .form-card { background: var(--bg-white); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 32px; display: flex; flex-direction: column; gap: 20px; }
        .form-section h3 { font-size: 0.9rem; font-weight: 600; margin-bottom: 6px; color: var(--text-dark); }
        .field-note { font-size: 0.82rem; color: var(--text-muted); margin-bottom: 10px; }
        .image-input-row { display: flex; gap: 10px; align-items: flex-start; }
        .image-input-row .form-input { flex: 1; }
        .hero-preview { margin-top: 12px; position: relative; border: 1px solid var(--border-color); border-radius: var(--radius-sm); overflow: hidden; }
        .hero-preview img { width: 100%; max-height: 220px; object-fit: cover; display: block; }
        .hero-preview-clear { position: absolute; top: 10px; right: 10px; display: inline-flex; align-items: center; gap: 5px; padding: 6px 10px; border: none; border-radius: var(--radius-sm); background: rgba(220,38,38,.92); color: #fff; font-size: 0.78rem; font-weight: 600; cursor: pointer; }
        .form-input { width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.9rem; font-family: inherit; outline: none; transition: border-color 0.2s; }
        .form-input:focus { border-color: var(--primary-blue); box-shadow: 0 0 0 3px rgba(12,80,160,0.1); }
        .toast-success { padding: 12px 20px; background: #e6f7ee; color: var(--primary-green); border-radius: var(--radius-sm); font-size: 0.9rem; font-weight: 500; text-align: center; }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .settings-layout { flex-direction: column; }
          .settings-tabs { width: 100%; flex-direction: row; overflow-x: auto; }
          .tab-btn { white-space: nowrap; }
          .page-header { flex-direction: column; gap: 12px; }
        }
      `}</style>
    </>
  );
}
