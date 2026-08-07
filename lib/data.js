import { connectDB, Project, BoardMember, ManagementMember, NewsArticle, Album, MediaResource, Report, Page, Contact, Setting, Job } from './api';
import { DEFAULTS } from './defaults';

const EMPTY = {};

async function withFallback(fn, fallback) {
  try {
    await connectDB();
    return await fn();
  } catch (e) {
    console.error('Data fetch failed, using defaults:', e.message);
    return fallback;
  }
}

export function formatDate(dateStr) {
  if (!dateStr) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const d = new Date(dateStr + 'T00:00:00Z');
    if (!Number.isNaN(d.getTime())) {
      return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
    }
  }
  return dateStr;
}

export function formatCapacity(capacity) {
  if (!capacity) return '';
  const str = String(capacity);
  return /\d+\s*MW/i.test(str) ? str : `${str} MW`;
}

export function toSlug(title) {
  return String(title || '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/^\-+|\-+$/g, '');
}

function mapArticle(n) {
  return {
    title: n.title || '',
    date: formatDate(n.date),
    summary: n.excerpt || '',
    excerpt: n.excerpt || '',
    category: n.category || 'Blog',
    source: n.metaTitle || n.source || '',
    image: n.image || '',
    content: n.content || '',
    author: n.metaDescription || n.author || '',
    slug: n.slug || toSlug(n.title),
    status: n.status,
  };
}

export async function getSettings() {
  return withFallback(async () => {
    const doc = await Setting.findOne().lean();
    return doc || DEFAULTS.settings;
  }, DEFAULTS.settings);
}

export async function getBannerSlides() {
  return withFallback(async () => {
    const doc = await Setting.findOne().lean();
    if (doc && Array.isArray(doc.bannerSlides) && doc.bannerSlides.length) {
      return doc.bannerSlides;
    }
    return DEFAULTS.bannerSlides;
  }, DEFAULTS.bannerSlides);
}

function deepMerge(base, override) {
  if (!override || typeof override !== 'object' || Array.isArray(override)) return override;
  const out = { ...base };
  for (const key of Object.keys(override)) {
    const baseVal = out[key];
    const val = override[key];
    if (val == null) continue;
    if (val && typeof val === 'object' && !Array.isArray(val) && baseVal && typeof baseVal === 'object' && !Array.isArray(baseVal)) {
      out[key] = deepMerge(baseVal, val);
    } else {
      out[key] = val;
    }
  }
  return out;
}

export async function getHomepage() {
  return withFallback(async () => {
    const doc = await Setting.findOne().lean();
    if (!doc || !doc.homepage || typeof doc.homepage !== 'object') return DEFAULTS.homepage;
    return deepMerge(DEFAULTS.homepage, doc.homepage);
  }, DEFAULTS.homepage);
}

export async function getContact() {
  return withFallback(async () => {
    const doc = await Contact.findOne().lean();
    if (doc) {
      return {
        address: doc.address || DEFAULTS.contact.address,
        phone: doc.phone || DEFAULTS.contact.phone,
        email: doc.email || DEFAULTS.contact.email,
        mapEmbed: doc.mapEmbed || '',
      };
    }
    return DEFAULTS.contact;
  }, DEFAULTS.contact);
}

export async function getProjects() {
  return withFallback(async () => {
    const docs = await Project.find({ published: true }).sort({ createdAt: 1 }).lean();
    if (!docs.length) return DEFAULTS.projects;
    return docs.map((p) => ({ ...p, capacity: formatCapacity(p.capacity) }));
  }, DEFAULTS.projects);
}

export async function getProjectBySlug(slug) {
  const all = await getProjects();
  const project = all.find((p) => p.slug === slug);
  if (project) return project;
  const fallback = DEFAULTS.projects.find((p) => p.slug === slug);
  return fallback || null;
}

export async function getBoardMembers() {
  return withFallback(async () => {
    const docs = await BoardMember.find().sort({ order: 1 }).lean();
    if (!docs.length) return DEFAULTS.boardMembers;
    return docs.map((m) => ({ name: m.name, title: m.title, image: m.image, description: m.description, social: m.social || {}, order: m.order }));
  }, DEFAULTS.boardMembers);
}

export async function getManagementMembers() {
  return withFallback(async () => {
    const docs = await ManagementMember.find().sort({ order: 1 }).lean();
    if (!docs.length) return DEFAULTS.managementTeam;
    return docs.map((m) => ({ name: m.name, title: m.title, image: m.image, description: m.description, order: m.order }));
  }, DEFAULTS.managementTeam);
}

export async function getNews(category) {
  const fallback = (DEFAULTS.news[category] || []).map(mapArticle);
  return withFallback(async () => {
    const docs = await NewsArticle.find({ category, status: 'Published' }).sort({ createdAt: -1 }).lean();
    if (!docs.length) return fallback;
    return docs.map(mapArticle);
  }, fallback);
}

export async function getBlogPosts() {
  const fallback = (DEFAULTS.news.Blog || []).map(mapArticle);
  return withFallback(async () => {
    const docs = await NewsArticle.find({ category: 'Blog', status: 'Published' }).sort({ createdAt: -1 }).lean();
    if (!docs.length) return fallback;
    return docs.map(mapArticle);
  }, fallback);
}

export async function getNewsArticleBySlug(slug) {
  const normalized = toSlug(slug);
  let article = null;
  try {
    await connectDB();
    const doc = await NewsArticle.findOne({ slug: normalized, status: 'Published' }).lean();
    if (doc) article = mapArticle(doc);
  } catch (e) {
    console.error('Data fetch failed, using defaults:', e.message);
  }
  if (!article) article = findArticleInDefaults(normalized);
  return article;
}

export async function getRecentArticles(limit = 5) {
  const fallback = [
    ...(DEFAULTS.news.Blog || []),
    ...(DEFAULTS.news['Press Release'] || []),
    ...(DEFAULTS.news.News || []),
  ].map(mapArticle).slice(0, limit);
  return withFallback(async () => {
    const docs = await NewsArticle.find({ status: 'Published' }).sort({ createdAt: -1 }).limit(limit).lean();
    if (!docs.length) return fallback;
    return docs.map(mapArticle);
  }, fallback);
}

function findArticleInDefaults(slug) {
  for (const items of Object.values(DEFAULTS.news)) {
    for (const n of items) {
      if (toSlug(n.slug || n.title) === slug) {
        return {
          title: n.title,
          date: formatDate(n.date),
          summary: n.excerpt || n.summary || '',
          excerpt: n.excerpt || n.summary || '',
          category: n.category || 'Blog',
          source: n.source || '',
          image: n.image || '',
          content: n.content || n.excerpt || n.summary || '',
          author: n.author || '',
          slug,
          status: 'Published',
        };
      }
    }
  }
  return null;
}

export async function getAlbums() {
  return withFallback(async () => {
    const docs = await Album.find().sort({ order: 1 }).lean();
    if (!docs.length) return DEFAULTS.galleryAlbums.map(mapAlbum);
    return docs.map(mapAlbum);
  }, DEFAULTS.galleryAlbums.map(mapAlbum));
}

function mapAlbum(a) {
  const link = a.link || '';
  const name = a.name || '';
  return {
    name,
    cover: a.cover || '',
    description: a.description || '',
    images: a.images || [],
    link,
    slug: a.slug || toSlug(link.replace(/^\/+|\/+$/g, '').split('/')[0]) || toSlug(name),
  };
}

export async function getAlbumBySlug(slug) {
  const normalized = toSlug(slug);
  let album = null;
  try {
    await connectDB();
    const doc = await Album.findOne({ $or: [{ slug: normalized }, { link: new RegExp(normalized, 'i') }] }).lean();
    if (doc) album = mapAlbum(doc);
  } catch (e) {
    console.error('Data fetch failed, using defaults:', e.message);
  }
  if (!album) album = DEFAULTS.galleryAlbums.map(mapAlbum).find((a) => a.slug === normalized) || null;
  return album;
}

export async function getMediaResources(group) {
  const fallback = group === 'publications' ? DEFAULTS.publications : DEFAULTS.mediaKit;
  return withFallback(async () => {
    const docs = await MediaResource.find({ group }).sort({ createdAt: 1 }).lean();
    if (!docs.length) return fallback;
    return docs.map((r) => ({
      title: r.title,
      description: r.description || '',
      type: r.type || 'PDF',
      size: r.size || '',
      fileUrl: r.fileUrl || '',
      date: r.date || '',
      group: r.group || group,
    }));
  }, fallback);
}

export async function getReports() {
  return withFallback(async () => {
    const docs = await Report.find().sort({ createdAt: 1 }).lean();
    if (!docs.length) return DEFAULTS.reports;
    const annual = docs.filter((r) => (r.type || 'Annual') === 'Annual');
    const quarterly = docs.filter((r) => (r.type || '') === 'Quarterly');
    const map = (r) => ({ title: r.title, date: r.date || '', size: r.size || '', fileUrl: r.fileUrl || '', type: r.type || 'Annual' });
    return {
      Annual: annual.length ? annual.map(map) : DEFAULTS.reports.Annual,
      Quarterly: quarterly.length ? quarterly.map(map) : DEFAULTS.reports.Quarterly,
    };
  }, DEFAULTS.reports);
}

export async function getJobs() {
  return withFallback(async () => {
    const docs = await Job.find({ status: 'Open' }).sort({ createdAt: -1 }).lean();
    if (!docs.length) return DEFAULTS.jobs.map(mapJob);
    return docs.map(mapJob);
  }, DEFAULTS.jobs.map(mapJob));
}

function mapJob(j) {
  return {
    title: j.title || '',
    department: j.department || '',
    location: j.location || '',
    type: j.type || 'Full-Time',
    deadline: formatDate(j.deadline),
    description: j.description || '',
    requirements: j.requirements || [],
    status: j.status || 'Open',
    slug: toSlug(j.title),
  };
}

export async function getJobBySlug(slug) {
  const normalized = toSlug(slug);
  let job = null;
  try {
    await connectDB();
    const docs = await Job.find({ status: 'Open' }).lean();
    job = docs.map(mapJob).find((x) => x.slug === normalized) || null;
  } catch (e) {
    console.error('Data fetch failed, using defaults:', e.message);
  }
  if (!job) job = DEFAULTS.jobs.map(mapJob).find((x) => x.slug === normalized) || null;
  return job;
}

export async function getPage(slug) {
  const fallbackMap = {
    'about-us': DEFAULTS.about,
    'message-of-chairman': DEFAULTS.chairman,
    'organizational-chart': DEFAULTS.orgChart,
    'investment-opportunity': DEFAULTS.investment,
    'investment-oppourtunity': DEFAULTS.investment,
    'board-of-directors': { title: 'Board of Directors', subtitle: "Our leadership team guiding Sushmit Energy's vision" },
    'our-management-team': {
      title: 'Our Management Team',
      subtitle: 'Dedicated professionals driving our vision forward',
      intro: "Our management team comprises experienced professionals with deep expertise in hydropower development, finance, and project management. Together, they ensure Sushmit Energy delivers on its commitment to sustainable energy and investor value.",
    },
    projects: { title: 'Our Projects', subtitle: 'Developing 93+ MW of sustainable hydropower across Nepal' },
    policy: DEFAULTS.policy,
  };
  const fallback = fallbackMap[slug] || EMPTY;
  return withFallback(async () => {
    const doc = await Page.findOne({ slug }).lean();
    if (!doc) return fallback;
    return { ...fallback, ...doc };
  }, fallback);
}
