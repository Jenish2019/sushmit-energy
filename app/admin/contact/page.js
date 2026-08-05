'use client';

import { useEffect, useState } from 'react';
import { FloppyDisk, Eye, Envelope, Phone, MapPin, CircleNotch } from '@phosphor-icons/react/dist/ssr';

export default function AdminContactPage() {
  const [data, setData] = useState({ address: '', phone: '', email: '', mapEmbed: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const update = (k, v) => setData(prev => ({ ...prev, [k]: v }));

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch('/api/admin/contact', { cache: 'no-store' });
        const json = await res.json();
        if (!active) return;
        if (json.success && json.data) setData(json.data);
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
      const res = await fetch('/api/admin/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
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

  return (
    <>
      <div className="page-header">
        <div><h1>Contact Us</h1><p>Manage contact information & map embed</p></div>
        <div className="ha">
          <button className="btn btn-outline" onClick={() => window.open('/contact-us/', '_blank')}><Eye size={18} /> Preview</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? <CircleNotch size={18} className="spin" /> : <FloppyDisk size={18} />} {saved ? 'Saved!' : 'FloppyDisk Changes'}
          </button>
        </div>
      </div>
      {loading ? (
        <div className="contact-loading"><CircleNotch size={20} className="spin" /> Loading...</div>
      ) : (
        <div className="form-card">
          <div className="form-section"><label><MapPin size={16} /> Address</label><input className="form-input" value={data.address || ''} onChange={e => update('address', e.target.value)} /></div>
          <div className="form-section"><label><Phone size={16} /> Phone</label><input className="form-input" value={data.phone || ''} onChange={e => update('phone', e.target.value)} /></div>
          <div className="form-section"><label><Envelope size={16} /> Email</label><input className="form-input" value={data.email || ''} onChange={e => update('email', e.target.value)} /></div>
          <div className="form-section"><label>Google Maps Embed URL</label><input className="form-input" value={data.mapEmbed || ''} onChange={e => update('mapEmbed', e.target.value)} placeholder="<iframe src=..." /></div>
          {error && <div className="contact-error">{error}</div>}
          {saved && <div className="toast">Saved successfully</div>}
        </div>
      )}
      <style>{`
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .page-header h1 { font-size: 1.5rem; font-weight: 700; }
        .page-header p { color: var(--text-muted); font-size: 0.9rem; margin-top: 2px; }
        .ha { display: flex; gap: 10px; }
        .form-card { background: var(--bg-white); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 32px; display: flex; flex-direction: column; gap: 20px; max-width: 600px; }
        .form-section { display: flex; flex-direction: column; gap: 6px; }
        .form-section label { display: flex; align-items: center; gap: 6px; font-size: 0.85rem; font-weight: 600; color: var(--text-dark); }
        .form-section label svg { color: var(--primary-blue); }
        .form-input { padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.9rem; font-family: inherit; outline: none; }
        .form-input:focus { border-color: var(--primary-blue); box-shadow: 0 0 0 3px rgba(12,80,160,0.1); }
        .contact-loading { display: flex; align-items: center; gap: 10px; padding: 40px; color: var(--text-muted); }
        .contact-error { padding: 12px 20px; background: #fee2e2; color: #dc2626; border-radius: var(--radius-sm); font-size: 0.9rem; }
        .toast { padding: 12px 20px; background: #e6f7ee; color: var(--primary-green); border-radius: var(--radius-sm); font-size: 0.9rem; font-weight: 500; text-align: center; }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) { .page-header { flex-direction: column; gap: 12px; } }
      `}</style>
    </>
  );
}
