'use client';

import { useEffect, useState } from 'react';
import { FloppyDisk, Eye, CircleNotch } from '@phosphor-icons/react/dist/ssr';
import UploadButton from '@/components/UploadButton';

export default function StaticPageEditor({ title, description, fields, previewUrl, slug }) {
  const [data, setData] = useState(fields.reduce((acc, f) => ({ ...acc, [f.key]: f.initial || '' }), {}));
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(!!slug);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    let active = true;
    (async () => {
      try {
        const res = await fetch(`/api/admin/pages?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' });
        const json = await res.json();
        if (!active) return;
        if (json.success && json.data && json.data._id) {
          setId(json.data._id);
          setData(json.data);
        }
      } catch (e) {
        if (active) setError(e.message);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [slug]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      const body = { ...data, slug };
      const res = await fetch(id ? `/api/admin/pages/${id}` : '/api/admin/pages', {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        cache: 'no-store',
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'FloppyDisk failed');
      if (json.data?._id && !id) setId(json.data._id);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const update = (key, value) => setData(prev => ({ ...prev, [key]: value }));

  return (
    <>
      <div className="spe-header">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="spe-actions">
          {previewUrl && (
            <button className="btn btn-outline" onClick={() => window.open(previewUrl, '_blank')}>
              <Eye size={18} /> Preview
            </button>
          )}
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? <CircleNotch size={18} className="spin" /> : <FloppyDisk size={18} />} {saved ? 'Saved!' : 'FloppyDisk Changes'}
          </button>
        </div>
      </div>

      <div className="spe-card">
        {loading ? (
          <div className="spe-loading"><CircleNotch size={20} className="spin" /> Loading content...</div>
        ) : (
          <>
            {fields.map((f) => (
              <div key={f.key} className="spe-field">
                <label>{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea className="spe-input spe-textarea" rows={f.rows || 4} value={data[f.key] || ''} onChange={e => update(f.key, e.target.value)} placeholder={f.placeholder} />
                ) : f.type === 'image' ? (
                  <div className="spe-image-row">
                    <input className="spe-input" value={data[f.key] || ''} onChange={e => update(f.key, e.target.value)} placeholder={f.placeholder} />
                    <UploadButton onUploaded={(url) => update(f.key, url)} accept="image/*" label="UploadSimple" />
                    {data[f.key] && (
                      <div className="spe-image-preview">
                        <img src={data[f.key]} alt="preview" onError={e => { e.target.style.display = 'none' }} />
                      </div>
                    )}
                  </div>
                ) : f.type === 'richtext' ? (
                  <div className="spe-rte-mini" contentEditable suppressContentEditableWarning onInput={e => update(f.key, e.currentTarget.innerHTML)} dangerouslySetInnerHTML={{ __html: data[f.key] || '' }} />
                ) : (
                  <input className="spe-input" value={data[f.key] || ''} onChange={e => update(f.key, e.target.value)} placeholder={f.placeholder} />
                )}
              </div>
            ))}
            {error && <div className="spe-error">{error}</div>}
            {saved && <div className="spe-toast">Changes saved successfully</div>}
          </>
        )}
      </div>

      <style>{`
        .spe-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .spe-header h1 { font-size: 1.5rem; font-weight: 700; }
        .spe-header p { color: var(--text-muted); font-size: 0.9rem; margin-top: 2px; }
        .spe-actions { display: flex; gap: 10px; }
        .spe-card { background: var(--bg-white); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 32px; display: flex; flex-direction: column; gap: 20px; max-width: 800px; }
        .spe-field { display: flex; flex-direction: column; gap: 6px; }
        .spe-field label { font-size: 0.85rem; font-weight: 600; color: var(--text-dark); }
        .spe-input { width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.9rem; font-family: inherit; outline: none; transition: border-color 0.2s; }
        .spe-input:focus { border-color: var(--primary-blue); box-shadow: 0 0 0 3px rgba(12,80,160,0.1); }
        .spe-textarea { resize: vertical; line-height: 1.6; }
        .spe-image-row { display: flex; gap: 10px; align-items: flex-start; }
        .spe-image-row .spe-input { flex: 1; }
        .spe-image-preview { width: 64px; height: 64px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-color); flex-shrink: 0; }
        .spe-image-preview img { width: 100%; height: 100%; object-fit: cover; }
        .spe-rte-mini { min-height: 120px; padding: 12px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.9rem; line-height: 1.6; outline: none; }
        .spe-rte-mini:focus { border-color: var(--primary-blue); box-shadow: 0 0 0 3px rgba(12,80,160,0.1); }
        .spe-toast { padding: 12px 20px; background: #e6f7ee; color: var(--primary-green); border-radius: var(--radius-sm); font-size: 0.9rem; font-weight: 500; text-align: center; }
        .spe-error { padding: 12px 20px; background: #fee2e2; color: #dc2626; border-radius: var(--radius-sm); font-size: 0.9rem; font-weight: 500; }
        .spe-loading { display: flex; align-items: center; gap: 10px; color: var(--text-muted); padding: 20px 0; }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) { .spe-header { flex-direction: column; gap: 12px; } .spe-card { padding: 20px; } }
      `}</style>
    </>
  );
}
