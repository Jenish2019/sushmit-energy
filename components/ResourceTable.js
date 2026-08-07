'use client';

import { useState } from 'react';
import { Download, FileText, CircleNotch, Plus, Trash, ArrowSquareOut } from '@phosphor-icons/react/dist/ssr';
import AdminModal from '@/components/AdminModal';
import useCollection from '@/components/useCollection';
import UploadButton from '@/components/UploadButton';

export default function ResourceTable({
  apiPath,
  title,
  description,
  addLabel = 'Add Resource',
  typeOptions = ['PDF'],
  group = null,
  fileLabel = 'File URL',
}) {
  const query = group ? `?group=${encodeURIComponent(group)}` : '';
  const { items, loading, error, createItem, updateItem, deleteItem } = useCollection(apiPath, { query });
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', type: typeOptions[0], date: '', fileUrl: '', description: '', size: '' });
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const openAdd = () => {
    setEditingId(null);
    setForm({ title: '', type: typeOptions[0], date: new Date().toISOString().split('T')[0], fileUrl: '', description: '', size: '' });
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item._id);
    setForm({ title: item.title || '', type: item.type || typeOptions[0], date: item.date || '', fileUrl: item.fileUrl || '', description: item.description || '', size: item.size || '' });
    setFormError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSubmitting(true);
    setFormError(null);
    const payload = { ...form, title: form.title.trim(), ...(group ? { group } : {}) };
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

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    try {
      await deleteItem(item._id);
    } catch (err) {
      window.alert(err.message);
    }
  };

  return (
    <>
      <div className="page-header">
        <div><h1>{title}</h1><p>{description}</p></div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> {addLabel}</button>
      </div>
      <div className="table-wrapper">
        {loading ? (
          <div className="res-loading"><CircleNotch size={20} className="spin" /> Loading...</div>
        ) : (
          <table className="data-table">
            <thead><tr><th>Title</th><th>Type</th><th>Date</th><th>File</th><th>Actions</th></tr></thead>
            <tbody>{items.map(item => (
              <tr key={item._id}>
                <td><div className="td-title"><FileText size={16} /> {item.title}</div></td>
                <td><span className="type-badge">{item.type}</span></td>
                <td className="td-date">{item.date}</td>
                <td>
                  {item.fileUrl ? (
                    <a className="file-link" href={item.fileUrl} target="_blank" rel="noreferrer"><ArrowSquareOut size={14} /> View file</a>
                  ) : <span className="no-file">No file</span>}
                </td>
                <td><div className="td-actions">
                  <button className="icon-btn" title="Edit" onClick={() => openEdit(item)}>Edit</button>
                  <button className="icon-btn delete" title="Delete" onClick={() => handleDelete(item)}><Trash size={16} /></button>
                </div></td>
              </tr>
            ))}</tbody>
          </table>
        )}
        {!loading && items.length === 0 && <div className="empty-state"><p>No items yet.</p></div>}
        {error && !loading && <div className="res-error">{error}</div>}
      </div>
      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Item' : 'Add Item'}>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group"><label>Title</label><input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Company Brochure" required /></div>
          <div className="row-fields">
            <div className="form-group"><label>Type</label><select className="form-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>{typeOptions.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
            <div className="form-group"><label>Date</label><input className="form-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
          </div>
          <div className="form-group"><label>{fileLabel}</label><div className="file-url-row"><input className="form-input" value={form.fileUrl} onChange={e => setForm({ ...form, fileUrl: e.target.value })} placeholder="https://... or /uploads/..." /><UploadButton onUploaded={(url) => setForm({ ...form, fileUrl: url })} label="Upload" maxSizeMB={50} /></div></div>
          <div className="row-fields">
            <div className="form-group"><label>File Size</label><input className="form-input" value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} placeholder="e.g. 2.4 MB" /></div>
          </div>
          <div className="form-group"><label>Description</label><textarea className="form-input" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Short description shown in listings" /></div>
          {formError && <div className="res-form-error">{formError}</div>}
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? <CircleNotch size={18} className="spin" /> : null} {editingId ? 'Update' : 'Add Item'}</button>
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
        .td-title { display: flex; align-items: center; gap: 8px; font-weight: 600; }
        .td-title svg { color: var(--primary-blue); flex-shrink: 0; }
        .type-badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 0.78rem; font-weight: 500; background: var(--bg-light); color: var(--text-muted); }
        .td-date { color: var(--text-muted); white-space: nowrap; }
        .no-file { font-size: 0.8rem; color: var(--text-light); font-style: italic; }
        .file-link { display: inline-flex; align-items: center; gap: 4px; color: var(--primary-blue); font-size: 0.85rem; cursor: pointer; }
        .td-actions { display: flex; gap: 6px; }
        .icon-btn { height: 34px; padding: 0 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-white); color: var(--text-muted); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem; transition: all 0.2s; }
        .icon-btn:hover { border-color: var(--primary-blue); color: var(--primary-blue); }
        .icon-btn.delete:hover { border-color: #ef4444; color: #ef4444; }
        .res-loading { display: flex; align-items: center; gap: 10px; padding: 50px 20px; color: var(--text-muted); justify-content: center; }
        .res-error { padding: 20px; color: #dc2626; text-align: center; }
        .res-form-error { padding: 10px 14px; background: #fee2e2; color: #dc2626; border-radius: var(--radius-sm); font-size: 0.85rem; }
        .empty-state { text-align: center; padding: 60px 20px; color: var(--text-muted); }
        .modal-form { display: flex; flex-direction: column; gap: 16px; }
        .file-url-row { display: flex; gap: 10px; align-items: center; }
        .file-url-row .form-input { flex: 1; }
        .row-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 5px; }
        .form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-dark); }
        .form-input { padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.9rem; font-family: inherit; outline: none; }
        .form-input:focus { border-color: var(--primary-blue); box-shadow: 0 0 0 3px rgba(12,80,160,0.1); }
        select.form-input { cursor: pointer; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; padding-top: 8px; }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) { .page-header { flex-direction: column; gap: 12px; } .row-fields { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
