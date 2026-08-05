'use client';

import { useEffect, useRef } from 'react';
import { X } from '@phosphor-icons/react/dist/ssr';

const sizeMap = {
  default: '520px',
  large: '720px',
};

export default function AdminModal({ open, onClose, title, children, size = 'default' }) {
  const overlayRef = useRef(null);
  const maxWidth = sizeMap[size] || sizeMap.default;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="modal-overlay" ref={overlayRef} onClick={(e) => { if (e.target === overlayRef.current) onClose(); }} />
      <div className="modal-container" style={{ maxWidth }}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.15s ease;
        }
        .modal-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: var(--bg-white);
          border-radius: var(--radius-lg);
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
          z-index: 1001;
          width: 90%;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          animation: slideUp 0.2s ease;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border-color);
        }
        .modal-header h2 {
          font-size: 1.15rem;
          font-weight: 700;
        }
        .modal-close {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .modal-close:hover {
          background: var(--bg-light);
          color: var(--text-dark);
        }
        .modal-body {
          padding: 24px;
          overflow-y: auto;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </>
  );
}
