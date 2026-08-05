const { MongoClient } = require('mongodb');
const path = require('path');
const { DEFAULTS } = require('../lib/defaults.js');

if (process.loadEnvFile) {
  try {
    process.loadEnvFile(path.join(__dirname, '..', '.env.local'));
  } catch (e) {
    console.error('Could not load .env.local:', e.message);
    process.exit(1);
  }
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'sushmit_energy';
const force = process.argv.includes('--force');
const onlyArg = process.argv.find((a) => a.startsWith('--only='));
const only = onlyArg
  ? onlyArg.split('=')[1].split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
  : null;

if (!uri) {
  console.error('MONGODB_URI not set in .env.local');
  process.exit(1);
}

const toSlug = (title) =>
  String(title)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const toIsoDate = (str) => {
  if (!str) return '';
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) return str.slice(0, 10);
  const d = new Date(str);
  return Number.isNaN(d.getTime()) ? str : d.toISOString().slice(0, 10);
};

const seedData = {
  projects: DEFAULTS.projects.map((p) => ({
    name: p.name,
    subtitle: p.subtitle || '',
    slug: p.slug,
    capacity: String(p.capacity || '').replace(/\s*MW\s*$/i, ''),
    location: p.location || '',
    status: p.status || '',
    startDate: p.startDate || '',
    type: p.type || '',
    river: p.river || '',
    annualEnergy: p.annualEnergy || '',
    overview: p.overview || '',
    features: p.features || [],
    image: p.image || '',
    published: p.published ?? true,
  })),

  boardMembers: DEFAULTS.boardMembers.map((m) => ({
    name: m.name,
    title: m.title || '',
    image: m.image || '',
    description: m.description || '',
    social: m.social || {},
    order: m.order || 99,
  })),

  managementMembers: DEFAULTS.managementTeam.map((m) => ({
    name: m.name,
    title: m.title || '',
    image: m.image || '',
    description: m.description || '',
    order: m.order || 99,
  })),

  news: [
    ...Object.entries(DEFAULTS.news).flatMap(([category, items]) =>
      items.map((n) => ({
        title: n.title,
        slug: n.slug || toSlug(n.title),
        category: category === 'Blog' ? 'Blog' : category === 'News' ? 'News' : category === 'Energy' ? 'Energy' : 'Press Release',
        status: 'Published',
        date: toIsoDate(n.date),
        excerpt: n.summary || n.excerpt || '',
        content: n.content || '',
        image: n.image || '',
        metaTitle: n.source || (category === 'Blog' ? n.author || '' : ''),
        metaDescription: n.author || '',
      }))
    ),
  ],

  pages: [
    {
      slug: 'about-us',
      title: DEFAULTS.about.title,
      subtitle: DEFAULTS.about.subtitle,
      paragraphs: DEFAULTS.about.paragraphs,
      vision: DEFAULTS.about.vision,
      mission: DEFAULTS.about.mission,
      objectives: DEFAULTS.about.objectives,
    },
    {
      slug: 'message-of-chairman',
      title: DEFAULTS.chairman.title,
      subtitle: DEFAULTS.chairman.subtitle,
      name: DEFAULTS.chairman.name,
      role: DEFAULTS.chairman.role,
      image: DEFAULTS.chairman.image,
      heading: DEFAULTS.chairman.heading,
      intro: DEFAULTS.chairman.intro,
      paragraphs: DEFAULTS.chairman.paragraphs,
      quote: DEFAULTS.chairman.quote,
      signoff: DEFAULTS.chairman.signoff,
    },
    {
      slug: 'organizational-chart',
      title: DEFAULTS.orgChart.title,
      subtitle: DEFAULTS.orgChart.subtitle,
      image: DEFAULTS.orgChart.image,
    },
    {
      slug: 'investment-opportunity',
      title: DEFAULTS.investment.title,
      subtitle: DEFAULTS.investment.subtitle,
      heading: DEFAULTS.investment.heading,
      paragraphs: DEFAULTS.investment.paragraphs,
      links: DEFAULTS.investment.links,
      resources: DEFAULTS.investment.resources,
    },
    {
      slug: 'policy',
      title: DEFAULTS.policy.title,
      subtitle: DEFAULTS.policy.subtitle,
      heading: DEFAULTS.policy.heading,
      description: DEFAULTS.policy.description,
      fileUrl: DEFAULTS.policy.fileUrl,
    },
  ],

  albums: DEFAULTS.galleryAlbums.map((a, i) => ({
    name: a.name,
    cover: a.cover || '',
    description: a.description || '',
    images: a.images || [],
    link: a.link || '',
    order: i + 1,
  })),

  mediaResources: [
    ...DEFAULTS.mediaKit.map((r) => ({
      title: r.title,
      type: r.type || 'PDF',
      fileUrl: r.fileUrl || '',
      date: r.date || '',
      group: 'media-kit',
      description: r.description || '',
      size: r.size || '',
    })),
    ...DEFAULTS.publications.map((r) => ({
      title: r.title,
      type: r.type || 'PDF',
      fileUrl: r.fileUrl || '',
      date: r.date || '',
      group: 'publications',
      description: r.description || '',
      size: r.size || '',
    })),
  ],

  reports: [
    ...DEFAULTS.reports.Annual.map((r) => ({
      title: r.title,
      type: 'Annual',
      fileUrl: r.fileUrl || '',
      date: r.date || '',
      size: r.size || '',
    })),
    ...DEFAULTS.reports.Quarterly.map((r) => ({
      title: r.title,
      type: 'Quarterly',
      fileUrl: r.fileUrl || '',
      date: r.date || '',
      size: r.size || '',
    })),
  ],

  settings: {
    siteName: DEFAULTS.settings.siteName,
    siteEmail: DEFAULTS.settings.siteEmail,
    sitePhone: DEFAULTS.settings.sitePhone,
    address: DEFAULTS.settings.address,
  },

  jobs: DEFAULTS.jobs.map((j) => ({
    title: j.title,
    department: j.department || '',
    location: j.location || '',
    type: j.type || 'Full-Time',
    deadline: toIsoDate(j.deadline),
    description: j.description || '',
    requirements: j.requirements || [],
    status: j.status || 'Open',
  })),

  contact: {
    address: DEFAULTS.contact.address,
    phone: `${DEFAULTS.contact.phone}\n${DEFAULTS.contact.fax} (Fax)`,
    email: DEFAULTS.contact.email,
    mapEmbed: DEFAULTS.contact.mapEmbed || '',
  },
};

const collections = [
  { name: 'projects', docs: seedData.projects },
  { name: 'boardmembers', docs: seedData.boardMembers },
  { name: 'managementmembers', docs: seedData.managementMembers },
  { name: 'newsarticles', docs: seedData.news },
  { name: 'pages', docs: seedData.pages },
  { name: 'albums', docs: seedData.albums },
  { name: 'mediaresources', docs: seedData.mediaResources },
  { name: 'reports', docs: seedData.reports },
  { name: 'settings', docs: [seedData.settings] },
  { name: 'jobs', docs: seedData.jobs },
  { name: 'contact', docs: [seedData.contact] },
];

async function seedCollection(db, dbCollection, docs, reseed = false) {
  const count = await db.collection(dbCollection).countDocuments();
  if (count > 0 && !reseed) {
    console.log(`Skipping "${dbCollection}": already has ${count} documents (use --force to reseed)`);
    return;
  }
  if (reseed && count > 0) {
    await db.collection(dbCollection).deleteMany({});
    console.log(`Cleared "${dbCollection}" (${count} documents)`);
  }
  if (docs.length === 0) return;
  await db.collection(dbCollection).insertMany(docs);
  console.log(`Seeded "${dbCollection}" with ${docs.length} documents`);
}

async function main() {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 15000 });
  await client.connect();
  const db = client.db(dbName);
  console.log(`Connected to ${dbName}${force ? ' (force reseed)' : ''}`);

  const reseed = force || only !== null;
  for (const { name, docs } of collections) {
    if (only && !only.includes(name)) continue;
    await seedCollection(db, name, docs, reseed);
  }

  await client.close();
  console.log('Done.');
}

main().catch((e) => {
  console.error('Seed failed:', e.message);
  process.exit(1);
});
