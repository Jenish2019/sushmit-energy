'use client';

import { useState } from 'react';
import { FloppyDisk, Eye } from '@phosphor-icons/react/dist/ssr';

export default function AboutPage() {
  const [content, setContent] = useState({
    mission: 'To be a leading contributor in Nepal\'s energy sector by developing sustainable hydropower projects that drive economic growth and environmental stewardship.',
    vision: 'To illuminate Nepal with clean, reliable, and affordable hydropower energy, setting the benchmark for renewable energy development in the region.',
    objectives: 'Develop and operate hydropower projects with international standards of quality, safety, and environmental responsibility.',
    history: 'Sushmit Energy Pvt. Ltd. has been at the forefront of hydropower development in Nepal, working on multiple projects with a combined capacity of over 93 MW.',
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1>About Us</h1>
          <p>Edit company profile, mission, vision & objectives</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline" onClick={() => window.open('/about-us', '_blank')}>
            <Eye size={18} />
            Preview
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            <FloppyDisk size={18} />
            {saved ? 'Saved!' : 'FloppyDisk Changes'}
          </button>
        </div>
      </div>

      <div className="form-card">
        <div className="form-section">
          <h3>Mission Statement</h3>
          <textarea
            className="form-textarea"
            value={content.mission}
            onChange={(e) => setContent({ ...content, mission: e.target.value })}
            rows={3}
          />
        </div>

        <div className="form-section">
          <h3>Vision Statement</h3>
          <textarea
            className="form-textarea"
            value={content.vision}
            onChange={(e) => setContent({ ...content, vision: e.target.value })}
            rows={3}
          />
        </div>

        <div className="form-section">
          <h3>Objectives</h3>
          <textarea
            className="form-textarea"
            value={content.objectives}
            onChange={(e) => setContent({ ...content, objectives: e.target.value })}
            rows={3}
          />
        </div>

        <div className="form-section">
          <h3>ClockCounterClockwise / Background</h3>
          <textarea
            className="form-textarea"
            value={content.history}
            onChange={(e) => setContent({ ...content, history: e.target.value })}
            rows={4}
          />
        </div>

        {saved && <div className="toast-success">Changes saved successfully</div>}
      </div>

      <style>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }
        .page-header h1 {
          font-size: 1.5rem;
          font-weight: 700;
        }
        .page-header p {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-top: 2px;
        }
        .header-actions {
          display: flex;
          gap: 10px;
        }
        .form-card {
          background: var(--bg-white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          max-width: 800px;
        }
        .form-section h3 {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 8px;
          color: var(--text-dark);
        }
        .form-textarea {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          font-family: inherit;
          resize: vertical;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          line-height: 1.6;
        }
        .form-textarea:focus {
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 3px rgba(12,80,160,0.1);
        }
        .toast-success {
          padding: 12px 20px;
          background: #e6f7ee;
          color: var(--primary-green);
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
          font-weight: 500;
          text-align: center;
        }
        @media (max-width: 640px) {
          .page-header {
            flex-direction: column;
            gap: 12px;
          }
          .form-card {
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
}
