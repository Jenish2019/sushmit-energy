import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CalendarBlank, User, ArrowUpRight, FolderOpen } from '@phosphor-icons/react/dist/ssr';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import PageHero from '../../../components/PageHero';
import RichText from '../../../components/RichText';
import ShareButtons from '../../../components/ShareButtons';
import { getNewsArticleBySlug, getRecentArticles } from '../../../lib/data';

export const dynamic = 'force-dynamic';

const listMap = {
  'Press Release': { href: '/press-releases', label: 'Press Releases' },
  News: { href: '/sushmit-news', label: 'Sushmit Energy in the News' },
  Notice: { href: '/sushmit-news', label: 'Sushmit Energy in the News' },
  Update: { href: '/sushmit-news', label: 'Sushmit Energy in the News' },
};

const quickLinks = [
  { href: '/press-releases', label: 'Press Releases' },
  { href: '/sushmit-news', label: 'Sushmit Energy in the News' },
  { href: '/media-kit', label: 'Media Kit' },
  { href: '/blog', label: 'Blog' },
  { href: '/publications', label: 'Publications' },
];

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: article.title,
    description: article.summary || article.excerpt || '',
  };
}

export default async function ArticleDetailPage({ params }) {
  const { slug } = await params;
  const article = await getNewsArticleBySlug(slug);
  if (!article) notFound();

  const recent = await getRecentArticles(4);
  const back = listMap[article.category] || { href: '/blog', label: 'Blog' };
  const isHtml = /<[a-z][\s\S]*>/i.test(article.content || '');
  const body = isHtml
    ? article.content
    : (article.content || article.summary || '').split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <>
      <Header />
      <main>
        <PageHero title={article.title} subtitle={article.summary} backLink={back} />

        <section className="section-padding">
          <div className="container article-layout">
            <article className="article-main">
              <div className="article-meta">
                <span className="article-category">{article.category}</span>
                <span className="article-date">
                  <CalendarBlank size={15} />
                  {article.date}
                </span>
                {article.author && (
                  <span className="article-author">
                    <User size={15} />
                    {article.author}
                  </span>
                )}
              </div>

              {article.image && (
                <div className="article-image">
                  <img src={article.image} alt={article.title} />
                </div>
              )}

              <div className="article-body">
                <RichText html={body} className="article-content" />
              </div>

              <div className="article-footer">
                <ShareButtons title={article.title} />
              </div>
            </article>

            <aside className="article-sidebar">
              <div className="sidebar-card">
                <h3 className="sidebar-title"><FolderOpen size={18} /> Quick Links</h3>
                <ul className="quick-links">
                  {quickLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>
                        {l.label}
                        <ArrowUpRight size={14} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-card">
                <h3 className="sidebar-title">Latest Articles</h3>
                <ul className="latest-list">
                  {recent.map((r) => (
                    <li key={r.slug}>
                      <Link href={`/media/${r.slug}`} className="latest-item">
                        {r.image && <img src={r.image} alt="" />}
                        <div>
                          <span className="latest-title">{r.title}</span>
                          <span className="latest-date">{r.date}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .article-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 340px;
          gap: 48px;
          align-items: start;
        }
        .article-main { min-width: 0; }
        .article-meta {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        .article-category {
          background: var(--primary-green);
          color: #fff;
          padding: 5px 14px;
          border-radius: 20px;
          font-size: .78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: .5px;
        }
        .article-date, .article-author {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: .85rem;
          color: var(--text-muted);
        }
        .article-image {
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-bottom: 28px;
          box-shadow: var(--shadow-lg);
        }
        .article-image img { width: 100%; display: block; }
        .article-body .article-content {
          font-size: 1.02rem;
          line-height: 1.85;
          color: var(--text-dark);
        }
        .article-content h2, .article-content h3, .article-content h4 {
          margin: 1.6em 0 .6em;
          line-height: 1.35;
          font-weight: 700;
          letter-spacing: -.01em;
        }
        .article-content h2 { font-size: 1.5rem; }
        .article-content h3 { font-size: 1.22rem; }
        .article-content p { margin-bottom: 1.25em; }
        .article-content a { color: var(--primary-blue); text-decoration: underline; }
        .article-content img { max-width: 100%; height: auto; border-radius: var(--radius-md); margin: 1.2em 0; }
        .article-content blockquote {
          border-left: 4px solid var(--primary-blue);
          background: var(--bg-light);
          padding: 14px 20px;
          margin: 1.5em 0;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          font-style: italic;
          color: var(--text-muted);
        }
        .article-content ul, .article-content ol { margin: 0 0 1.25em 1.3em; }
        .article-content li { margin-bottom: .5em; }
        .article-footer {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
        }
        .article-sidebar { display: flex; flex-direction: column; gap: 24px; position: sticky; top: 24px; }
        .sidebar-card {
          background: var(--bg-white);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          padding: 24px;
        }
        .sidebar-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 16px;
          padding-bottom: 14px;
          border-bottom: 1px solid var(--border-color);
        }
        .sidebar-title svg { color: var(--primary-green); }
        .quick-links { list-style: none; display: flex; flex-direction: column; }
        .quick-links li { border-bottom: 1px solid var(--border-color); }
        .quick-links li:last-child { border-bottom: none; }
        .quick-links a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 2px;
          color: var(--text-dark);
          font-size: .9rem;
          font-weight: 500;
          transition: color .2s, padding-left .2s;
        }
        .quick-links a:hover { color: var(--primary-blue); padding-left: 8px; }
        .latest-list { list-style: none; display: flex; flex-direction: column; gap: 14px; }
        .latest-item { display: flex; gap: 12px; align-items: center; }
        .latest-item img { width: 60px; height: 48px; object-fit: cover; border-radius: var(--radius-sm); flex-shrink: 0; }
        .latest-item > div { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
        .latest-title {
          font-size: .88rem;
          font-weight: 600;
          color: var(--text-dark);
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .latest-item:hover .latest-title { color: var(--primary-blue); }
        .latest-date { font-size: .76rem; color: var(--text-muted); }
        @media (max-width: 1024px) {
          .article-layout { grid-template-columns: 1fr; }
          .article-sidebar { position: static; }
        }
      `}</style>
    </>
  );
}
