export default function RichText({ html, as, className }) {
  const Tag = as || 'div';
  if (Array.isArray(html)) {
    return (
      <Tag className={className}>
        {html.map((p, i) => <p key={i}>{p}</p>)}
      </Tag>
    );
  }
  if (typeof html === 'string' && html.trim()) {
    return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return null;
}