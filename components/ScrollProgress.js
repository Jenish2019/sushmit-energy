'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const total = h.scrollHeight - h.clientHeight;
        setProgress(total > 0 ? h.scrollTop / total : 0);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${progress})` }} />
      <style>{`
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          z-index: 1300;
          pointer-events: none;
        }
        .scroll-progress span {
          display: block;
          height: 100%;
          width: 100%;
          background: var(--grad-brand);
          transform-origin: left;
          transform: scaleX(0);
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .scroll-progress { display: none; }
        }
      `}</style>
    </div>
  );
}
