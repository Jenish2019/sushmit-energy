'use client';

import { useState } from 'react';
import { Plus, CircleNotch, Trash, Briefcase, MapPin, Clock } from '@phosphor-icons/react/dist/ssr';
import AdminModal from '@/components/AdminModal';
import useCollection from '@/components/useCollection';

const EMPTY_FORM = {
  title: '',
  department: '',
  location: '',
  type: 'Full-Time',
  deadline: '',
  description: '',
  requirements: '',
  status: 'Open',
};

export default function JobsPage() {
  const { items, loading, error, createItem, updateItem, deleteItem } = useCollection('/api/admin/jobs');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const openAdd = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title || '',
      department: item.department || '',
      location: item.location || '',
      type: item.type || 'Full-Time',
      deadline: item.deadline || '',
      description: item.description || '',
      requirements: (item.requirements || []).join('\n'),
      status: item.status || 'Open',
    });
    setFormError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSubmitting(true);
    setFormError(null);
    const payload = {
      ...form,
      title: form.title.trim(),
      requirements: form.requirements
        .split('\n')
        .map((r) => r.trim())
        .filter(Boolean),
    };
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
    if (!window.confirm(`Delete vacancy "${item.title}"?`)) return;
    try {
      await deleteItem(item._id);
    } catch (err) {
      window.alert(err.message);
    }
  };

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <>
      <div className="page-header">
        <div><h1>Job Board</h1><p>Manage current vacancies shown on the website</p></div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add Vacancy</button>
      </div>

      <div className="table-wrapper">
        {loading ? (
          <div className="res-loading"><CircleNotch size={20} className="spin" /> Loading...</div>
        ) : (
          <table className="data-table">
            <thead><tr><th>Position</th><th>Department</th><th>Location</th><th>Type</th><th>Deadline</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>{items.map(item => (
              <tr key={item._id}>
                <td><div className="td-title"><Briefcase size={16} /> {item.title}</div></td>
                <td>{item.department || '—'}</td>
                <td><div className="td-title td-muted"><MapPin size={14} /> {item.location || '—'}</div></td>
                <td><span className="type-badge">{item.type}</span></td>
                <td className="td-date"><Clock size={14} /> {item.deadline || '—'}</td>
                <td><span className={`status-badge ${item.status === 'Open' ? 'open' : 'closed'}`}>{item.status}</span></td>
                <td><div className="td-actions">
                  <button className="icon-btn" title="Edit" onClick={() => openEdit(item)}>Edit</button>
                  <button className="icon-btn delete" title="Delete" onClick={() => handleDelete(item)}><Trash size={16} /></button>
                </div></td>
              </tr>
            ))}</tbody>
          </table>
        )}
        {!loading && items.length === 0 && <div className="empty-state"><p>No vacancies yet.</p></div>}
        {error && !loading && <div className="res-error">{error}</div>}
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Vacancy' : 'Add Vacancy'} size="large">
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group"><label>Position Title</label><input className="form-input" value={form.title} onChange={set('title')} placeholder="e.g. Senior Hydropower Engineer" required /></div>
          <div className="row-fields">
            <div className="form-group"><label>Department</label><input className="form-input" value={form.department} onChange={set('department')} placeholder="e.g. Engineering" /></div>
            <div className="form-group"><label>Location</label><input className="form-input" value={form.location} onChange={set('location')} placeholder="e.g. Kathmandu, Nepal" /></div>
          </div>
          <div className="row-fields">
            <div className="form-group"><label>Employment Type</label>
              <select className="form-input" value={form.type} onChange={set('type')}>
                {['Full-Time', 'Part-Time', 'Contract', 'Intern', 'Trainee'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group"><label>Application Deadline</label><input className="form-input" type="date" value={form.deadline} onChange={set('deadline')} /></div>
          </div>
          <div className="row-fields">
            <div className="form-group"><label>Status</label>
              <select className="form-input" value={form.status} onChange={set('status')}>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
          <div className="form-group"><label>Description</label><textarea className="form-input form-textarea" rows={3} value={form.description} onChange={set('description')} placeholder="Short description of the role" /></div>
          <div className="form-group"><label>Requirements (one per line)</label><textarea className="form-input form-textarea" rows={6} value={form.requirements} onChange={set('requirements')} placeholder={"Bachelor's degree in...\n8+ years of experience..."} /></div>
          {formError && <div className="res-form-error">{formError}</div>}
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? <CircleNotch size={18} className="spin" /> : null} {editingId ? 'Update' : 'Add Vacancy'}</button>
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
        .td-muted { font-weight: 400; color: var(--text-muted); }
        .td-muted svg { color: var(--text-muted); }
        .td-date { color: var(--text-muted); white-space: nowrap; display: flex; align-items: center; gap: 5px; }
        .td-date svg { color: var(--text-light); }
        .type-badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 0.78rem; font-weight: 500; background: var(--bg-light); color: var(--text-muted); }
        .status-badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 0.78rem; font-weight: 600; }
        .status-badge.open { background: #e8f5e9; color: var(--primary-green); }
        .status-badge.closed { background: #fee2e2; color: #dc2626; }
        .td-actions { display: flex; gap: 6px; }
        .icon-btn { height: 34px; padding: 0 10px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-white); color: var(--text-muted); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem; transition: all 0.2s; }
        .icon-btn:hover { border-color: var(--primary-blue); color: var(--primary-blue); }
        .icon-btn.delete:hover { border-color: #ef4444; color: #ef4444; }
        .res-loading { display: flex; align-items: center; gap: 10px; padding: 50px 20px; color: var(--text-muted); justify-content: center; }
        .res-error { padding: 20px; color: #dc2626; text-align: center; }
        .res-form-error { padding: 10px 14px; background: #fee2e2; color: #dc2626; border-radius: var(--radius-sm); font-size: 0.85rem; }
        .empty-state { text-align: center; padding: 60px 20px; color: var(--text-muted); }
        .modal-form { display: flex; flex-direction: column; gap: 16px; }
        .row-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 5px; }
        .form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-dark); }
        .form-input { padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.9rem; font-family: inherit; outline: none; }
        .form-input:focus { border-color: var(--primary-blue); box-shadow: 0 0 0 3px rgba(12,80,160,0.1); }
        select.form-input { cursor: pointer; }
        .form-textarea { resize: vertical; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; padding-top: 8px; }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) { .page-header { flex-direction: column; gap: 12px; } .row-fields { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
