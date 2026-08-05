'use client';

import { useState } from 'react';
import { Plus, PencilSimple, Trash, DotsSixVertical, CircleNotch, Eye } from '@phosphor-icons/react/dist/ssr';
import AdminModal from '@/components/AdminModal';
import useCollection from '@/components/useCollection';
import UploadButton from '@/components/UploadButton';

const emptyForm = { name: '', title: '', description: '', image: '', order: 0, social: { facebook: '', twitter: '', linkedin: '' } };

export default function MemberManager({ apiPath, title, description, previewUrl, accent = '#0c50a0', showSocial = false }) {
  const { items: members, loading, error, createItem, updateItem, deleteItem } = useCollection(apiPath);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm, order: members.length });
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (m) => {
    setEditingId(m._id);
    setForm({
      name: m.name || '',
      title: m.title || '',
      description: m.description || '',
      image: m.image || '',
      order: m.order || 0,
      social: { facebook: m.social?.facebook || '', twitter: m.social?.twitter || '', linkedin: m.social?.linkedin || '' },
    });
    setFormError(null);
    setModalOpen(true);
  };

  const handleDelete = async (m) => {
    if (!window.confirm(`Delete "${m.name}"?`)) return;
    try {
      await deleteItem(m._id);
    } catch (err) {
      window.alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitting(true);
    setFormError(null);
    const social = {};
    if (form.social?.facebook?.trim()) social.facebook = form.social.facebook.trim();
    if (form.social?.twitter?.trim()) social.twitter = form.social.twitter.trim();
    if (form.social?.linkedin?.trim()) social.linkedin = form.social.linkedin.trim();
    const payload = { ...form, name: form.name.trim(), order: form.order || 0, social };
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
      <div className="page-header">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <div className="header-actions">
          {previewUrl && <button className="btn btn-outline" onClick={() => window.open(previewUrl, '_blank')}><Eye size={18} /> Preview</button>}
          <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add Member</button>
        </div>
      </div>

      {loading ? (
        <div className="mm-loading"><CircleNotch size={20} className="spin" /> Loading members...</div>
      ) : (
        <div className="member-list">
          {members.map((m, idx) => (
            <div key={m._id} className="member-card">
              <div className="member-order"><DotsSixVertical size={18} /><span className="order-num">{idx + 1}</span></div>
              <div className="member-avatar" style={{ background: `linear-gradient(135deg, ${accent}, ${accent}cc)` }}>
                {m.image ? <img src={m.image} alt={m.name} /> : m.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div className="member-info">
                <h3>{m.name}</h3>
                <span className="member-title" style={{ color: accent }}>{m.title}</span>
                <p>{m.description}</p>
              </div>
              <div className="member-actions">
                <button className="icon-btn" title="Edit" onClick={() => openEdit(m)}><PencilSimple size={16} /></button>
                <button className="icon-btn delete" title="Delete" onClick={() => handleDelete(m)}><Trash size={16} /></button>
              </div>
            </div>
          ))}
          {members.length === 0 && <div className="empty-state"><p>No members yet.</p></div>}
        </div>
      )}
      {error && !loading && <div className="mm-error">{error}</div>}

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Member' : 'Add Member'}>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group"><label>Name</label><input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Full name" required /></div>
          <div className="row-fields">
            <div className="form-group"><label>Title / Designation</label><input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Chairperson" /></div>
            <div className="form-group"><label>Display Order</label><input className="form-input" type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} /></div>
          </div>
          <div className="form-group"><label>Photo URL</label><div className="image-row"><input className="form-input" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." /><UploadButton onUploaded={(url) => setForm({ ...form, image: url })} accept="image/*" label="UploadSimple" />{form.image && <div className="image-sm"><img src={form.image} alt="preview" onError={e => e.target.style.display = 'none'} /></div>}</div></div>
          <div className="form-group"><label>Description</label><textarea className="form-textarea" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Brief bio..." /></div>
          {showSocial && (
            <div className="social-fields">
              <label className="social-label">Social Media Links</label>
              <div className="form-group"><label>Facebook URL</label><input className="form-input" value={form.social?.facebook || ''} onChange={e => setForm({ ...form, social: { ...form.social, facebook: e.target.value } })} placeholder="https://facebook.com/..." /></div>
              <div className="form-group"><label>Twitter URL</label><input className="form-input" value={form.social?.twitter || ''} onChange={e => setForm({ ...form, social: { ...form.social, twitter: e.target.value } })} placeholder="https://twitter.com/..." /></div>
              <div className="form-group"><label>LinkedIn URL</label><input className="form-input" value={form.social?.linkedin || ''} onChange={e => setForm({ ...form, social: { ...form.social, linkedin: e.target.value } })} placeholder="https://linkedin.com/in/..." /></div>
            </div>
          )}
          {formError && <div className="mm-form-error">{formError}</div>}
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? <CircleNotch size={18} className="spin" /> : null} {editingId ? 'Update Member' : 'Add Member'}</button>
          </div>
        </form>
      </AdminModal>

      <style>{`
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .page-header h1 { font-size: 1.5rem; font-weight: 700; }
        .page-header p { color: var(--text-muted); font-size: 0.9rem; margin-top: 2px; }
        .header-actions { display: flex; gap: 10px; }
        .member-list { display: flex; flex-direction: column; gap: 12px; }
        .member-card { display: flex; align-items: center; gap: 16px; background: var(--bg-white); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px 20px; }
        .member-card:hover { box-shadow: var(--shadow-sm); }
        .member-order { display: flex; flex-direction: column; align-items: center; gap: 2px; color: var(--text-light); cursor: grab; }
        .order-num { font-size: 0.75rem; font-weight: 600; }
        .member-avatar { width: 44px; height: 44px; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.85rem; flex-shrink: 0; overflow: hidden; }
        .member-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .member-info { flex: 1; min-width: 0; }
        .member-info h3 { font-size: 0.95rem; font-weight: 600; }
        .member-title { font-size: 0.8rem; font-weight: 500; }
        .member-info p { font-size: 0.82rem; color: var(--text-muted); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .member-actions { display: flex; gap: 6px; flex-shrink: 0; }
        .icon-btn { width: 34px; height: 34px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-white); color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .icon-btn:hover { border-color: ${accent}; color: ${accent}; }
        .icon-btn.delete:hover { border-color: #ef4444; color: #ef4444; }
        .empty-state { text-align: center; padding: 60px 20px; background: var(--bg-white); border: 1px dashed var(--border-color); border-radius: var(--radius-md); color: var(--text-muted); }
        .mm-loading { display: flex; align-items: center; gap: 10px; padding: 50px 20px; color: var(--text-muted); justify-content: center; }
        .mm-error { padding: 20px; color: #dc2626; text-align: center; }
        .mm-form-error { padding: 10px 14px; background: #fee2e2; color: #dc2626; border-radius: var(--radius-sm); font-size: 0.85rem; }
        .modal-form { display: flex; flex-direction: column; gap: 16px; }
        .row-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .social-fields { display: flex; flex-direction: column; gap: 12px; border: 1px dashed var(--border-color); border-radius: var(--radius-sm); padding: 14px; }
        .social-label { font-size: 0.85rem; font-weight: 700; color: var(--text-dark); }
        .form-group { display: flex; flex-direction: column; gap: 5px; }
        .form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-dark); }
        .form-input { padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.9rem; font-family: inherit; outline: none; }
        .form-input:focus { border-color: var(--primary-blue); box-shadow: 0 0 0 3px rgba(12,80,160,0.1); }
        .form-textarea { padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.9rem; font-family: inherit; outline: none; resize: vertical; line-height: 1.5; }
        .form-textarea:focus { border-color: var(--primary-blue); box-shadow: 0 0 0 3px rgba(12,80,160,0.1); }
        .image-row { display: flex; gap: 10px; align-items: flex-start; }
        .image-row .form-input { flex: 1; }
        .image-sm { width: 48px; height: 48px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-color); flex-shrink: 0; }
        .image-sm img { width: 100%; height: 100%; object-fit: cover; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; padding-top: 8px; }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) { .page-header { flex-direction: column; gap: 12px; } .row-fields { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
