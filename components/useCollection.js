'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export default function useCollection(apiPath, { query = '', cache = 'no-store' } = {}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; };
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiPath}${query}`, { cache });
      const json = await res.json();
      if (!mounted.current) return;
      if (json.success) {
        setItems(json.data);
        setError(null);
      } else {
        setError(json.error || 'Failed to load');
      }
    } catch (e) {
      if (mounted.current) setError(e.message);
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, [apiPath, query, cache]);

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional fetch-on-mount data load
  useEffect(() => { load(); }, [load]);

  const request = useCallback(async (url, options) => {
    const res = await fetch(url, {
      cache: 'no-store',
      headers: options?.body ? { 'Content-Type': 'application/json' } : undefined,
      ...options,
    });
    const json = await res.json();
    if (!json.success) throw new Error(json.error || 'Request failed');
    return json.data;
  }, []);

  const createItem = useCallback(async (data) => {
    setSaving(true);
    try {
      const created = await request(apiPath, { method: 'POST', body: JSON.stringify(data) });
      await load();
      return created;
    } finally {
      setSaving(false);
    }
  }, [apiPath, request, load]);

  const updateItem = useCallback(async (id, data) => {
    setSaving(true);
    try {
      const updated = await request(`${apiPath}/${id}`, { method: 'PUT', body: JSON.stringify(data) });
      await load();
      return updated;
    } finally {
      setSaving(false);
    }
  }, [apiPath, request, load]);

  const deleteItem = useCallback(async (id) => {
    setSaving(true);
    try {
      await request(`${apiPath}/${id}`, { method: 'DELETE' });
      await load();
      return true;
    } finally {
      setSaving(false);
    }
  }, [apiPath, request, load]);

  return { items, loading, error, saving, load, createItem, updateItem, deleteItem, request };
}
