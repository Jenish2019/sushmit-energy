'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash, CircleNotch, Check } from '@phosphor-icons/react/dist/ssr';
import UploadButton from '@/components/UploadButton';
import { DEFAULTS } from '@/lib/defaults';

const HOME_DEFAULTS = DEFAULTS.homepage;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export default function HomepageEditorPage() {
  const [hp, setHp] = useState(clone(HOME_DEFAULTS));
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const setIntro = (field, value) => setHp({ ...hp, intro: { ...hp.intro, [field]: value } });
  const setHistory = (field, value) => setHp({ ...hp, history: { ...hp.history, [field]: value } });
  const setChairman = (field, value) => setHp({ ...hp, chairman: { ...hp.chairman, [field]: value } });

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/settings', { cache: 'no-store' });
      const json = await res.json();
      const data = json.data || {};
      if (data.homepage && typeof data.homepage === 'object') {
        setHp({
          bannerEyebrow: data.homepage.bannerEyebrow || HOME_DEFAULTS.bannerEyebrow,
          intro: { ...HOME_DEFAULTS.intro, ...data.homepage.intro },
          stats: Array.isArray(data.homepage.stats) && data.homepage.stats.length ? data.homepage.stats : HOME_DEFAULTS.stats,
          history: {
            ...HOME_DEFAULTS.history,
            ...data.homepage.history,
            items: Array.isArray(data.homepage.history?.items) && data.homepage.history.items.length ? data.homepage.history.items : HOME_DEFAULTS.history.items,
          },
          chairman: { ...HOME_DEFAULTS.chairman, ...data.homepage.chairman },
        });
      }
      if (Array.isArray(data.bannerSlides)) {
        setSlides(data.bannerSlides.length ? data.bannerSlides : DEFAULTS.bannerSlides);
      } else {
        setSlides(DEFAULTS.bannerSlides);
      }
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional fetch-on-mount data load
  useEffect(() => { load(); }, []);

  const save = async () => {
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ homepage: hp, bannerSlides: slides }),
        cache: 'no-store',
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Save failed');
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const updateSlide = (idx, patch) => {
    setSlides(slides.map((s, i) => (i === idx ? { ...s, ...patch } : s)));
  };

  const addSlide = () => {
    setSlides([...slides, { title: '', img: '', active: true }]);
  };

  const removeSlide = (idx) => {
    setSlides(slides.filter((_, i) => i !== idx));
  };

  const updateStat = (idx, patch) => {
    setHp({ ...hp, stats: hp.stats.map((s, i) => (i === idx ? { ...s, ...patch } : s)) });
  };

  const addStat = () => {
    setHp({ ...hp, stats: [...hp.stats, { value: 0, label: '' }] });
  };

  const removeStat = (idx) => {
    setHp({ ...hp, stats: hp.stats.filter((_, i) => i !== idx) });
  };

  const updateItem = (idx, patch) => {
    setHp({ ...hp, history: { ...hp.history, items: hp.history.items.map((it, i) => (i === idx ? { ...it, ...patch } : it)) } });
  };

  const addItem = () => {
    setHp({ ...hp, history: { ...hp.history, items: [...hp.history.items, { year: '', title: '', description: '', color: '#0f8a43' }] } });
  };

  const removeItem = (idx) => {
    setHp({ ...hp, history: { ...hp.history, items: hp.history.items.filter((_, i) => i !== idx) } });
  };

  if (loading) {
    return (
      <div className="empty-state"><CircleNotch size={22} className="spin" /><p>Loading homepage content...</p></div>
    );
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Homepage</h1>
          <p>Edit hero banner, welcome section, stats, history timeline &amp; leadership review</p>
        </div>
        <button className="btn btn-primary" onClick={save} disabled={saving}>
          {saving ? <CircleNotch size={16} className="spin" /> : saved ? <Check size={16} /> : null}
          {saving ? 'Saving...' : saved ? 'Saved' : 'Save Changes'}
        </button>
      </div>

      {error && <div className="alert-error">{error}</div>}

      <div className="hp-sections">
        {/* ---------- Hero Banner ---------- */}
        <section className="hp-section">
          <h2>Hero Banner</h2>
          <p className="hp-section-desc">Eyebrow text and banner slides shown at the top of the homepage.</p>
          <div className="form-group">
            <label>Banner Eyebrow</label>
            <input className="form-input" value={hp.bannerEyebrow || ''} onChange={(e) => setHp({ ...hp, bannerEyebrow: e.target.value })} placeholder="Clean Energy · Hydropower · Nepal" />
          </div>
          <div className="hp-subhead">
            <h3>Banner Slides</h3>
            <button className="btn btn-outline btn-sm" onClick={addSlide}><Plus size={14} /> Add Slide</button>
          </div>
          <div className="hp-list">
            {slides.map((slide, idx) => (
              <div key={idx} className="hp-row hp-row-slide">
                <div className="hp-thumb" style={{ backgroundImage: slide.img ? `url(${slide.img})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                  {!slide.img && <span>{idx + 1}</span>}
                </div>
                <div className="hp-row-fields">
                  <input className="form-input" value={slide.title || ''} onChange={(e) => updateSlide(idx, { title: e.target.value })} placeholder="Banner message (title)" />
                  <div className="image-row">
                    <input className="form-input" value={slide.img || ''} onChange={(e) => updateSlide(idx, { img: e.target.value })} placeholder="https://... or upload" />
                    <UploadButton onUploaded={(url) => updateSlide(idx, { img: url })} accept="image/*" label="Upload" />
                  </div>
                </div>
                <div className="hp-row-side">
                  <label className="checkbox-label">
                    <input type="checkbox" checked={!!slide.active} onChange={(e) => updateSlide(idx, { active: e.target.checked })} />
                    <span>Active</span>
                  </label>
                  <button className="icon-btn delete" title="Delete" onClick={() => removeSlide(idx)}><Trash size={16} /></button>
                </div>
              </div>
            ))}
            {slides.length === 0 && <div className="empty-state"><p>No banner slides. Click &quot;Add Slide&quot;.</p></div>}
          </div>
        </section>

        {/* ---------- Welcome & Intro ---------- */}
        <section className="hp-section">
          <h2>Welcome to Sushmit Energy</h2>
          <p className="hp-section-desc">Heading, intro text, image and badge for the welcome section.</p>
          <div className="hp-grid-2">
            <div className="form-group">
              <label>Section Label</label>
              <input className="form-input" value={hp.intro.label || ''} onChange={(e) => setIntro('label', e.target.value)} placeholder="Welcome to" />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input className="form-input" value={hp.intro.title || ''} onChange={(e) => setIntro('title', e.target.value)} placeholder="Sushmit Energy" />
            </div>
          </div>
          <div className="form-group">
            <label>Intro Text</label>
            <textarea className="form-input" rows={4} value={hp.intro.text || ''} onChange={(e) => setIntro('text', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Intro Image</label>
            <div className="image-row">
              <input className="form-input" value={hp.intro.image || ''} onChange={(e) => setIntro('image', e.target.value)} placeholder="https://... or upload" />
              <UploadButton onUploaded={(url) => setIntro('image', url)} accept="image/*" label="Upload" />
            </div>
            {hp.intro.image && <div className="image-sm"><img src={hp.intro.image} alt="preview" onError={(e) => { e.target.style.display = 'none'; }} /></div>}
          </div>
          <div className="hp-grid-2">
            <div className="form-group">
              <label>Badge Number</label>
              <input className="form-input" value={hp.intro.badgeYears || ''} onChange={(e) => setIntro('badgeYears', e.target.value)} placeholder="24+" />
            </div>
            <div className="form-group">
              <label>Badge Label</label>
              <input className="form-input" value={hp.intro.badgeLabel || ''} onChange={(e) => setIntro('badgeLabel', e.target.value)} placeholder="Years of Experience" />
            </div>
          </div>
        </section>

        {/* ---------- Stats ---------- */}
        <section className="hp-section">
          <div className="hp-subhead">
            <div>
              <h2>Stats</h2>
              <p className="hp-section-desc">Counters shown under the welcome text (workers, projects, MW).</p>
            </div>
            <button className="btn btn-outline btn-sm" onClick={addStat}><Plus size={14} /> Add Stat</button>
          </div>
          <div className="hp-list">
            {hp.stats.map((stat, idx) => (
              <div key={idx} className="hp-row">
                <div className="hp-row-fields hp-grid-2">
                  <input className="form-input" type="number" value={stat.value} onChange={(e) => updateStat(idx, { value: e.target.value })} placeholder="Value" />
                  <input className="form-input" value={stat.label || ''} onChange={(e) => updateStat(idx, { label: e.target.value })} placeholder="Label" />
                </div>
                <button className="icon-btn delete" title="Remove" onClick={() => removeStat(idx)}><Trash size={16} /></button>
              </div>
            ))}
            {hp.stats.length === 0 && <div className="empty-state"><p>No stats. Click &quot;Add Stat&quot;.</p></div>}
          </div>
        </section>

        {/* ---------- History Timeline ---------- */}
        <section className="hp-section">
          <div className="hp-subhead">
            <div>
              <h2>History Timeline</h2>
              <p className="hp-section-desc">The &quot;Our History&quot; tab content and timeline entries.</p>
            </div>
            <button className="btn btn-outline btn-sm" onClick={addItem}><Plus size={14} /> Add Entry</button>
          </div>
          <div className="hp-grid-2">
            <div className="form-group">
              <label>Tab Label</label>
              <input className="form-input" value={hp.history.label || ''} onChange={(e) => setHistory('label', e.target.value)} placeholder="Our Journey" />
            </div>
            <div className="form-group">
              <label>Tab Title</label>
              <input className="form-input" value={hp.history.title || ''} onChange={(e) => setHistory('title', e.target.value)} placeholder="Our History" />
            </div>
          </div>
          <div className="form-group">
            <label>Intro Text</label>
            <textarea className="form-input" rows={2} value={hp.history.text || ''} onChange={(e) => setHistory('text', e.target.value)} />
          </div>
          <div className="hp-list">
            {hp.history.items.map((item, idx) => (
              <div key={idx} className="hp-row hp-row-timeline">
                <div className="hp-row-fields">
                  <div className="hp-grid-3">
                    <input className="form-input" value={item.year || ''} onChange={(e) => updateItem(idx, { year: e.target.value })} placeholder="Year (2013)" />
                    <input className="form-input" value={item.title || ''} onChange={(e) => updateItem(idx, { title: e.target.value })} placeholder="Title" />
                    <div className="color-row">
                      <input type="color" value={item.color || '#0f8a43'} onChange={(e) => updateItem(idx, { color: e.target.value })} />
                      <input className="form-input" value={item.color || ''} onChange={(e) => updateItem(idx, { color: e.target.value })} placeholder="#0f8a43" />
                    </div>
                  </div>
                  <textarea className="form-input" rows={2} value={item.description || ''} onChange={(e) => updateItem(idx, { description: e.target.value })} placeholder="Description" />
                </div>
                <button className="icon-btn delete" title="Remove" onClick={() => removeItem(idx)}><Trash size={16} /></button>
              </div>
            ))}
            {hp.history.items.length === 0 && <div className="empty-state"><p>No timeline entries. Click &quot;Add Entry&quot;.</p></div>}
          </div>
        </section>

        {/* ---------- Leadership Review ---------- */}
        <section className="hp-section">
          <h2>Leadership Review</h2>
          <p className="hp-section-desc">The quote block at the bottom of the homepage.</p>
          <div className="hp-grid-2">
            <div className="form-group">
              <label>Section Label</label>
              <input className="form-input" value={hp.chairman.label || ''} onChange={(e) => setChairman('label', e.target.value)} placeholder="A Word From Leadership" />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input className="form-input" value={hp.chairman.name || ''} onChange={(e) => setChairman('name', e.target.value)} placeholder="Sushil Pokharel" />
            </div>
          </div>
          <div className="form-group">
            <label>Role</label>
            <input className="form-input" value={hp.chairman.role || ''} onChange={(e) => setChairman('role', e.target.value)} placeholder="Chairman, Sushmit Energy" />
          </div>
          <div className="form-group">
            <label>Quote</label>
            <textarea className="form-input" rows={4} value={hp.chairman.quote || ''} onChange={(e) => setChairman('quote', e.target.value)} />
          </div>
          <div className="form-group">
            <label>Photo</label>
            <div className="image-row">
              <input className="form-input" value={hp.chairman.image || ''} onChange={(e) => setChairman('image', e.target.value)} placeholder="https://... or upload" />
              <UploadButton onUploaded={(url) => setChairman('image', url)} accept="image/*" label="Upload" />
            </div>
            {hp.chairman.image && <div className="image-sm"><img src={hp.chairman.image} alt="preview" onError={(e) => { e.target.style.display = 'none'; }} /></div>}
          </div>
        </section>
      </div>

      <div className="hp-savebar">
        <button className="btn btn-primary" onClick={save} disabled={saving}>
          {saving ? <CircleNotch size={16} className="spin" /> : saved ? <Check size={16} /> : null}
          {saving ? 'Saving...' : saved ? 'Saved' : 'Save Changes'}
        </button>
      </div>

      <style>{`
        .page-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .page-header h1 { font-size: 1.5rem; font-weight: 700; }
        .page-header p { color: var(--text-muted); font-size: 0.9rem; margin-top: 2px; }
        .hp-sections { display: flex; flex-direction: column; gap: 20px; margin-bottom: 24px; }
        .hp-section { background: var(--bg-white); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 24px; }
        .hp-section > h2, .hp-subhead h2 { font-size: 1.05rem; font-weight: 700; margin-bottom: 4px; }
        .hp-section-desc { font-size: 0.82rem; color: var(--text-muted); margin-bottom: 18px; }
        .hp-subhead { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; }
        .hp-subhead h3 { font-size: 0.95rem; font-weight: 600; }
        .hp-list { display: flex; flex-direction: column; gap: 10px; margin-top: 10px; }
        .hp-row { display: flex; align-items: center; gap: 12px; background: var(--bg-light); border: 1px solid var(--border-soft); border-radius: var(--radius-sm); padding: 12px; }
        .hp-row-slide { align-items: center; }
        .hp-row-fields { flex: 1; display: flex; flex-direction: column; gap: 8px; min-width: 0; }
        .hp-row-fields.hp-grid-2 { flex-direction: row; }
        .hp-row-side { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .hp-thumb { width: 110px; height: 60px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 0.75rem; font-weight: 600; background: linear-gradient(135deg, #0c50a0, #083d7a); flex-shrink: 0; }
        .hp-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }
        .hp-row-fields.hp-grid-2 { display: flex; gap: 10px; margin-bottom: 0; }
        .hp-grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
        .color-row { display: flex; align-items: center; gap: 8px; }
        .color-row input[type='color'] { width: 40px; height: 40px; padding: 2px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); background: #fff; cursor: pointer; }
        .color-row .form-input { flex: 1; }
        .form-group { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
        .form-group label { font-size: 0.85rem; font-weight: 600; color: var(--text-dark); }
        .form-input { width: 100%; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.9rem; font-family: inherit; outline: none; transition: border-color 0.2s; }
        .form-input:focus { border-color: var(--primary-blue); box-shadow: 0 0 0 3px rgba(12,80,160,0.1); }
        textarea.form-input { resize: vertical; }
        .image-row { display: flex; gap: 8px; align-items: center; }
        .image-row .form-input { flex: 1; }
        .image-sm { margin-top: 8px; }
        .image-sm img { width: 100%; max-height: 180px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border-color); }
        .checkbox-label { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 0.85rem; }
        .checkbox-label input { width: 15px; height: 15px; accent-color: var(--primary-blue); }
        .icon-btn { width: 34px; height: 34px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--bg-white); color: var(--text-muted); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0; }
        .icon-btn:hover { border-color: var(--primary-blue); color: var(--primary-blue); }
        .icon-btn.delete:hover { border-color: #ef4444; color: #ef4444; }
        .btn-sm { padding: 8px 16px; font-size: 0.85rem; }
        .empty-state { text-align: center; padding: 30px 20px; background: var(--bg-white); border: 1px dashed var(--border-color); border-radius: var(--radius-md); color: var(--text-muted); }
        .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 12px 16px; border-radius: var(--radius-sm); margin-bottom: 16px; font-size: 0.9rem; }
        .hp-savebar { display: flex; justify-content: flex-end; position: sticky; bottom: 16px; }
        .spin { animation: spin 0.9s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .page-header { flex-direction: column; gap: 12px; }
          .hp-grid-2, .hp-grid-3 { grid-template-columns: 1fr; }
          .hp-row { flex-wrap: wrap; }
          .hp-row-fields.hp-grid-2 { flex-direction: column; }
        }
      `}</style>
    </>
  );
}
