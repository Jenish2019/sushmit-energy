import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Calendar, ArrowUpRight, User, Tag } from 'lucide-react';

const posts = [
  {
    title: 'The Future of Hydropower in Nepal: Opportunities and Challenges',
    date: 'March 5, 2026',
    author: 'Sushmit Energy Team',
    category: 'Industry Insights',
    excerpt: 'As Nepal continues to harness its vast hydropower potential, the sector faces both unprecedented opportunities and significant challenges that will shape the country\'s energy future.',
    image: 'https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/slider1-1024x576.jpg',
  },
  {
    title: 'How Run-of-River Hydropower Projects Minimize Environmental Impact',
    date: 'February 18, 2026',
    author: 'Sushmit Energy Team',
    category: 'Technology',
    excerpt: 'Run-of-river hydropower projects offer a sustainable alternative to large dams, generating clean electricity while significantly reducing environmental and social impacts.',
    image: 'https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/04/imageforsusmit-1024x576.png',
  },
  {
    title: 'Community Development Through Hydropower: A Case Study from Myagdi',
    date: 'January 22, 2026',
    author: 'Sushmit Energy Team',
    category: 'Community',
    excerpt: 'Sushmit Energy\'s community development initiatives in Myagdi district demonstrate how hydropower projects can create lasting positive change for local communities.',
    image: 'https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/04/imagfor2-1024x576.jpg',
  },
  {
    title: 'Understanding Nepal\'s Electricity Market: From Deficit to Surplus',
    date: 'December 10, 2025',
    author: 'Sushmit Energy Team',
    category: 'Market Analysis',
    excerpt: 'Nepal\'s electricity market has undergone a remarkable transformation from chronic power deficits to seasonal surpluses. This article explores the journey and what lies ahead.',
    image: 'https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/slider2-1024x576.jpg',
  },
  {
    title: 'Investment Opportunities in Nepal\'s Renewable Energy Sector',
    date: 'November 5, 2025',
    author: 'Sushmit Energy Team',
    category: 'Investment',
    excerpt: 'With favorable government policies and immense untapped potential, Nepal\'s renewable energy sector offers compelling investment opportunities for domestic and international investors.',
    image: 'https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/themes/sushmitenergy/images/kulekhani.jpg',
  },
  {
    title: 'Women in Energy: Empowering Female Professionals in Hydropower',
    date: 'September 28, 2025',
    author: 'Sushmit Energy Team',
    category: 'Diversity',
    excerpt: 'Sushmit Energy is committed to promoting gender diversity in the traditionally male-dominated hydropower sector through targeted hiring and professional development programs.',
    image: 'https://web.archive.org/web/20260414064744im_/https://www.sushmitenergy.com/wp-content/uploads/2017/03/slider1-1024x576.jpg',
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-banner">
          <div className="page-banner-overlay" />
          <div className="container">
            <h1>Blog</h1>
            <p>Insights, stories, and updates from Sushmit Energy</p>
          </div>
        </section>

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
                        <Calendar size={14} />
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
          .page-banner h1 {
            font-size: 1.8rem;
          }
          .blog-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
