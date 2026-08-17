'use client';

import { useState } from 'react';
import { Plus, PencilSimple, Trash, CircleNotch } from '@phosphor-icons/react/dist/ssr';
import AdminModal from '@/components/AdminModal';
import RichTextEditor from '@/components/RichTextEditor';
import useCollection from '@/components/useCollection';
import UploadButton from '@/components/UploadButton';
import Pagination from '@/components/Pagination';

const PAGE_SIZE = 10;

const categories = ['Press Release', 'News', 'Notice', 'Blog', 'Update', 'Energy'];
const statuses = ['Draft', 'Published'];

const toSlug = (title) => title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

export default function NewsTable({ title, description, defaultCategory = 'News', categories: allowedCategories = null, canEditCategory = true, showAll = false }) {
  const query = showAll ? '' : `?category=${encodeURIComponent(defaultCategory)}`;
  const { items: articles, loading, error, createItem, updateItem, deleteItem } = useCollection('/api/admin/news', { query });
  const [page, setPage] = useState(1);
  const pageItems = articles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', date: '', category: defaultCategory, status: 'Draft', excerpt: '', image: '' });
  const [content, setContent] = useState('');
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const catOptions = allowedCategories || categories;

  const openAdd = () => {
    setEditingId(null);
    setForm({ title: '', slug: '', date: new Date().toISOString().split('T')[0], category: defaultCategory, status: 'Draft', excerpt: '', image: '' });
    setContent('');
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title || '',
      slug: item.slug || toSlug(item.title || ''),
      date: item.date || '',
      category: item.category || defaultCategory,
      status: item.status || 'Draft',
      excerpt: item.excerpt || '',
      image: item.image || '',
    });
    setContent(item.content || '');
    setFormError(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSubmitting(true);
    setFormError(null);
    const payload = {
      title: form.title.trim(),
      slug: form.slug || toSlug(form.title),
      category: form.category,
      date: form.date,
      status: form.status,
      excerpt: form.excerpt,
      image: form.image,
      content,
    };
    try {
      if (editingId) {
        await updateItem(editingId, payload);
      } else {
        await createItem(payload);
      }
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
      <div className="news-header">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add Article</button>
      </div>

      <div className="news-table-wrap">
        {loading ? (
          <div className="news-loading"><CircleNotch size={20} className="spin" /> Loading articles...</div>
        ) : (
          <table className="news-table">
            <thead>
              <tr>
                <th>Article</th>
                <th>Date</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((item) => (
                <tr key={item._id}>
                  <td><div className="news-title-cell">{item.image ? <img className="news-thumb" src={item.image} alt="" /> : <span className="news-thumb news-thumb--empty" />}<div className="news-title">{item.title}</div></div></td>
                  <td className="news-date">{item.date}</td>
                  <td><span className="news-cat">{item.category}</span></td>
                  <td><span className={`news-dot ${item.status === 'Published' ? 'pub' : 'draft'}`} />{item.status}</td>
                  <td>
                    <div className="news-actions">
                      <button className="icon-btn" title="Edit" onClick={() => openEdit(item)}><PencilSimple size={16} /></button>
                      <button className="icon-btn delete" title="Delete" onClick={() => handleDelete(item)}><Trash size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && articles.length === 0 && <div className="news-empty"><p>No articles yet.</p></div>}
        {!loading && articles.length > 0 && (
          <Pagination page={page} pageSize={PAGE_SIZE} total={articles.length} onChange={setPage} />
        )}
        {error && !loading && <div className="news-error">{error}</div>}
      </div>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Article' : 'Add Article'} size="large">
        <form onSubmit={handleSubmit} className="news-modal-form">
          <div className="nf-group"><label>Title</label><input className="nf-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required /></div>
          <div className="nf-row">
            <div className="nf-group"><label>Date</label><input className="nf-input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
            <div className="nf-group"><label>Category</label><select className="nf-input" value={form.category} disabled={!canEditCategory} onChange={e => setForm({ ...form, category: e.target.value })}>{catOptions.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
          </div>
          <div className="nf-row">
            <div className="nf-group"><label>URL Slug</label><input className="nf-input" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="Auto-generated if empty" /></div>
            <div className="nf-group"><label>Status</label><select className="nf-input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>{statuses.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
          </div>
          <div className="nf-group"><label>Excerpt</label><textarea className="nf-input" rows={2} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} placeholder="Short summary shown in listings" /></div>
          <div className="nf-group"><label>Cover Image URL</label><div className="nf-file-row"><input className="nf-input" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." /><UploadButton onUploaded={(url) => setForm({ ...form, image: url })} accept="image/*" label="UploadSimple" /></div>{form.image ? <img className="nf-image-preview" src={form.image} alt="Cover preview" onError={e => { e.currentTarget.style.display = 'none'; }} /> : null}</div>
          <div className="nf-group"><label>Content</label><RichTextEditor value={content} onChange={setContent} placeholder="Write article content..." /></div>
          {formError && <div className="nf-error">{formError}</div>}
          <div className="nf-actions">
            <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? <CircleNotch size={18} className="spin" /> : null} {editingId ? 'Update Article' : 'Create Article'}</button>
          </div>
        </form>
      </AdminModal>

      <style>{`
        .news-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .news-header h1 { font-size: 1.5rem; font-weight: 700; }
        .news-header p { color: var(--text-muted); font-size: 0.9rem; margin-top: 2px; }
        .news-table-wrap { background: var(--bg-white); border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden; }
        .news-table { width: 100%; border-collapse: collapse; }
        .news-table th { text-align: left; padding: 14px 20px; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid var(--border-color); background: var(--bg-light); }
        .news-table td { padding: 14px 20px; font-size: 0.9rem; border-bottom: 1px solid var(--border-color); }
        .news-table tr:last-child td { border-bottom: none; }
        .news-title { font-weight: 600; max-width: 320px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .news-title-cell { display: flex; align-items: center; gap: 12px; }
        .news-thumb { width: 56px; height: 40px; object-fit: cover; border-radius: 6px; flex-shrink: 0; border: 1px solid var(--border-color); }
        .news-thumb--empty { background: var(--bg-light); }
        .news-date { color: var(--text-muted); white-space: nowrap; }
        .news-cat { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 0.78rem; font-weight: 500; background: var(--bg-light); color: var(--text-muted); }
        .news-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px; }
        .news-dot.pub { background: var(--primary-green); }
        .news-dot.draft { background: var(--text-light); }
        .news-actions { display: flex; gap: 6px; }
        .news-loading { display: flex; align-items: center; gap: 10px; padding: 50px 20px; color: var(--text-muted); justify-content: center; }
        .news-error { padding: 20px; color: #dc2626; text-align: center; }
        .icon-btn { width: 34px; height: 34px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-white); color: var(--text-muted); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .icon-btn:hover { border-color: var(--primary-blue); color: var(--primary-blue); }
        .icon-btn.delete:hover { border-color: #ef4444; color: #ef4444; }
        .news-empty { text-align: center; padding: 60px 20px; color: var(--text-muted); }
        .news-modal-form { display: flex; flex-direction: column; gap: 16px; }
        .nf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .nf-file-row { display: flex; gap: 10px; align-items: center; }
        .nf-file-row .nf-input { flex: 1; }
        .nf-image-preview { margin-top: 10px; width: 100%; max-width: 260px; aspect-ratio: 16 / 9; object-fit: cover; border: 1px solid var(--border-color); border-radius: var(--radius-sm); }
        .nf-group { display: flex; flex-direction: column; gap: 5px; }
        .nf-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-dark); }
        .nf-input { padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.9rem; font-family: inherit; outline: none; }
        .nf-input:focus { border-color: var(--primary-blue); box-shadow: 0 0 0 3px rgba(12,80,160,0.1); }
        select.nf-input { cursor: pointer; }
        .nf-error { padding: 10px 14px; background: #fee2e2; color: #dc2626; border-radius: var(--radius-sm); font-size: 0.85rem; }
        .nf-actions { display: flex; justify-content: flex-end; gap: 10px; padding-top: 8px; }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 640px) { .news-header { flex-direction: column; gap: 12px; } .nf-row { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
