'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { MapPin, Phone, Envelope, PaperPlaneTilt } from '@phosphor-icons/react/dist/ssr';

const DEFAULT_CONTACT = {
  address: 'Sushmit Bhawan -2nd Floor, House No 166/40467\nSubidhanagar - 35, Kathmandu, Nepal',
  phone: '+977-15199027\n+977-5199454 (Fax)',
  email: 'info@sushmitenergy.com',
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [contact, setContact] = useState(DEFAULT_CONTACT);

  useEffect(() => {
    fetch('/api/public/settings', { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => {
        if (json.contact) setContact({ ...DEFAULT_CONTACT, ...json.contact });
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        cache: 'no-store',
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || 'Failed to send message');
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <main>
        <PageHero title="Contact Us" subtitle="Get in touch with Sushmit Energy" />

        <section className="contact-section section-padding">
          <div className="container">
            <div className="contact-layout">
              <div className="contact-info">
                <div className="contact-card">
                  <div className="contact-card-icon">
                    <MapPin size={24} />
                  </div>
                  <h4>Our Address</h4>
                  <p>{contact.address.split('\n').map((line, i) => (<span key={i}>{line}<br /></span>))}</p>
                </div>
                <div className="contact-card">
                  <div className="contact-card-icon">
                    <Phone size={24} />
                  </div>
                  <h4>Phone &amp; Fax</h4>
                  <p>{contact.phone.split('\n').map((line, i) => (<span key={i}>{line}<br /></span>))}</p>
                </div>
                <div className="contact-card">
                  <div className="contact-card-icon">
                    <Envelope size={24} />
                  </div>
                  <h4>Email</h4>
                  <p>{contact.email}</p>
                </div>
              </div>

              <div className="contact-form-wrapper">
                <h2>PaperPlaneTilt Us a Message</h2>
                {submitted ? (
                  <div className="success-message">
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully. We will get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="form-input"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="form-input"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="tel"
                        placeholder="Phone (optional)"
                        className="form-input"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Subject"
                        className="form-input"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        placeholder="Your Message"
                        className="form-input form-textarea"
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                      {submitting ? 'Sending...' : 'PaperPlaneTilt Message'} <PaperPlaneTilt size={18} />
                    </button>
                    {error && <div className="form-error">{error}</div>}
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 60px;
          align-items: start;
        }
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .contact-card {
          background: var(--bg-light);
          border-radius: var(--radius-md);
          padding: 28px;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .contact-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .contact-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--primary-green);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }
        .contact-card h4 {
          font-size: 1.05rem;
          margin-bottom: 8px;
        }
        .contact-card p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
        }
        .contact-form-wrapper {
          background: var(--bg-white);
          border-radius: var(--radius-lg);
          padding: 40px;
          box-shadow: var(--shadow-sm);
          border: 1px solid var(--border-color);
        }
        .contact-form-wrapper h2 {
          font-size: 1.5rem;
          margin-bottom: 28px;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .form-group {
          margin: 0;
        }
        .form-input {
          width: 100%;
          padding: 14px 16px;
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
          min-height: 120px;
        }
        .success-message {
          text-align: center;
          padding: 40px 20px;
        }
        .success-message h3 {
          font-size: 1.5rem;
          color: var(--primary-green);
          margin-bottom: 12px;
        }
        .success-message p {
          color: var(--text-muted);
        }
        .form-error {
          padding: 12px 16px;
          background: #fee2e2;
          color: #dc2626;
          border-radius: var(--radius-sm);
          font-size: 0.9rem;
        }
        @media (max-width: 768px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }
          .contact-form-wrapper {
            padding: 24px;
          }
        }
      `}</style>
    </>
  );
}
