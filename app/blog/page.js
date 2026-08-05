import Header from '../../components/Header';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { CalendarBlank, ArrowUpRight, User, Tag } from '@phosphor-icons/react/dist/ssr';
import { getBlogPosts } from '../../lib/data';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await getBlogPosts();
  return (
    <>
      <Header />
      <main>
        <PageHero title="Blog" subtitle="Insights, stories, and updates from Sushmit Energy" />

        <section className="section-padding">
          <div className="container">
            <div className="blog-grid">
              {posts.map((post, i) => (
                <article key={i} className="blog-card">
                  <div className="blog-image">
                    <img src={post.image} alt={post.title} />
                    <span className="blog-category">{post.category}</span>
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span className="blog-date">
                        <CalendarBlank size={14} />
                        {post.date}
                      </span>
                      <span className="blog-author">
                        <User size={14} />
                        {post.author}
                      </span>
                    </div>
                    <h2 className="blog-title">{post.title}</h2>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <a href="#" className="blog-read-more">
                      Read More <ArrowUpRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <style>{`
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 30px;
        }
        .blog-card {
          background: var(--bg-white);
          border-radius: var(--radius-md);
          overflow: hidden;
          border: 1px solid var(--border-color);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .blog-image {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        .blog-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s;
        }
        .blog-card:hover .blog-image img {
          transform: scale(1.08);
        }
        .blog-category {
          position: absolute;
          top: 16px;
          left: 16px;
          background: var(--primary-green);
          color: white;
          padding: 4px 14px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .blog-content {
          padding: 24px;
        }
        .blog-meta {
          display: flex;
          gap: 16px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .blog-date,
        .blog-author {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .blog-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 10px;
          line-height: 1.4;
        }
        .blog-excerpt {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .blog-read-more {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--primary-blue);
          font-weight: 600;
          font-size: 0.9rem;
          transition: gap 0.3s;
        }
        .blog-read-more:hover {
          gap: 10px;
        }
        @media (max-width: 768px) {
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
