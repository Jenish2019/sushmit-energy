'use client';

import { useEffect, useState, useCallback } from 'react';
import { Envelope, CircleNotch, Trash, ArrowSquareOut } from '@phosphor-icons/react/dist/ssr';
import Pagination from '@/components/Pagination';

const PAGE_SIZE = 10;

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/messages', { cache: 'no-store' });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed to load messages');
      setMessages(json.data || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleRead = async (m) => {
    try {
      const res = await fetch(`/api/admin/messages/${m._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !m.read }),
        cache: 'no-store',
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Update failed');
      setMessages((prev) => prev.map((x) => (x._id === m._id ? { ...x, read: !m.read } : x)));
    } catch (e) {
      window.alert(e.message);
    }
  };

  const handleDelete = async (m) => {
    if (!window.confirm(`Delete message from "${m.name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/messages/${m._id}`, { method: 'DELETE', cache: 'no-store' });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Delete failed');
      await load();
    } catch (e) {
      window.alert(e.message);
    }
  };

  const pageItems = messages.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const formatDate = (d) => (d ? String(d).slice(0, 10) : '');

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Messages</h1>
          <p>Contact form submissions — see who is reaching out to Sushmit Energy</p>
        </div>
      </div>

      <div className="table-wrapper">
        {loading ? (
          <div className="msg-loading"><CircleNotch size={20} className="spin" /> Loading messages...</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>From</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((m) => (
                <tr key={m._id} className={m.read ? 'msg-read' : 'msg-unread'}>
                  <td>
                    <div className="msg-from">
                      <span className={`msg-avatar ${m.read ? '' : 'unread'}`}>{String(m.name || '?').charAt(0).toUpperCase()}</span>
                      <div className="msg-from-info">
                        <strong>{m.name}</strong>
                        <a href={`mailto:${m.email}`} className="msg-mail">{m.email}</a>
                        {m.phone ? <span className="msg-phone">{m.phone}</span> : null}
                      </div>
                    </div>
                  </td>
                  <td className="td-subject">{m.subject || <span className="no-file">No subject</span>}</td>
                  <td className="td-message">{m.message}</td>
                  <td className="td-date">{formatDate(m.createdAt || m.updatedAt || '')}</td>
                  <td>
                    <button className={`msg-status ${m.read ? 'read' : 'unread'}`} onClick={() => toggleRead(m)}>
                      {m.read ? 'Read' : 'Unread'}
                    </button>
                  </td>
                  <td>
                    <div className="td-actions">
                      {m.email && (
                        <a className="icon-btn" title="Email" href={`mailto:${m.email}?subject=${encodeURIComponent(m.subject || '')}`}>
                          <Envelope size={16} />
                        </a>
                      )}
                      <button className="icon-btn delete" title="Delete" onClick={() => handleDelete(m)}><Trash size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!loading && messages.length === 0 && <div className="empty-state"><p>No messages yet. Contact form submissions will appear here.</p></div>}
        {!loading && messages.length > 0 && (
          <Pagination page={page} pageSize={PAGE_SIZE} total={messages.length} onChange={setPage} />
        )}
        {error && !loading && <div className="msg-error">{error}</div>}
      </div>

      <style>{`
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .page-header h1 { font-size: 1.5rem; font-weight: 700; }
        .page-header p { color: var(--text-muted); font-size: 0.9rem; margin-top: 2px; }
        .table-wrapper { background: var(--bg-white); border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden; }
        .data-table { width: 100%; border-collapse: collapse; }
        .data-table th { text-align: left; padding: 14px 20px; font-size: 0.8rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid var(--border-color); background: var(--bg-light); }
        .data-table td { padding: 14px 20px; font-size: 0.9rem; border-bottom: 1px solid var(--border-color); vertical-align: top; }
        .data-table tr:last-child td { border-bottom: none; }
        .msg-unread td { background: #f3f8ff; }
        .msg-from { display: flex; align-items: center; gap: 12px; min-width: 200px; }
        .msg-avatar { width: 38px; height: 38px; border-radius: 50%; background: var(--bg-light); color: var(--primary-blue); display: flex; align-items: center; justify-content: center; font-weight: 700; flex-shrink: 0; }
        .msg-avatar.unread { background: var(--primary-blue); color: #fff; }
        .msg-from-info { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .msg-from-info strong { font-size: 0.92rem; }
        .msg-mail { font-size: 0.8rem; color: var(--primary-blue); text-decoration: none; }
        .msg-phone { font-size: 0.78rem; color: var(--text-muted); }
        .td-subject { max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 600; }
        .td-message { max-width: 320px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text-muted); }
        .td-date { color: var(--text-muted); white-space: nowrap; }
        .no-file { font-size: 0.8rem; color: var(--text-light); font-style: italic; }
        .msg-status { border: 1px solid var(--border-color); border-radius: 20px; padding: 4px 12px; font-size: 0.78rem; font-weight: 600; cursor: pointer; background: var(--bg-white); }
        .msg-status.read { color: var(--primary-green); border-color: #b7e0c6; background: #e6f7ee; }
        .msg-status.unread { color: var(--primary-blue); border-color: #b3cdf2; background: #e8f0fe; }
        .td-actions { display: flex; gap: 6px; }
        .icon-btn { width: 34px; height: 34px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-white); color: var(--text-muted); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; transition: all 0.2s; }
        .icon-btn:hover { border-color: var(--primary-blue); color: var(--primary-blue); }
        .icon-btn.delete:hover { border-color: #ef4444; color: #ef4444; }
        .msg-loading { display: flex; align-items: center; gap: 10px; padding: 50px 20px; color: var(--text-muted); justify-content: center; }
        .msg-error { padding: 20px; color: #dc2626; text-align: center; }
        .empty-state { text-align: center; padding: 60px 20px; color: var(--text-muted); }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) { .page-header { flex-direction: column; gap: 12px; } .td-message { display: none; } }
      `}</style>
    </>
  );
}