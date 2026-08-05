'use client';

import { useRef, useCallback } from 'react';
import { TextB, TextItalic, TextUnderline, ListBullets, ListNumbers, TextHOne, TextHTwo, Paragraph, Quotes } from '@phosphor-icons/react/dist/ssr';

const tools = [
  { cmd: 'bold', icon: TextB, label: 'TextB' },
  { cmd: 'italic', icon: TextItalic, label: 'TextItalic' },
  { cmd: 'underline', icon: TextUnderline, label: 'TextUnderline' },
  { type: 'divider' },
  { cmd: 'formatBlock', value: 'h2', icon: TextHOne, label: 'Heading 1' },
  { cmd: 'formatBlock', value: 'h3', icon: TextHTwo, label: 'Heading 2' },
  { cmd: 'formatBlock', value: 'p', icon: Paragraph, label: 'Paragraph' },
  { type: 'divider' },
  { cmd: 'insertUnorderedList', icon: ListBullets, label: 'Bullet ListBullets' },
  { cmd: 'insertOrderedList', icon: ListNumbers, label: 'Numbered ListBullets' },
  { type: 'divider' },
  { cmd: 'formatBlock', value: 'blockquote', icon: Quotes, label: 'Quotes' },
];

export default function RichTextEditor({ value, onChange, placeholder, style }) {
  const editorRef = useRef(null);

  const exec = useCallback((cmd, value) => {
    document.execCommand(cmd, false, value || null);
    if (editorRef.current) editorRef.current.focus();
    if (onChange) onChange(editorRef.current.innerHTML);
  }, [onChange]);

  const handleInput = () => {
    if (onChange) onChange(editorRef.current.innerHTML);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <div className="rte-wrapper" style={style}>
      <div className="rte-toolbar">
        {tools.map((t, i) =>
          t.type === 'divider' ? (
            <span key={i} className="rte-divider" />
          ) : (
            <button
              key={i}
              type="button"
              className="rte-btn"
              title={t.label}
              onMouseDown={(e) => { e.preventDefault(); exec(t.cmd, t.value); }}
            >
              <t.icon size={16} />
            </button>
          )
        )}
      </div>
      <div
        ref={editorRef}
        className="rte-editor"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onPaste={handlePaste}
        data-placeholder={placeholder}
        dangerouslySetInnerHTML={{ __html: value || '' }}
      />
      <style>{`
        .rte-wrapper {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .rte-toolbar {
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 6px 8px;
          background: var(--bg-light);
          border-bottom: 1px solid var(--border-color);
          flex-wrap: wrap;
        }
        .rte-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          border: none;
          background: transparent;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }
        .rte-btn:hover {
          background: var(--bg-white);
          color: var(--text-dark);
        }
        .rte-divider {
          width: 1px;
          height: 20px;
          background: var(--border-color);
          margin: 0 4px;
        }
        .rte-editor {
          min-height: 200px;
          max-height: 320px;
          padding: 14px 16px;
          font-size: 0.9rem;
          line-height: 1.7;
          outline: none;
          overflow-y: auto;
          font-family: inherit;
        }
        .rte-editor:empty::before {
          content: attr(data-placeholder);
          color: var(--text-light);
          pointer-events: none;
        }
        .rte-editor h2 { font-size: 1.3rem; font-weight: 700; margin: 12px 0 6px; }
        .rte-editor h3 { font-size: 1.1rem; font-weight: 600; margin: 10px 0 4px; }
        .rte-editor blockquote {
          border-left: 3px solid var(--primary-blue);
          padding: 8px 16px;
          margin: 10px 0;
          color: var(--text-muted);
          font-style: italic;
          background: var(--bg-light);
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
        }
        .rte-editor ul, .rte-editor ol {
          padding-left: 24px;
          margin: 8px 0;
        }
        .rte-editor li {
          margin-bottom: 4px;
        }
        .rte-editor p {
          margin: 4px 0;
        }
      `}</style>
    </div>
  );
}
