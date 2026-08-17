'use client';

import { useEffect, useState } from 'react';
import { CircleNotch, Image } from '@phosphor-icons/react/dist/ssr';
import useCollection from '@/components/useCollection';
import UploadButton from '@/components/UploadButton';
import RichTextEditor from '@/components/RichTextEditor';
import StaticPageEditor from '@/components/StaticPageEditor';
import { DEFAULTS } from '@/lib/defaults';

const defaultProject = DEFAULTS.projects[0] || {};

export default function ProjectsPage() {
  const { items, loading, createItem, updateItem } = useCollection('/api/admin/projects');
  const [saved, setSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const [form, setForm] = useState(() => ({
    name: defaultProject.name || '',
    subtitle: defaultProject.subtitle || '',
    type: defaultProject.type || 'Run-of-River',
    river: defaultProject.river || '',
    specs: (defaultProject.specs || []).map((s) => ({ label: s.label || '', value: s.value || '' })),
    overview: defaultProject.overview || '',
    features: (defaultProject.features || []).join('\n'),
    image: defaultProject.image || '',
  }));

  useEffect(() => {
    if (!items.length) return;
    const p = items[0];
    setForm({
      name: p.name || '',
      subtitle: p.subtitle || '',
      type: p.type || 'Run-of-River',
      river: p.river || '',
      specs: (p.specs || []).map((s) => ({ label: s.label || '', value: s.value || '' })),
      overview: p.overview || '',
      features: (p.features || []).join('\n'),
      image: p.image || '',
    });
  }, [items.length]);

  const updateSpec = (index, key, value) => {
    const specs = form.specs.map((s, i) => (i === index ? { ...s, [key]: value } : s));
    setForm({ ...form, specs });
  };

  const addSpec = () => setForm({ ...form, specs: [...form.specs, { label: '', value: '' }] });

  const removeSpec = (index) => setForm({ ...form, specs: form.specs.filter((_, i) => i !== index) });

  const handleSave = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitting(true);
    setFormError(null);
    const features = form.features.split('\n').filter((f) => f.trim());
    const specs = form.specs.filter((s) => s.label.trim() || s.value.trim());
    const payload = { ...form, features, specs, slug: defaultProject.slug || 'kunaban-khola-hydropower-project', published: true };
    try {
      if (items[0]?._id) await updateItem(items[0]._id, payload);
      else await createItem(payload);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="section-heading"><h2>Page Header</h2></div>
      <StaticPageEditor
        compact
        title="Hero Title & Subtitle"
        description="These appear at the top of the public Our Project page."
        previewUrl="/projects/"
        slug="projects"
        fields={[
          { key: 'title', label: 'Page Title', type: 'text', placeholder: 'Our Project' },
          { key: 'subtitle', label: 'Page Subtitle', type: 'text', placeholder: 'Kunaban Khola Hydropower Project — 20 MW' },
        ]}
      />
      <div className="spacer" />

      <div className="page-header">
        <div>
          <h1>Our Project</h1>
          <p>Edit the single Kunaban Khola Hydropower Project details shown on the public site.</p>
        </div>
      </div>

      <div className="edit-card">
        {loading ? (
          <div className="proj-loading"><CircleNotch size={20} className="spin" /> Loading project...</div>
        ) : (
          <form onSubmit={handleSave} className="modal-form">
            <div className="form-group">
              <label>Project Name</label>
              <input className="form-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Subtitle / Tagline</label>
              <input className="form-input" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
            </div>
            <div className="row-fields">
              <div className="form-group">
                <label>River</label>
                <input className="form-input" value={form.river} onChange={(e) => setForm({ ...form, river: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Type</label>
                <input className="form-input" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label>Stats / Specifications</label>
              <div className="specs-editor">
                {form.specs.map((s, i) => (
                  <div className="specs-row" key={i}>
                    <input
                      className="form-input"
                      placeholder="Label"
                      value={s.label}
                      onChange={(e) => updateSpec(i, 'label', e.target.value)}
                    />
                    <input
                      className="form-input"
                      placeholder="Value"
                      value={s.value}
                      onChange={(e) => updateSpec(i, 'value', e.target.value)}
                    />
                    <button type="button" className="specs-remove" title="Remove row" onClick={() => removeSpec(i)}>×</button>
                  </div>
                ))}
                <button type="button" className="btn btn-ghost specs-add" onClick={addSpec}>+ Add row</button>
              </div>
            </div>
            <div className="form-group">
              <label>Cover Image URL</label>
              <div className="image-input-row">
                <input className="form-input" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
                <UploadButton onUploaded={(url) => setForm({ ...form, image: url })} accept="image/*" label="Upload" />
                {form.image && (
                  <div className="image-preview-sm">
                    {form.image ? <img src={form.image} alt="preview" onError={(e) => { e.target.style.display = 'none' }} /> : <Image size={18} />}
                  </div>
                )}
              </div>
            </div>
            <div className="form-group">
              <label>Project Overview</label>
              <RichTextEditor value={form.overview} onChange={(html) => setForm({ ...form, overview: html })} placeholder="Write the project overview / description..." />
            </div>
            <div className="form-group">
              <label>Key Features <span className="field-hint">(one per line)</span></label>
              <textarea className="form-textarea" rows={6} value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} placeholder={'Run-of-river design with a minimal ecological footprint\nApproximately 130 GWh of clean energy generated annually'} />
            </div>
            {formError && <div className="proj-form-error">{formError}</div>}
            <div className="modal-actions">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? <CircleNotch size={18} className="spin" /> : null} Save Project
              </button>
              {saved && <div className="toast-success">Project saved successfully</div>}
            </div>
          </form>
        )}
      </div>

      <style>{`
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .page-header h1 { font-size: 1.5rem; font-weight: 700; }
        .page-header p { color: var(--text-muted); font-size: 0.9rem; margin-top: 2px; max-width: 560px; }
        .edit-card { background: var(--bg-white); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 32px; max-width: 900px; }
        .modal-form { display: flex; flex-direction: column; gap: 16px; }
        .row-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 5px; }
        .form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-dark); }
        .field-hint { font-weight: 400; color: var(--text-light); font-size: 0.8rem; }
        .form-input { width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.9rem; font-family: inherit; outline: none; transition: border-color 0.2s; }
        .form-input:focus { border-color: var(--primary-blue); box-shadow: 0 0 0 3px rgba(12,80,160,0.1); }
        .form-textarea { width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.9rem; font-family: inherit; outline: none; transition: border-color 0.2s; resize: vertical; line-height: 1.5; }
        .form-textarea:focus { border-color: var(--primary-blue); box-shadow: 0 0 0 3px rgba(12,80,160,0.1); }
        select.form-input { cursor: pointer; }
        .image-input-row { display: flex; gap: 10px; align-items: flex-start; }
        .image-input-row .form-input { flex: 1; }
        .image-preview-sm { width: 48px; height: 48px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-color); flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: var(--text-light); }
        .image-preview-sm img { width: 100%; height: 100%; object-fit: cover; }
        .specs-editor { display: flex; flex-direction: column; gap: 8px; }
        .specs-row { display: grid; grid-template-columns: 1.4fr 1fr 36px; gap: 8px; align-items: center; }
        .specs-remove { width: 36px; height: 36px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); background: transparent; color: #dc2626; font-size: 1.2rem; line-height: 1; cursor: pointer; transition: background 0.2s; }
        .specs-remove:hover { background: #fee2e2; }
        .specs-add { align-self: flex-start; }
        .modal-actions { display: flex; justify-content: flex-end; align-items: center; gap: 10px; padding-top: 8px; }
        .toast-success { padding: 10px 16px; background: #e6f7ee; color: var(--primary-green); border-radius: var(--radius-sm); font-size: 0.85rem; font-weight: 500; }
        .proj-loading { display: flex; align-items: center; gap: 10px; padding: 50px 20px; color: var(--text-muted); justify-content: center; }
        .proj-form-error { padding: 10px 14px; background: #fee2e2; color: #dc2626; border-radius: var(--radius-sm); font-size: 0.85rem; }
        .section-heading h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 16px; }
        .spacer { height: 36px; }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) { .row-fields { grid-template-columns: 1fr; } .specs-row { grid-template-columns: 1fr 1fr 36px; } .page-header { flex-direction: column; gap: 12px; } .edit-card { padding: 20px; } }
      `}</style>
    </>
  );
}