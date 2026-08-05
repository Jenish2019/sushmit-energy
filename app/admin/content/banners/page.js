'use client';

import { useEffect, useState } from 'react';
import { Plus, PencilSimple, Trash, DotsSixVertical, CircleNotch } from '@phosphor-icons/react/dist/ssr';
import AdminModal from '@/components/AdminModal';
import UploadButton from '@/components/UploadButton';

export default function BannersPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIdx, setEditingIdx] = useState(null);
  const [form, setForm] = useState({ title: '', img: '', active: true });

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/settings', { cache: 'no-store' });
      const json = await res.json();
      const slides = json.data?.bannerSlides || [];
      setBanners(slides);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional fetch-on-mount data load
  useEffect(() => { load(); }, []);

  const save = async (next) => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bannerSlides: next }),
        cache: 'no-store',
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'FloppyDisk failed');
      setBanners(next);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = (idx) => {
    const next = banners.map((b, i) => (i === idx ? { ...b, active: !b.active } : b));
    save(next);
  };

  const deleteBanner = (idx) => {
    if (!confirm('Delete this banner?')) return;
    save(banners.filter((_, i) => i !== idx));
  };

  const openAdd = () => {
    setEditingIdx(null);
    setForm({ title: '', img: '', active: true });
    setModalOpen(true);
  };

  const openEdit = (banner, idx) => {
    setEditingIdx(idx);
    setForm({ title: banner.title || '', img: banner.img || '', active: !!banner.active });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const slide = { title: form.title.trim(), img: form.img.trim(), active: !!form.active };
    if (editingIdx === null) {
      save([...banners, slide]);
    } else {
      save(banners.map((b, i) => (i === editingIdx ? slide : b)));
    }
    setModalOpen(false);
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Banners</h1>
          <p>Manage homepage hero banner slides</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}>
          <Plus size={18} />
          Add Banner
        </button>
      </div>

      {error && <div className="alert-error">{error}</div>}

      {loading ? (
        <div className="empty-state"><CircleNotch size={22} className="spin" /><p>Loading banners...</p></div>
      ) : (
        <div className="banners-list">
          {banners.map((banner, idx) => (
            <div key={idx} className="banner-card">
              <div className="banner-order">
                <DotsSixVertical size={18} />
                <span className="order-num">{idx + 1}</span>
              </div>
              <div className="banner-preview">
                <div
                  className="banner-color-bg"
                  style={{ backgroundImage: banner.img ? `url(${banner.img})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  {!banner.img && <span>Banner {idx + 1}</span>}
                </div>
              </div>
              <div className="banner-info">
                <h3>{banner.title || '(Untitled)'}</h3>
                {banner.img && <p>{banner.img}</p>}
              </div>
              <div className="banner-status">
                <label className="toggle-switch">
                  <input type="checkbox" checked={!!banner.active} onChange={() => toggleActive(idx)} />
                  <span className="toggle-slider" />
                </label>
                <span style={{ fontSize: '0.8rem', color: banner.active ? 'var(--primary-green)' : 'var(--text-light)' }}>
                  {banner.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="banner-actions">
                <button className="icon-btn" title="Edit" onClick={() => openEdit(banner, idx)}><PencilSimple size={16} /></button>
                <button className="icon-btn delete" title="Delete" onClick={() => deleteBanner(idx)}><Trash size={16} /></button>
              </div>
            </div>
          ))}
          {banners.length === 0 && !loading && (
            <div className="empty-state">
              <p>No banners yet. Click &quot;Add Banner&quot; to create one.</p>
            </div>
          )}
        </div>
      )}

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editingIdx === null ? 'Add Banner' : 'Edit Banner'}>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Title</label>
            <input className="form-input" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. Welcome to Sushmit Energy" required />
          </div>
          <div className="form-group">
            <label>Background Image</label>
            <div className="image-row">
              <input className="form-input" value={form.img} onChange={e => setForm({ ...form, img: e.target.value })} placeholder="https://... or upload" />
              <UploadButton onUploaded={(url) => setForm({ ...form, img: url })} accept="image/*" label="UploadSimple" />
            </div>
            {form.img && <div className="image-sm"><img src={form.img} alt="preview" onError={e => e.target.style.display = 'none'} /></div>}
          </div>
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
              <span>Active</span>
            </label>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? <CircleNotch size={16} className="spin" /> : null}
              {editingIdx === null ? 'Create Banner' : 'FloppyDisk Changes'}
            </button>
          </div>
        </form>
      </AdminModal>

      <style>{`
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .page-header h1 { font-size: 1.5rem; font-weight: 700; }
        .page-header p { color: var(--text-muted); font-size: 0.9rem; margin-top: 2px; }
        .banners-list { display: flex; flex-direction: column; gap: 12px; }
        .banner-card { display: flex; align-items: center; gap: 16px; background: var(--bg-white); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px 20px; transition: box-shadow 0.2s; }
        .banner-card:hover { box-shadow: var(--shadow-sm); }
        .banner-order { display: flex; flex-direction: column; align-items: center; gap: 2px; color: var(--text-light); cursor: grab; }
        .order-num { font-size: 0.75rem; font-weight: 600; }
        .banner-preview { flex-shrink: 0; }
        .banner-color-bg { width: 100px; height: 56px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.75rem; font-weight: 600; background: linear-gradient(135deg, #0c50a0, #083d7a); }
        .banner-info { flex: 1; min-width: 0; }
        .banner-info h3 { font-size: 0.95rem; font-weight: 600; margin-bottom: 2px; }
        .banner-info p { font-size: 0.78rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .banner-status { display: flex; flex-direction: column; align-items: center; gap: 4px; flex-shrink: 0; }
        .toggle-switch { position: relative; display: inline-block; width: 38px; height: 20px; cursor: pointer; }
        .toggle-switch input { opacity: 0; width: 0; height: 0; }
        .toggle-slider { position: absolute; inset: 0; background: var(--border-color); border-radius: 20px; transition: 0.3s; }
        .toggle-slider::before { content: ''; position: absolute; height: 16px; width: 16px; left: 2px; bottom: 2px; background: white; border-radius: 50%; transition: 0.3s; }
        .toggle-switch input:checked + .toggle-slider { background: var(--primary-green); }
        .toggle-switch input:checked + .toggle-slider::before { transform: translateX(18px); }
        .banner-actions { display: flex; gap: 6px; flex-shrink: 0; }
        .icon-btn { width: 34px; height: 34px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-white); color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .icon-btn:hover { border-color: var(--primary-blue); color: var(--primary-blue); }
        .icon-btn.delete:hover { border-color: #ef4444; color: #ef4444; }
        .empty-state { text-align: center; padding: 60px 20px; background: var(--bg-white); border: 1px dashed var(--border-color); border-radius: var(--radius-md); color: var(--text-muted); }
        .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 12px 16px; border-radius: var(--radius-sm); margin-bottom: 16px; font-size: 0.9rem; }
        .modal-form { display: flex; flex-direction: column; gap: 18px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-dark); }
        .form-input { width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.9rem; font-family: inherit; outline: none; transition: border-color 0.2s; }
        .form-input:focus { border-color: var(--primary-blue); box-shadow: 0 0 0 3px rgba(12,80,160,0.1); }
        .image-row { display: flex; gap: 8px; align-items: center; }
        .image-row .form-input { flex: 1; }
        .image-sm { margin-top: 8px; }
        .image-sm img { width: 100%; max-height: 160px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border-color); }
        .checkbox-group { flex-direction: row; }
        .checkbox-label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.9rem; }
        .checkbox-label input { width: 16px; height: 16px; accent-color: var(--primary-blue); }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; padding-top: 8px; }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) { .banner-card { flex-wrap: wrap; } .page-header { flex-direction: column; gap: 12px; } }
      `}</style>
    </>
  );
}
