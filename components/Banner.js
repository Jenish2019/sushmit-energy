'use client';

import { useState, useEffect, useCallback } from 'react';

const slides = [
  {
    img: "https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/IMG_7069.jpg",
    title: "EXPERTS IN HYDRO POWER PROJECT"
  },
  {
    img: "https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/slider4.jpg",
    title: "We Build Better Hydro Project & Ensure Standing Wealth Creation."
  },
  {
    img: "https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/Hydro-Village-Feasibility-Study-2.jpg",
    title: "FUTURE OF HYDRO ENERGY IN NEPAL"
  },
  {
    img: "https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/slider3.jpg",
    title: "PIONEER IN INNOVATION AND DESIGN"
  },
  {
    img: "https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/sliderhome.jpg",
    title: "CLEAN & SUSTAINABLE HYDROENERGY"
  }
];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="banner">
      <div className="flexslider">
        <ul className="slides">
          {slides.map((slide, i) => (
            <li key={i} style={{ display: i === current ? 'block' : 'none' }}>
              <img width="1600" height="968" src={slide.img} className="img-responsive wp-post-image" alt="" />
              <div className="slider-text">
                <h1 className="title">{slide.title}</h1>
                <a href="/about-us/" className="btn btn-green2">Learn more</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}