'use client';

import { useEffect, useState } from 'react';
import { FloppyDisk, Eye, CircleNotch, Plus, X } from '@phosphor-icons/react/dist/ssr';
import UploadButton from '@/components/UploadButton';
import RichTextEditor from '@/components/RichTextEditor';

const toHtml = (v) =>
  Array.isArray(v) ? v.map((p) => `<p>${p}</p>`).join('') : typeof v === 'string' ? v : '';

export default function StaticPageEditor({ title, description, fields, previewUrl, slug, compact = false }) {
  const [data, setData] = useState(() =>
    fields.reduce((acc, f) => ({ ...acc, [f.key]: f.initial ?? (f.type === 'list' ? [] : '') }), {})
  );
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
          setData((prev) => ({ ...prev, ...json.data }));
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
      if (!json.success) throw new Error(json.error || 'Save failed');
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

  const addListItem = (key, itemFields) => {
    const blank = {};
    itemFields.forEach(sf => { blank[sf.key] = ''; });
    update(key, [...(data[key] || []), blank]);
  };

  const updateListItem = (key, index, sf, value) => {
    const next = [...(data[key] || [])];
    next[index] = { ...next[index], [sf]: value };
    update(key, next);
  };

  const removeListItem = (key, index) => {
    update(key, (data[key] || []).filter((_, j) => j !== index));
  };

  const renderField = (f) => {
    if (f.type === 'textarea') {
      return (
        <textarea className="spe-input spe-textarea" rows={f.rows || 4} value={data[f.key] || ''} onChange={e => update(f.key, e.target.value)} placeholder={f.placeholder} />
      );
    }
    if (f.type === 'image') {
      return (
        <div className="spe-image-row">
          <input className="spe-input" value={data[f.key] || ''} onChange={e => update(f.key, e.target.value)} placeholder={f.placeholder} />
          <UploadButton onUploaded={(url) => update(f.key, url)} accept="image/*" label="Upload" />
          {data[f.key] && (
            <div className="spe-image-preview">
              <img src={data[f.key]} alt="preview" onError={e => { e.target.style.display = 'none' }} />
            </div>
          )}
        </div>
      );
    }
    if (f.type === 'richtext') {
      return (
        <RichTextEditor
          value={toHtml(data[f.key])}
          onChange={(html) => update(f.key, html)}
          placeholder={f.placeholder}
          style={{ maxWidth: '100%' }}
        />
      );
    }
    if (f.type === 'list') {
      const items = data[f.key] || [];
      return (
        <div className="spe-list">
          {items.map((item, i) => (
            <div key={i} className="spe-list-row">
              {f.itemFields.map((sf) => (
                <input
                  key={sf.key}
                  className="spe-input"
                  placeholder={sf.placeholder || sf.label}
                  value={item[sf.key] || ''}
                  onChange={e => updateListItem(f.key, i, sf.key, e.target.value)}
                />
              ))}
              <button type="button" className="spe-list-remove" title="Remove" onClick={() => removeListItem(f.key, i)}>
                <X size={16} />
              </button>
            </div>
          ))}
          <button type="button" className="spe-list-add" onClick={() => addListItem(f.key, f.itemFields)}>
            <Plus size={16} /> Add {f.singular || 'Item'}
          </button>
        </div>
      );
    }
    return (
      <input className="spe-input" value={data[f.key] || ''} onChange={e => update(f.key, e.target.value)} placeholder={f.placeholder} />
    );
  };

  return (
    <>
      <div className={compact ? 'spe-compact-header' : 'spe-header'}>
        <div>
          {compact ? <h3 className="spe-compact-title">{title}</h3> : <h1>{title}</h1>}
          {description && <p>{description}</p>}
        </div>
        <div className="spe-actions">
          {previewUrl && (
            <button className="btn btn-outline" onClick={() => window.open(previewUrl, '_blank')}>
              <Eye size={18} /> Preview
            </button>
          )}
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
            {saving ? <CircleNotch size={18} className="spin" /> : <FloppyDisk size={18} />} {saved ? 'Saved!' : 'Save Changes'}
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
                {renderField(f)}
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
        .spe-compact-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid var(--border-color); }
        .spe-compact-title { font-size: 1.05rem; font-weight: 700; }
        .spe-compact-header p { color: var(--text-muted); font-size: 0.85rem; margin-top: 2px; }
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
        .spe-list { display: flex; flex-direction: column; gap: 10px; }
        .spe-list-row { display: flex; gap: 10px; align-items: center; }
        .spe-list-row .spe-input { flex: 1; }
        .spe-list-remove { width: 36px; height: 36px; flex-shrink: 0; border: 1px solid var(--border-color); border-radius: var(--radius-sm); background: var(--bg-white); color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .spe-list-remove:hover { border-color: #ef4444; color: #ef4444; }
        .spe-list-add { display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; padding: 8px 14px; border: 1px dashed var(--border-color); border-radius: var(--radius-sm); background: transparent; color: var(--text-muted); cursor: pointer; font-size: 0.85rem; font-weight: 500; }
        .spe-list-add:hover { border-color: var(--primary-blue); color: var(--primary-blue); }
        .spe-toast { padding: 12px 20px; background: #e6f7ee; color: var(--primary-green); border-radius: var(--radius-sm); font-size: 0.9rem; font-weight: 500; text-align: center; }
        .spe-error { padding: 12px 20px; background: #fee2e2; color: #dc2626; border-radius: var(--radius-sm); font-size: 0.9rem; font-weight: 500; }
        .spe-loading { display: flex; align-items: center; gap: 10px; color: var(--text-muted); padding: 20px 0; }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) { .spe-header, .spe-compact-header { flex-direction: column; gap: 12px; align-items: flex-start; } .spe-card { padding: 20px; } .spe-list-row { flex-direction: column; align-items: stretch; } }
      `}</style>
    </>
  );
}
