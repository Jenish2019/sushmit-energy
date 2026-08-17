'use client';

import { useState } from 'react';
import { Plus, PencilSimple, Trash, Image, CircleNotch } from '@phosphor-icons/react/dist/ssr';
import AdminModal from '@/components/AdminModal';
import useCollection from '@/components/useCollection';
import UploadButton from '@/components/UploadButton';

const emptyForm = { name: '', desc: '', cover: '', images: [] };
const toSlug = (name) => String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export default function GalleryPage() {
  const { items: albums, loading, error, createItem, updateItem, deleteItem } = useCollection('/api/admin/gallery');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingAlbum, setUploadingAlbum] = useState(null);
  const [albumError, setAlbumError] = useState(null);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);

  const uploadFile = async (file, folder) => {
    const body = new FormData();
    body.append('file', file);
    body.append('folder', folder);
    const res = await fetch('/api/admin/upload', { method: 'POST', body, cache: 'no-store' });
    let json;
    try {
      json = await res.json();
    } catch {
      throw new Error(res.ok ? 'Upload returned an empty response. Please try again.' : `Upload failed (HTTP ${res.status})`);
    }
    if (!json.success) throw new Error(json.error || 'UploadSimple failed');
    return json.data.url;
  };

  const uploadFiles = async (fileList) => {
    const files = Array.from(fileList);
    if (!files.length) return [];
    const folder = `gallery/${toSlug(form.name) || 'album'}`;
    const urls = await Promise.all(files.map((f) => uploadFile(f, folder)));
    return urls;
  };

  const handleAlbumPhotos = async (album, fileList) => {
    const files = Array.from(fileList);
    if (!files.length) return;
    setUploadingAlbum(album._id);
    setAlbumError(null);
    const folder = `gallery/${toSlug(album.name) || 'album'}`;
    try {
      const urls = await Promise.all(files.map((f) => uploadFile(f, folder)));
      const images = [...(album.images || []), ...urls];
      await updateItem(album._id, { name: album.name, slug: toSlug(album.name), description: album.description || '', cover: album.cover || '', images });
    } catch (err) {
      setAlbumError(err.message);
    } finally {
      setUploadingAlbum(null);
    }
  };

  const handleModalPhotos = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadingPhotos(true);
    setFormError(null);
    try {
      const urls = await uploadFiles(files);
      setForm((prev) => ({ ...prev, images: [...(prev.images || []), ...urls] }));
    } catch (err) {
      setFormError(err.message);
    } finally {
      setUploadingPhotos(false);
      e.target.value = '';
    }
  };

  const removeModalImage = (index) => {
    setForm((prev) => ({ ...prev, images: (prev.images || []).filter((_, i) => i !== index) }));
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (album) => {
    setEditingId(album._id);
    setForm({ name: album.name || '', desc: album.description || '', cover: album.cover || '', images: [...(album.images || [])] });
    setFormError(null);
    setModalOpen(true);
  };

  const handleDelete = async (album) => {
    if (!window.confirm(`Delete album "${album.name}"?`)) return;
    try {
      await deleteItem(album._id);
    } catch (err) {
      window.alert(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitting(true);
    setFormError(null);
    const payload = { name: form.name.trim(), slug: toSlug(form.name), description: form.desc, cover: form.cover, images: form.images || [] };
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
          <h1>Gallery</h1>
          <p>Manage photo albums & media gallery</p>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><Plus size={18} /> Add Album</button>
      </div>

      {loading ? (
        <div className="gallery-loading"><CircleNotch size={20} className="spin" /> Loading albums...</div>
      ) : (
        <div className="albums-grid">
          {albums.map((album) => (
            <div key={album._id} className="album-card">
              <div className="album-cover">
                {album.cover ? (
                  <img src={album.cover} alt={album.name} />
                ) : (
                  <div className="album-placeholder">
                    <Image size={40} />
                    <span>No photos yet</span>
                  </div>
                )}
                <div className="album-count">{(album.images || []).length} photos</div>
              </div>
              <div className="album-body">
                <h3>{album.name}</h3>
                <p>{album.description}</p>
              </div>
              <div className="album-footer">
                <label className="btn btn-outline album-upload-btn" style={{ padding: '8px 16px', fontSize: '0.85rem', flex: 1, justifyContent: 'center', cursor: uploadingAlbum === album._id ? 'wait' : 'pointer' }}>
                  {uploadingAlbum === album._id ? <><CircleNotch size={16} className="spin" /> Uploading...</> : <><Plus size={16} /> UploadSimple Photos</>}
                  <input type="file" accept="image/*" multiple style={{ display: 'none' }} disabled={uploadingAlbum !== null} onChange={(e) => handleAlbumPhotos(album, e.target.files)} />
                </label>
                <button className="icon-btn" title="Edit" onClick={() => openEdit(album)}><PencilSimple size={16} /></button>
                <button className="icon-btn delete" title="Delete" onClick={() => handleDelete(album)}><Trash size={16} /></button>
              </div>
            </div>
          ))}
          {albums.length === 0 && <div className="empty-state"><p>No albums yet.</p></div>}
        </div>
      )}
      {error && !loading && <div className="gallery-error">{error}</div>}
      {albumError && <div className="gallery-error">{albumError}</div>}

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? 'Edit Album' : 'Add Album'}>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Album Name</label>
            <input className="form-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. Project Sites" required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-textarea" rows={3} value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} placeholder="Brief description of this album..." />
          </div>
          <div className="form-group">
            <label>Cover Image URL</label>
            <div className="cover-row">
              <input className="form-input" value={form.cover} onChange={e => setForm({ ...form, cover: e.target.value })} placeholder="https://..." />
              <UploadButton onUploaded={(url) => setForm({ ...form, cover: url })} accept="image/*" label="UploadSimple" />
              {form.cover && <div className="cover-sm"><img src={form.cover} alt="preview" onError={e => e.target.style.display = 'none'} /></div>}
            </div>
          </div>
          <div className="form-group">
            <label>Photos <span className="field-hint">(select multiple images)</span></label>
            <label className="btn btn-outline gallery-multi-upload">
              {uploadingPhotos ? <><CircleNotch size={16} className="spin" /> Uploading...</> : <><Plus size={16} /> Upload Photos</>}
              <input type="file" accept="image/*" multiple style={{ display: 'none' }} disabled={uploadingPhotos} onChange={handleModalPhotos} />
            </label>
            {(form.images || []).length > 0 && (
              <div className="album-photo-grid">
                {(form.images || []).map((img, i) => (
                  <div className="album-photo-thumb" key={i}>
                    <img src={img.url || img.image || img} alt={`Photo ${i + 1}`} onError={e => e.target.style.display = 'none'} />
                    <button type="button" className="photo-remove" title="Remove" onClick={() => removeModalImage(i)}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>
          {formError && <div className="gallery-form-error">{formError}</div>}
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? <CircleNotch size={18} className="spin" /> : null} {editingId ? 'Update Album' : 'Create Album'}</button>
          </div>
        </form>
      </AdminModal>

      <style>{`
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .page-header h1 { font-size: 1.5rem; font-weight: 700; }
        .page-header p { color: var(--text-muted); font-size: 0.9rem; margin-top: 2px; }
        .albums-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .album-card { background: var(--bg-white); border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden; transition: box-shadow 0.2s; }
        .album-card:hover { box-shadow: var(--shadow-md); }
        .album-cover { position: relative; height: 180px; background: var(--bg-light); overflow: hidden; }
        .album-cover img { width: 100%; height: 100%; object-fit: cover; }
        .album-placeholder { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; color: var(--text-light); }
        .album-placeholder span { font-size: 0.8rem; }
        .album-count { position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.7); color: white; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; }
        .album-body { padding: 16px 20px; }
        .album-body h3 { font-size: 1rem; font-weight: 600; margin-bottom: 4px; }
        .album-body p { font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; }
        .album-footer { display: flex; gap: 8px; padding: 12px 20px; border-top: 1px solid var(--border-color); }
        .album-upload-btn { display: inline-flex; align-items: center; gap: 6px; }
        .icon-btn { width: 34px; height: 34px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-white); color: var(--text-muted); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .icon-btn:hover { border-color: var(--primary-blue); color: var(--primary-blue); }
        .icon-btn.delete:hover { border-color: #ef4444; color: #ef4444; }
        .empty-state { text-align: center; padding: 60px 20px; background: var(--bg-white); border: 1px dashed var(--border-color); border-radius: var(--radius-md); color: var(--text-muted); grid-column: 1 / -1; }
        .gallery-loading { display: flex; align-items: center; gap: 10px; padding: 50px 20px; color: var(--text-muted); justify-content: center; }
        .gallery-error { padding: 20px; color: #dc2626; text-align: center; }
        .gallery-form-error { padding: 10px 14px; background: #fee2e2; color: #dc2626; border-radius: var(--radius-sm); font-size: 0.85rem; }
        .modal-form { display: flex; flex-direction: column; gap: 18px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-dark); }
        .form-input { width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.9rem; font-family: inherit; outline: none; transition: border-color 0.2s; }
        .form-input:focus { border-color: var(--primary-blue); box-shadow: 0 0 0 3px rgba(12,80,160,0.1); }
        .form-textarea { width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.9rem; font-family: inherit; outline: none; transition: border-color 0.2s; resize: vertical; line-height: 1.5; }
        .form-textarea:focus { border-color: var(--primary-blue); box-shadow: 0 0 0 3px rgba(12,80,160,0.1); }
        .cover-row { display: flex; gap: 10px; align-items: flex-start; }
        .cover-row .form-input { flex: 1; }
        .cover-sm { width: 48px; height: 48px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-color); flex-shrink: 0; }
        .cover-sm img { width: 100%; height: 100%; object-fit: cover; }
        .field-hint { font-weight: 400; color: var(--text-light); font-size: 0.8rem; }
        .gallery-multi-upload { align-self: flex-start; display: inline-flex; align-items: center; gap: 6px; cursor: pointer; }
        .album-photo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(84px, 1fr)); gap: 8px; }
        .album-photo-thumb { position: relative; aspect-ratio: 1; border-radius: 8px; overflow: hidden; border: 1px solid var(--border-color); background: var(--bg-light); }
        .album-photo-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .photo-remove { position: absolute; top: 4px; right: 4px; width: 20px; height: 20px; border: none; border-radius: 50%; background: rgba(220,38,38,.92); color: #fff; font-size: 0.95rem; line-height: 1; cursor: pointer; display: flex; align-items: center; justify-content: center; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 10px; padding-top: 8px; }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 1024px) { .albums-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px) { .albums-grid { grid-template-columns: 1fr; } .page-header { flex-direction: column; gap: 12px; } }
      `}</style>
    </>
  );
}
