'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { UploadSimple, PaperPlaneTilt, CheckCircle, FileArrowUp } from '@phosphor-icons/react/dist/ssr';

export default function ResumePage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    fileName: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, fileName: file.name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main>
        <PageHero title="Drop Your Resume" subtitle="Join our talent pool for future opportunities" />

        <section className="section-padding">
          <div className="container">
            <div className="resume-layout">
              <div className="resume-info">
                <h2>Submit Your Application</h2>
                <p>
                  Even if you don&apos;t see a current opening that matches your profile, we welcome you to
                  submit your resume for future consideration. Sushmit Energy is always looking for talented
                  professionals to join our growing team.
                </p>
                <div className="resume-benefits">
                  <h3>Why join Sushmit Energy?</h3>
                  <ul>
                    <li>Be part of Nepal&apos;s renewable energy revolution</li>
                    <li>Work on impactful hydropower projects</li>
                    <li>Competitive compensation and benefits</li>
                    <li>Professional development opportunities</li>
                    <li>Collaborative and inclusive work environment</li>
                  </ul>
                </div>
              </div>

              <div className="resume-form-wrapper">
                {submitted ? (
                  <div className="success-message">
                    <CheckCircle size={48} />
                    <h3>Application Submitted!</h3>
                    <p>Thank you for your interest in joining Sushmit Energy. We will review your application and contact you if your profile matches our requirements.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="resume-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-input"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          name="email"
                          className="form-input"
                          value={form.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          className="form-input"
                          value={form.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Position Interested In</label>
                      <input
                        type="text"
                        name="position"
                        className="form-input"
                        placeholder="e.g., Hydropower Engineer, Finance Manager"
                        value={form.position}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Cover Message (Optional)</label>
                      <textarea
                        name="message"
                        className="form-input form-textarea"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>UploadSimple Resume (PDF/DOC)</label>
                      <div className="file-input-wrapper">
                        <input
                          type="file"
                          id="resume-upload"
                          className="file-input"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="resume-upload" className="file-label">
                          <FileArrowUp size={20} />
                          {form.fileName ? form.fileName : 'Choose File'}
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-green" style={{ width: '100%', justifyContent: 'center' }}>
                      Submit Application <PaperPlaneTilt size={18} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .resume-layout {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 60px;
          align-items: start;
        }
        .resume-info h2 {
          font-size: 1.6rem;
          margin-bottom: 16px;
        }
        .resume-info > p {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 30px;
        }
        .resume-benefits h3 {
          font-size: 1.1rem;
          margin-bottom: 16px;
        }
        .resume-benefits ul {
          list-style: none;
          padding: 0;
        }
        .resume-benefits li {
          padding: 8px 0;
          font-size: 0.9rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .resume-benefits li::before {
          content: '';
          width: 8px;
          height: 8px;
          background: var(--primary-green);
          border-radius: 50%;
          flex-shrink: 0;
        }
        .resume-form-wrapper {
          background: var(--bg-white);
          border-radius: var(--radius-lg);
          padding: 36px;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
        }
        .resume-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .form-group label {
          font-size: 0.9rem;
          font-weight: 600;
        }
        .form-input {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          font-size: 0.95rem;
          transition: border-color 0.3s, box-shadow 0.3s;
          outline: none;
          font-family: inherit;
        }
        .form-input:focus {
          border-color: var(--primary-blue);
          box-shadow: 0 0 0 3px rgba(12,80,160,0.1);
        }
        .form-textarea {
          resize: vertical;
          min-height: 100px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .file-input-wrapper {
          position: relative;
        }
        .file-input {
          position: absolute;
          opacity: 0;
          width: 0.1px;
          height: 0.1px;
        }
        .file-label {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: 0.9rem;
          color: var(--text-muted);
          transition: border-color 0.3s, background 0.3s;
        }
        .file-label:hover {
          border-color: var(--primary-blue);
          background: var(--bg-light);
        }
        .success-message {
          text-align: center;
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .success-message h3 {
          font-size: 1.5rem;
          color: var(--primary-green);
        }
        .success-message p {
          color: var(--text-muted);
          max-width: 400px;
        }
        @media (max-width: 768px) {
          .resume-layout {
            grid-template-columns: 1fr;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
          .resume-form-wrapper {
            padding: 24px;
          }
        }
      `}</style>
    </>
  );
}
