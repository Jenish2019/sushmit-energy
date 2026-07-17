'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <h1>Contact Us</h1>
            <p>Get in touch with Sushmit Energy</p>
          </div>
        </section>

        <section className="contact-section section-padding">
          <div className="container">
            <div className="contact-layout">
              <div className="contact-info">
                <div className="contact-card">
                  <div className="contact-card-icon">
                    <MapPin size={24} />
                  </div>
                  <h4>Our Address</h4>
                  <p>
                    Sushmit Bhawan -2nd Floor, House No 166/40467
                    <br />
                    Subidhanagar - 35, Kathmandu, Nepal
                  </p>
                </div>
                <div className="contact-card">
                  <div className="contact-card-icon">
                    <Phone size={24} />
                  </div>
                  <h4>Phone &amp; Fax</h4>
                  <p>
                    +977-15199027
                    <br />
                    +977-5199454 (Fax)
                  </p>
                </div>
                <div className="contact-card">
                  <div className="contact-card-icon">
                    <Mail size={24} />
                  </div>
                  <h4>Email</h4>
                  <p>info@sushmitenergy.com</p>
                </div>
              </div>

              <div className="contact-form-wrapper">
                <h2>Send Us a Message</h2>
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
                    <button type="submit" className="btn btn-primary">
                      Send Message <Send size={18} />
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
        .page-banner {
          position: relative;
          padding: 100px 0;
          background: linear-gradient(135deg, var(--primary-blue-dark), var(--primary-blue));
          text-align: center;
          color: white;
        }
        .page-banner-overlay {
          position: absolute;
          inset: 0;
          background: url('https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/themes/sushmitenergy/images/kulekhani.jpg') center/cover no-repeat;
          opacity: 0.1;
        }
        .page-banner .container {
          position: relative;
          z-index: 1;
        }
        .page-banner h1 {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 12px;
        }
        .page-banner p {
          font-size: 1.1rem;
          opacity: 0.85;
        }
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
        @media (max-width: 768px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }
          .page-banner h1 {
            font-size: 1.8rem;
          }
          .contact-form-wrapper {
            padding: 24px;
          }
        }
      `}</style>
    </>
  );
}
