'use client';

import { useRef, useState } from 'react';
import { UploadSimple, CircleNotch, Check } from '@phosphor-icons/react/dist/ssr';

export default function UploadButton({ onUploaded, folder = '', label = 'UploadSimple', accept = '*/*', className = 'btn-upload', maxSizeMB = 2 }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File exceeds ${maxSizeMB} MB limit`);
      return;
    }
    setUploading(true);
    setError(null);
    setDone(false);
    try {
      const body = new FormData();
      body.append('file', file);
      if (folder) body.append('folder', folder);
      const res = await fetch('/api/admin/upload', { method: 'POST', body, cache: 'no-store' });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'UploadSimple failed');
      onUploaded(json.data.url);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <span className="upload-btn-wrap">
      <button type="button" className={className} onClick={() => inputRef.current?.click()} disabled={uploading}>
        {uploading ? <CircleNotch size={16} className="spin" /> : done ? <Check size={16} /> : <UploadSimple size={16} />}
        {uploading ? 'Uploading...' : done ? 'Uploaded' : label}
      </button>
      <input ref={inputRef} type="file" accept={accept} onChange={handleFile} style={{ display: 'none' }} />
      {error && <span className="upload-error">{error}</span>}
      <style>{`
        .upload-btn-wrap { display: inline-flex; align-items: center; gap: 8px; flex-shrink: 0; }
        .btn-upload { display: inline-flex; align-items: center; gap: 6px; padding: 9px 14px; border-radius: var(--radius-sm); border: 1px dashed var(--primary-blue); background: #eaf2fb; color: var(--primary-blue); font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .btn-upload:hover { background: #dbe9f9; }
        .btn-upload:disabled { opacity: 0.6; cursor: not-allowed; }
        .upload-error { font-size: 0.78rem; color: #dc2626; }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </span>
  );
}
