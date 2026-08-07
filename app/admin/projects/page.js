'use client';

import { useState } from 'react';
import { Plus, PencilSimple, Trash, ArrowSquareOut, Image, CircleNotch } from '@phosphor-icons/react/dist/ssr';
import AdminModal from '@/components/AdminModal';
import useCollection from '@/components/useCollection';
import UploadButton from '@/components/UploadButton';
import RichTextEditor from '@/components/RichTextEditor';
import StaticPageEditor from '@/components/StaticPageEditor';

const statusColors = {
  'Operational': '#0f8a43',
  'Under Development': '#0b6e35',
  'Commissioned': '#0c50a0',
  'Ongoing': '#0f8a43',
};

const projectStatuses = ['Under Development', 'Commissioned', 'Ongoing', 'Operational'];

const emptyForm = {
  name: '', subtitle: '', capacity: '', location: '', status: 'Under Development',
  startDate: '', type: 'Run-of-River', river: '', annualEnergy: '',
  overview: '', features: '', image: '', slug: '', published: true,
};

export default function ProjectsPage() {
  const { items: projects, loading, error, createItem, updateItem, deleteItem } = useCollection('/api/admin/projects');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name || '', subtitle: p.subtitle || '', capacity: p.capacity || '', location: p.location || '',
      status: p.status || 'Under Development', startDate: p.startDate || '', type: p.type || 'Run-of-River',
      river: p.river || '', annualEnergy: p.annualEnergy || '', overview: p.overview || '',
      features: (p.features || []).join('\n'), image: p.image || '', slug: p.slug || '', published: p.published !== false,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const handleDelete = async (p) => {
    if (!window.confirm(`Delete project "${p.name}"?`)) return;
    try {
      await deleteItem(p._id);
    } catch (err) {
      window.alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitting(true);
    setFormError(null);
    const slug = form.slug || form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const features = form.features.split('\n').filter(f => f.trim());
    const payload = { ...form, slug, features };
    try {
      if (editingId) await updateItem(editingId, payload);
      else await createItem(payload);
      setModalOpen(false);
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
        description="These appear at the top of the public projects page."
        previewUrl="/projects/"
        slug="projects"
        fields={[
          { key: 'title', label: 'Page Title', type: 'text', placeholder: 'Our Projects' },
          { key: 'subtitle', label: 'Page Subtitle', type: 'text', placeholder: 'Developing 93+ MW of sustainable hydropower across Nepal' },
        ]}
      />
      <div className="spacer" />

      <div className="page-header">
        <div>
          <h1>Projects</h1>
          <p>Manage hydropower project details</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add Project</button>
      </div>

      <div className="table-wrapper">
        {loading ? (
          <div className="proj-loading"><CircleNotch size={20} className="spin" /> Loading projects...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Project Name</th>
                <th>Capacity</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id}>
                  <td>
                    <div className="td-thumb">
                      {p.image ? <img src={p.image} alt={p.name} /> : <Image size={18} />}
                    </div>
                  </td>
                  <td><div className="td-name">{p.name}</div></td>
                  <td>{p.capacity} MW</td>
                  <td>{p.location?.split(',')[0]}</td>
                  <td>
                    <span className="status-badge" style={{ background: (statusColors[p.status] || '#6b7280') + '18', color: statusColors[p.status] || '#6b7280' }}>
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <div className="td-actions">
                      {p.slug && <a href={`/${p.slug}`} target="_blank" className="icon-btn" title="View on site"><ArrowSquareOut size={16} /></a>}
                      <button className="icon-btn" title="Edit" onClick={() => openEdit(p)}><PencilSimple size={16} /></button>
                      <button className="icon-btn delete" title="Delete" onClick={() => handleDelete(p)}><Trash size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && projects.length === 0 && <div className="empty-state"><p>No projects found.</p></div>}
        {error && !loading && <div className="proj-error">{error}</div>}
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Project' : 'Add Project'} size="large">
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Project Name</label>
            <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Myagdi Khola Hydropower Project" required />
          </div>
          <div className="form-group">
            <label>Subtitle / Tagline</label>
            <input className="form-input" value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} placeholder="e.g. 57.3 MW run-of-river hydropower project in Myagdi District" />
          </div>
          <div className="row-fields">
            <div className="form-group">
              <label>Capacity (MW)</label>
              <input className="form-input" value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} placeholder="e.g. 57.3" />
            </div>
            <div className="form-group">
              <label>Annual Energy (GWh)</label>
              <input className="form-input" value={form.annualEnergy} onChange={e => setForm({ ...form, annualEnergy: e.target.value })} placeholder="e.g. ~300" />
            </div>
          </div>
          <div className="row-fields">
            <div className="form-group">
              <label>Location</label>
              <input className="form-input" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Myagdi District, Gandaki Province" />
            </div>
            <div className="form-group">
              <label>River</label>
              <input className="form-input" value={form.river} onChange={e => setForm({ ...form, river: e.target.value })} placeholder="e.g. Myagdi Khola" />
            </div>
          </div>
          <div className="row-fields">
            <div className="form-group">
              <label>Status</label>
              <select className="form-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                {projectStatuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Start Date / Commissioned Year</label>
              <input className="form-input" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} placeholder="e.g. 2024" />
            </div>
          </div>
          <div className="row-fields">
            <div className="form-group">
              <label>Type</label>
              <input className="form-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} placeholder="e.g. Run-of-River" />
            </div>
            <div className="form-group">
              <label>URL Slug</label>
              <input className="form-input" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="Auto-generated if empty" />
            </div>
          </div>
          <div className="form-group">
            <label>Cover Image URL</label>
            <div className="image-input-row">
              <input className="form-input" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
              <UploadButton onUploaded={(url) => setForm({ ...form, image: url })} accept="image/*" label="Upload" />
              {form.image && (
                <div className="image-preview-sm">
                  <img src={form.image} alt="preview" onError={(e) => { e.target.style.display = 'none' }} />
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
            <textarea className="form-textarea" rows={4} value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} placeholder={'Run-of-river design minimizing environmental impact\nAnnual energy generation of approximately 300 GWh\nState-of-the-art turbine and generator technology'} />
          </div>
          <div className="form-group">
            <label className="checkbox-label">
              <input type="checkbox" checked={!!form.published} onChange={e => setForm({ ...form, published: e.target.checked })} />
              <span>Published (visible on the public site)</span>
            </label>
          </div>
          {formError && <div className="proj-form-error">{formError}</div>}
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? <CircleNotch size={18} className="spin" /> : null} {editingId ? 'Update Project' : 'Create Project'}</button>
          </div>
        </form>
      </AdminModal>

      <style>{`
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .page-header h1 { font-size: 1.5rem; font-weight: 700; }
        .page-header p { color: var(--text-muted); font-size: 0.9rem; margin-top: 2px; }
        .table-wrapper { background: var(--bg-white); border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden; }
        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th { text-align: left; padding: 14px 20px; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid var(--border-color); background: var(--bg-light); }
        .data-table td { padding: 14px 20px; font-size: 0.9rem; border-bottom: 1px solid var(--border-color); }
        .data-table tr:last-child td { border-bottom: none; }
        .td-thumb { width: 48px; height: 48px; border-radius: 8px; overflow: hidden; background: var(--bg-light); display: flex; align-items: center; justify-content: center; color: var(--text-light); }
        .td-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .td-name { font-weight: 600; }
        .status-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 500; }
        .td-actions { display: flex; gap: 6px; }
        .icon-btn { width: 34px; height: 34px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-white); color: var(--text-muted); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .icon-btn:hover { border-color: var(--primary-blue); color: var(--primary-blue); }
        .icon-btn.delete:hover { border-color: #ef4444; color: #ef4444; }
        .proj-loading { display: flex; align-items: center; gap: 10px; padding: 50px 20px; color: var(--text-muted); justify-content: center; }
        .proj-error { padding: 20px; color: #dc2626; text-align: center; }
        .proj-form-error { padding: 10px 14px; background: #fee2e2; color: #dc2626; border-radius: var(--radius-sm); font-size: 0.85rem; }
        .empty-state { text-align: center; padding: 60px 20px; background: var(--bg-white); border: 1px dashed var(--border-color); border-radius: var(--radius-md); color: var(--text-muted); }
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
        .image-preview-sm { width: 48px; height: 48px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-color); flex-shrink: 0; }
        .image-preview-sm img { width: 100%; height: 100%; object-fit: cover; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; padding-top: 8px; }
        .section-heading h2 { font-size: 1.5rem; font-weight: 700; margin-bottom: 16px; }
        .spacer { height: 36px; }
        .checkbox-label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.9rem; }
        .checkbox-label input { width: 16px; height: 16px; accent-color: var(--primary-blue); }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) { .row-fields { grid-template-columns: 1fr; } .page-header { flex-direction: column; gap: 12px; } }
      `}</style>
    </>
  );
}
