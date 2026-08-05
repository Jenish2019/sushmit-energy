'use client';

import { useState } from 'react';
import { Plus, PencilSimple, Trash, DotsSixVertical, CircleNotch } from '@phosphor-icons/react/dist/ssr';
import AdminModal from '@/components/AdminModal';
import useCollection from '@/components/useCollection';

const emptyForm = { title: '', desc: '', active: true };

export default function ServicesPage() {
  const { items: services, loading, error, createItem, updateItem, deleteItem } = useCollection('/api/admin/services');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const toggleActive = async (svc) => {
    try {
      await updateItem(svc._id, { active: !svc.active });
    } catch (err) {
      window.alert(err.message);
    }
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({ ...emptyForm, order: services.length });
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (svc) => {
    setEditingId(svc._id);
    setForm({ title: svc.title || '', desc: svc.description || '', active: !!svc.active, order: svc.order || 0 });
    setFormError(null);
    setModalOpen(true);
  };

  const handleDelete = async (svc) => {
    if (!window.confirm(`Delete service "${svc.title}"?`)) return;
    try {
      await deleteItem(svc._id);
    } catch (err) {
      window.alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSubmitting(true);
    setFormError(null);
    const payload = { title: form.title.trim(), description: form.desc, active: !!form.active, order: form.order || 0 };
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
          <h1>Services</h1>
          <p>Manage service offerings & descriptions</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add Service</button>
      </div>

      {loading ? (
        <div className="svc-loading"><CircleNotch size={20} className="spin" /> Loading services...</div>
      ) : (
        <div className="item-list">
          {services.map((svc, idx) => (
            <div key={svc._id} className="item-card">
              <div className="item-order"><DotsSixVertical size={18} /><span className="order-num">{idx + 1}</span></div>
              <div className="item-color-badge" style={{ background: 'linear-gradient(135deg, #0f8a43, #0b6e35)' }}>
                <span>{svc.title.charAt(0)}</span>
              </div>
              <div className="item-info">
                <h3>{svc.title}</h3>
                <p>{svc.description}</p>
              </div>
              <div className="item-status">
                <label className="toggle-switch">
                  <input type="checkbox" checked={!!svc.active} onChange={() => toggleActive(svc)} />
                  <span className="toggle-slider" />
                </label>
                <span style={{ fontSize: '0.8rem', color: svc.active ? 'var(--primary-green)' : 'var(--text-light)' }}>
                  {svc.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="item-actions">
                <button className="icon-btn" title="Edit" onClick={() => openEdit(svc)}><PencilSimple size={16} /></button>
                <button className="icon-btn delete" title="Delete" onClick={() => handleDelete(svc)}><Trash size={16} /></button>
              </div>
            </div>
          ))}
          {services.length === 0 && <div className="empty-state"><p>No services yet.</p></div>}
        </div>
      )}
      {error && !loading && <div className="svc-error">{error}</div>}

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Service' : 'Add Service'}>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Service Title</label>
            <input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Hydropower Project Development" required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-textarea" rows={3} value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} placeholder="Describe this service..." />
          </div>
          <div className="row-fields">
            <div className="form-group">
              <label>Display Order</label>
              <input className="form-input" type="number" value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} />
            </div>
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" checked={!!form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
                <span>Active</span>
              </label>
            </div>
          </div>
          {formError && <div className="svc-form-error">{formError}</div>}
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? <CircleNotch size={18} className="spin" /> : null} {editingId ? 'Update Service' : 'Create Service'}</button>
          </div>
        </form>
      </AdminModal>

      <style>{`
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .page-header h1 { font-size: 1.5rem; font-weight: 700; }
        .page-header p { color: var(--text-muted); font-size: 0.9rem; margin-top: 2px; }
        .item-list { display: flex; flex-direction: column; gap: 12px; }
        .item-card { display: flex; align-items: center; gap: 16px; background: var(--bg-white); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px 20px; transition: box-shadow 0.2s; }
        .item-card:hover { box-shadow: var(--shadow-sm); }
        .item-order { display: flex; flex-direction: column; align-items: center; gap: 2px; color: var(--text-light); cursor: grab; }
        .order-num { font-size: 0.75rem; font-weight: 600; }
        .item-color-badge { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 1.1rem; flex-shrink: 0; }
        .item-info { flex: 1; min-width: 0; }
        .item-info h3 { font-size: 0.95rem; font-weight: 600; margin-bottom: 2px; }
        .item-info p { font-size: 0.8rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .item-status { display: flex; flex-direction: column; align-items: center; gap: 4px; flex-shrink: 0; }
        .toggle-switch { position: relative; display: inline-block; width: 38px; height: 20px; cursor: pointer; }
        .toggle-switch input { opacity: 0; width: 0; height: 0; }
        .toggle-slider { position: absolute; inset: 0; background: var(--border-color); border-radius: 20px; transition: 0.3s; }
        .toggle-slider::before { content: ''; position: absolute; height: 16px; width: 16px; left: 2px; bottom: 2px; background: white; border-radius: 50%; transition: 0.3s; }
        .toggle-switch input:checked + .toggle-slider { background: var(--primary-green); }
        .toggle-switch input:checked + .toggle-slider::before { transform: translateX(18px); }
        .item-actions { display: flex; gap: 6px; flex-shrink: 0; }
        .icon-btn { width: 34px; height: 34px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-white); color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .icon-btn:hover { border-color: var(--primary-green); color: var(--primary-green); }
        .icon-btn.delete:hover { border-color: #ef4444; color: #ef4444; }
        .svc-loading { display: flex; align-items: center; gap: 10px; padding: 50px 20px; color: var(--text-muted); justify-content: center; }
        .svc-error { padding: 20px; color: #dc2626; text-align: center; }
        .svc-form-error { padding: 10px 14px; background: #fee2e2; color: #dc2626; border-radius: var(--radius-sm); font-size: 0.85rem; }
        .empty-state { text-align: center; padding: 60px 20px; background: var(--bg-white); border: 1px dashed var(--border-color); border-radius: var(--radius-md); color: var(--text-muted); }
        .modal-form { display: flex; flex-direction: column; gap: 18px; }
        .row-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-dark); }
        .form-input { width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.9rem; font-family: inherit; outline: none; transition: border-color 0.2s; }
        .form-input:focus { border-color: var(--primary-blue); box-shadow: 0 0 0 3px rgba(12,80,160,0.1); }
        .form-textarea { width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.9rem; font-family: inherit; outline: none; transition: border-color 0.2s; resize: vertical; line-height: 1.5; }
        .form-textarea:focus { border-color: var(--primary-blue); box-shadow: 0 0 0 3px rgba(12,80,160,0.1); }
        .checkbox-group { flex-direction: row; align-items: flex-end; }
        .checkbox-label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.9rem; }
        .checkbox-label input { width: 16px; height: 16px; accent-color: var(--primary-blue); }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; padding-top: 8px; }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) { .page-header { flex-direction: column; gap: 12px; } .row-fields { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
