import { Quote } from 'lucide-react';

export default function ChairmanMessage() {
  return (
    <section className="chairman-section">
      <div className="container">
        <div className="chairman-layout">
          <div className="chairman-image-wrapper">
            <img
              src="https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/themes/sushmitenergy/images/sushilpkrl.jpg"
              alt="Sushil Pokharel"
              className="chairman-img"
            />
          </div>
          <div className="chairman-content">
            <Quote size={40} className="quote-icon" />
            <blockquote className="chairman-quote">
              &ldquo;It is my pleasure to come up with the valuable information of the company
              which will further increase the probability of participation and investment in joint
              venture. With this message I would like to focus untapped sectors of investment where
              anybody can come and start investing.&rdquo;
            </blockquote>
            <div className="chairman-author">
              <strong>Sushil Pokharel</strong>
              <span>Chairman</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .chairman-section {
          padding: 100px 0;
          background: var(--bg-light);
        }
        .chairman-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 50px;
          align-items: center;
          max-width: 900px;
          margin: 0 auto;
        }
        .chairman-image-wrapper {
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid var(--primary-green);
          box-shadow: var(--shadow-lg);
        }
        .chairman-img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          display: block;
        }
        .chairman-content {
          position: relative;
        }
        .quote-icon {
          color: var(--primary-green);
          opacity: 0.2;
          margin-bottom: 16px;
        }
        .chairman-quote {
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--text-dark);
          font-style: italic;
          margin: 0 0 24px;
          border: none;
          padding: 0;
        }
        .chairman-author {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .chairman-author strong {
          font-size: 1.1rem;
          color: var(--primary-blue);
        }
        .chairman-author span {
          font-size: 0.9rem;
          color: var(--text-muted);
        }
        @media (max-width: 768px) {
          .chairman-layout {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 30px;
          }
          .chairman-image-wrapper {
            width: 200px;
            margin: 0 auto;
          }
          .chairman-img {
            height: 200px;
          }
          .chairman-section {
            padding: 60px 0;
          }
          .chairman-quote {
            font-size: 1rem;
          }
          .chairman-author {
            align-items: center;
          }
        }
      `}</style>
    </section>
  );
}
