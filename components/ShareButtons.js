'use client';

import { FacebookLogo, XLogo, LinkedinLogo, LinkSimple, Check } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';

const ICON = { width: 16, height: 16 };

export default function ShareButtons({ title }) {
  const [copied, setCopied] = useState(false);

  const href = typeof window !== 'undefined' ? window.location.href : '';
  const encodedUrl = encodeURIComponent(href);
  const encodedTitle = encodeURIComponent(title || '');

  const links = [
    { name: 'Facebook', icon: FacebookLogo, url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'X', icon: XLogo, url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}` },
    { name: 'LinkedIn', icon: LinkedinLogo, url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}` },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="share-row">
      <span className="share-label">Share</span>
      {links.map((l) => (
        <a
          key={l.name}
          className={`share-btn share-${l.name.toLowerCase()}`}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${l.name}`}
        >
          <l.icon {...ICON} />
        </a>
      ))}
      <button className="share-btn share-copy" onClick={copyLink} aria-label="Copy link">
        {copied ? <Check {...ICON} /> : <LinkSimple {...ICON} />}
      </button>

      <style>{`
        .share-row { display: inline-flex; align-items: center; gap: 10px; }
        .share-label { font-size: .85rem; font-weight: 600; color: var(--text-muted); margin-right: 2px; }
        .share-btn {
          width: 40px; height: 40px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          border: 1px solid var(--border-color); background: var(--bg-white);
          color: var(--text-dark); cursor: pointer; transition: all .2s;
        }
        .share-btn:hover { transform: translateY(-2px); border-color: var(--primary-blue); color: var(--primary-blue); box-shadow: var(--shadow-sm); }
        .share-copy { color: var(--text-muted); }
      `}</style>
    </div>
  );
}
