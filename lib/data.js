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
  const fallback = DEFAULTS.news[category] || [];
  return withFallback(async () => {
    const docs = await NewsArticle.find({ category, status: 'Published' }).sort({ createdAt: -1 }).lean();
    if (!docs.length) return fallback;
    return docs.map((n) => ({
      title: n.title,
      date: formatDate(n.date),
      summary: n.excerpt || '',
      category: n.category,
      source: n.metaTitle || '',
      image: n.image || '',
      content: n.content || '',
      author: n.metaDescription || '',
      slug: n.slug || '',
    }));
  }, fallback);
}

export async function getBlogPosts() {
  return withFallback(async () => {
    const docs = await NewsArticle.find({ category: 'Blog', status: 'Published' }).sort({ createdAt: -1 }).lean();
    if (!docs.length) return DEFAULTS.news.Blog || [];
    return docs.map((n) => ({
      title: n.title,
      date: formatDate(n.date),
      author: n.metaTitle || 'Sushmit Energy Team',
      category: n.excerpt ? 'Blog' : 'Blog',
      excerpt: n.excerpt || '',
      image: n.image || '',
      slug: n.slug || '',
    }));
  }, DEFAULTS.news.Blog || []);
}

export async function getAlbums() {
  return withFallback(async () => {
    const docs = await Album.find().sort({ order: 1 }).lean();
    if (!docs.length) return DEFAULTS.galleryAlbums;
    return docs.map((a) => ({
      name: a.name,
      cover: a.cover || '',
      description: a.description || '',
      images: a.images || [],
      link: a.link || '',
    }));
  }, DEFAULTS.galleryAlbums);
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
    if (!docs.length) return DEFAULTS.jobs;
    return docs.map((j) => ({
      title: j.title,
      department: j.department || '',
      location: j.location || '',
      type: j.type || 'Full-Time',
      deadline: formatDate(j.deadline),
      description: j.description || '',
      requirements: j.requirements || [],
      status: j.status || 'Open',
    }));
  }, DEFAULTS.jobs);
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
    policy: DEFAULTS.policy,
  };
  const fallback = fallbackMap[slug] || EMPTY;
  return withFallback(async () => {
    const doc = await Page.findOne({ slug }).lean();
    if (!doc) return fallback;
    return { ...fallback, ...doc };
  }, fallback);
}
