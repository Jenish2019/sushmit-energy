'use client';

import { useState, useCallback, useEffect } from 'react';
import { X, CaretLeft, CaretRight, ImageSquare } from '@phosphor-icons/react/dist/ssr';

export default function AlbumLightbox({ images }) {
  const [open, setOpen] = useState(null);

  const items = (images || []).map((im, i) => ({ url: im.url || im.image || im, caption: im.caption || '', i }));
  const hasImages = items.length > 0;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((dir) => {
    setOpen((cur) => {
      if (cur === null) return null;
      return (cur + dir + items.length) % items.length;
    });
  }, [items.length]);

  useEffect(() => {
    if (open === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close, step]);

  if (!hasImages) {
    return (
      <div className="album-empty">
        <ImageSquare size={40} />
        <p>No photos in this album yet.</p>
      </div>
    );
  }

  const current = items[open];

  return (
    <>
      <div className="album-grid">
        {items.map((item, idx) => (
          <button key={item.url + idx} className="album-thumb" onClick={() => setOpen(idx)} aria-label={`View photo ${idx + 1}`}>
            <img src={item.url} alt={item.caption || `Photo ${idx + 1}`} loading="lazy" />
            {item.caption && <span className="album-thumb-caption">{item.caption}</span>}
          </button>
        ))}
      </div>

      {open !== null && current && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button className="lightbox-close" onClick={close} aria-label="Close"><X size={22} /></button>
          <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous"><CaretLeft size={28} /></button>
          <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img src={current.url} alt={current.caption || 'Photo'} />
            {current.caption && <figcaption>{current.caption}</figcaption>}
          </figure>
          <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next"><CaretRight size={28} /></button>
        </div>
      )}

      <style>{`
        .album-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:18px; }
        .album-thumb { position:relative; border:none; padding:0; background:none; cursor:pointer; border-radius:var(--radius-md); overflow:hidden; aspect-ratio:4/3; }
        .album-thumb img { width:100%; height:100%; object-fit:cover; display:block; transition:transform .5s var(--ease-out-expo); }
        .album-thumb:hover img { transform:scale(1.07); }
        .album-thumb-caption { position:absolute; left:0; right:0; bottom:0; padding:22px 12px 10px; font-size:.8rem; color:#fff; text-align:left; background:linear-gradient(transparent, rgba(5,16,36,.75)); }
        .album-empty { display:flex; flex-direction:column; align-items:center; gap:10px; padding:80px 20px; color:var(--text-muted); border:1px dashed var(--border-color); border-radius:var(--radius-md); }
        .lightbox { position:fixed; inset:0; background:rgba(5,16,36,.94); z-index:1000; display:flex; align-items:center; justify-content:center; padding:32px; animation:fadeIn .25s ease; }
        .lightbox-figure { margin:0; max-width:100%; max-height:90vh; display:flex; flex-direction:column; align-items:center; gap:12px; }
        .lightbox-figure img { max-width:100%; max-height:82vh; object-fit:contain; border-radius:var(--radius-sm); box-shadow:var(--shadow-xl); }
        .lightbox-figure figcaption { color:rgba(255,255,255,.85); font-size:.9rem; }
        .lightbox-close, .lightbox-nav { position:absolute; background:rgba(255,255,255,.1); border:none; color:#fff; width:46px; height:46px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background .2s; }
        .lightbox-close { top:24px; right:24px; }
        .lightbox-nav { top:50%; transform:translateY(-50%); }
        .lightbox-nav.prev { left:20px; }
        .lightbox-nav.next { right:20px; }
        .lightbox-close:hover, .lightbox-nav:hover { background:rgba(255,255,255,.25); }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @media (max-width:640px) { .album-grid { grid-template-columns:1fr; } .lightbox { padding:16px; } .lightbox-nav.prev { left:8px; } .lightbox-nav.next { right:8px; } }
      `}</style>
    </>
  );
}
