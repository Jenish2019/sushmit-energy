'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    img: "https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/IMG_7069.jpg",
    title: "Experts in Hydro Power Project",
  },
  {
    img: "https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/slider4.jpg",
    title: "We Build Better Hydro Project & Ensure Standing Wealth Creation.",
  },
  {
    img: "https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/Hydro-Village-Feasibility-Study-2.jpg",
    title: "Future of Hydro Energy in Nepal",
  },
  {
    img: "https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/slider3.jpg",
    title: "Pioneer in Innovation and Design",
  },
  {
    img: "https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/sliderhome.jpg",
    title: "Clean & Sustainable Hydro Energy",
  },
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => {
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % slides.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="banner">
      <div className="banner-slides">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`banner-slide ${i === current ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="banner-overlay" />
            <div className="banner-content">
              <h1 className="banner-title">{slide.title}</h1>
              <a href="/about-us/" className="btn btn-green banner-cta">
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>

      <button className="banner-arrow banner-arrow-left" onClick={prev} aria-label="Previous slide">
        <ChevronLeft size={28} />
      </button>
      <button className="banner-arrow banner-arrow-right" onClick={next} aria-label="Next slide">
        <ChevronRight size={28} />
      </button>

      <div className="banner-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <style>{`
        .banner {
          position: relative;
          height: 85vh;
          min-height: 500px;
          max-height: 700px;
          overflow: hidden;
          background: var(--text-dark);
        }
        .banner-slides {
          position: relative;
          height: 100%;
        }
        .banner-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 0.8s ease;
        }
        .banner-slide.active {
          opacity: 1;
        }
        .banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(12,80,160,0.7) 0%, rgba(15,138,67,0.5) 100%);
        }
        .banner-content {
          position: relative;
          z-index: 2;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 20px;
          max-width: 800px;
          margin: 0 auto;
        }
        .banner-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: white;
          line-height: 1.2;
          margin-bottom: 30px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .banner-cta {
          font-size: 1.05rem;
          padding: 14px 36px;
        }
        .banner-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(4px);
          border: none;
          color: white;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s;
        }
        .banner-arrow:hover {
          background: rgba(255,255,255,0.3);
        }
        .banner-arrow-left { left: 20px; }
        .banner-arrow-right { right: 20px; }
        .banner-dots {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          display: flex;
          gap: 10px;
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid white;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s;
        }
        .dot.active {
          background: var(--primary-green);
          border-color: var(--primary-green);
          transform: scale(1.2);
        }
        @media (max-width: 768px) {
          .banner {
            min-height: 400px;
            max-height: 500px;
          }
          .banner-arrow {
            width: 36px;
            height: 36px;
          }
          .banner-arrow svg {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </section>
  );
}
