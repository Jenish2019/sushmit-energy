'use client';

import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';

export default function Pagination({ page, pageSize = 10, total, onChange }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(page, pages);

  const go = (p) => {
    const next = Math.max(1, Math.min(pages, p));
    if (next !== current) onChange(next);
  };

  const numbers = [];
  if (pages <= 7) {
    for (let i = 1; i <= pages; i++) numbers.push(i);
  } else {
    numbers.push(1);
    const start = Math.max(2, current - 1);
    const end = Math.min(pages - 1, current + 1);
    if (start > 2) numbers.push('…');
    for (let i = start; i <= end; i++) numbers.push(i);
    if (end < pages - 1) numbers.push('…');
    numbers.push(pages);
  }

  if (total <= pageSize) return null;

  return (
    <>
      <div className="pagination">
        <button className="pg-btn" onClick={() => go(current - 1)} disabled={current === 1} aria-label="Previous page">
          <CaretLeft size={16} />
        </button>
        {numbers.map((n, i) =>
          n === '…' ? (
            <span key={`e${i}`} className="pg-ellipsis">…</span>
          ) : (
            <button key={n} className={`pg-btn pg-num ${n === current ? 'active' : ''}`} onClick={() => go(n)}>
              {n}
            </button>
          )
        )}
        <button className="pg-btn" onClick={() => go(current + 1)} disabled={current === pages} aria-label="Next page">
          <CaretRight size={16} />
        </button>
        <span className="pg-total">
          {total} item{total === 1 ? '' : 's'}
        </span>
      </div>
      <style>{`
        .pagination { display: flex; align-items: center; gap: 6px; padding: 14px 20px; border-top: 1px solid var(--border-color); flex-wrap: wrap; }
        .pg-btn { min-width: 34px; height: 34px; padding: 0 8px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); background: var(--bg-white); color: var(--text-muted); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; font-size: 0.85rem; transition: all 0.2s; }
        .pg-btn:hover:not(:disabled) { border-color: var(--primary-blue); color: var(--primary-blue); }
        .pg-btn.active { background: var(--primary-blue); border-color: var(--primary-blue); color: #fff; font-weight: 600; }
        .pg-btn:disabled { opacity: 0.45; cursor: not-allowed; }
        .pg-ellipsis { color: var(--text-light); padding: 0 2px; }
        .pg-total { margin-left: auto; font-size: 0.82rem; color: var(--text-muted); }
        @media (max-width: 640px) { .pg-total { margin-left: 0; width: 100%; } }
      `}</style>
    </>
  );
}