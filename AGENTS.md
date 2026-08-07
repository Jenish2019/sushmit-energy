<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:sushmit-energy-state -->
# Sushmit Energy - Current Project State (Updated Jul 31, 2026)

## Notion Database
- Parent page: "Sushmit Energy" (previously "Developer OS")
- Task tracker: "Sushmit Energy - Task List" under Sushmit Energy page
- DB ID: `3a0cb3cd-1d7f-817a-8d3f-dffcff45c486`

## Routes (27 public, all Static) + ~26 admin pages
- `/` - Homepage (Header, Banner, IntroSection, Projects, ChairmanMessage, Footer)
- `/about-us/` - Company vision/mission/objectives
- `/board-of-directors/` - 5 board members
- `/message-of-chairman/` - Chairman's message
- `/our-management-team/` - 6 team members (was 1, updated)
- `/organizational-chart/` - Org chart image
- `/investment-oppourtunity/` - Investment info
- `/projects/` - 3 project cards
- `/myagdi-khola-hydropower-project/` - 57.3 MW detail page
- `/kunaban-khola-hydropower-project/` - 24.78 MW detail page
- `/myagdi-khola-b-hydropower-project/` - 12.5 MW detail page
- `/gallery/` - Album cards linking to album detail pages
- `/gallery/[slug]/` - Album detail page: photos in a responsive grid with a keyboard-navigable lightbox (`components/AlbumLightbox.js`); 404 if slug not found
- `/contact-us/` - Contact form (posts to /api/contact)
- `/policy/` - Policy download
- `/reports/` - Annual & quarterly reports (was placeholder, now populated)
- `/press-releases/` - 6 press releases
- `/sushmit-news/` - 5 news articles
- `/media/[slug]/` - Universal article detail page (blogs, news, press releases). Archive-style: category badge + date/author meta, featured image, rich content, share buttons, sidebar (Quick Links + Latest Articles). 404 if slug not found. Card "Read More"/"Read Full Article" on `/blog/`, `/sushmit-news/`, `/press-releases/` link here.
- `/media-kit/` - 6 downloadable resources
- `/blog/` - 6 blog posts
- `/publications/` - 6 reports/publications
- `/current-vacancies/` - Job listings (DB-driven via Job model); cards link to detail pages
- `/current-vacancies/[slug]/` - Job detail page: full description, requirements, "Other Open Positions" sidebar, Apply Now (mailto:careers@sushmitenergy.com, prefilled subject/body); 404 if not found
- `/resume/` - Resume upload form (client-side)
- `/login/` - Admin login page (real auth, redirects to /admin/dashboard)

## Public site is DB-driven (frontend wired to MongoDB)
- Public pages are async server components with `export const dynamic = 'force-dynamic'` reading MongoDB via `lib/data.js` (`getProjects`, `getProjectBySlug`, `getBoardMembers`, `getManagementMembers`, `getNews(category)`, `getBlogPosts`, `getNewsArticleBySlug(slug)`, `getRecentArticles(limit)`, `getAlbums`, `getAlbumBySlug(slug)`, `getJobs`, `getJobBySlug(slug)`, `getMediaResources(group)`, `getReports`, `getPage(slug)`, `getSettings`, `getContact`)
- DB-first with fallback to real site content in `lib/defaults.js` (used only when a collection is empty)
- Client components (Header/Footer/Contact) fetch `/api/public/settings` (force-dynamic) for settings + contact
- Shared `components/ProjectDetail.js` renders the 3 project detail pages; `components/ShareButtons.js` renders social share links (client)

## Admin Panel (/admin)
- Dashboard, Company (About/Org Chart/Board/Chairman/Management/Investment), Projects, Media (Press Releases/Sushmit News/Energy News/Media Kit/Blog/Publications), Gallery, Contact Us, Policy, Reports, Job Board, Settings, Messages (API only)
- All admin pages wired to MongoDB via /api/admin/* routes (real CRUD, no more local state mocks)
- Admin auth: POST /api/admin/auth/register (first admin only), /login, /logout, /me. Session = httpOnly JWT cookie `admin_session` (7 days)
- Access control: `proxy.js` (Next.js 16 middleware) protects all `/admin` pages (redirect -> /login) and `/api/admin/*` routes (401) except auth endpoints; `/login` redirects to /admin if already authed. Admin layout also checks `/me` client-side and wires the logout button.
- Seed admin: admin@gmail.com / admin123 (change immediately). Reset via `npm run reset-admin [email] [password] [name]`

## Backend (MongoDB Atlas - connected)
- DB: sushmit_energy (Atlas cluster0.zsxcvne.mongodb.net)
- Env: `.env.local` (gitignored) -> MONGODB_URI, MONGODB_DB. Copy `.env.example`
- Helper: `lib/mongodb.js` (cached mongoose connection), `lib/api.js` (CRUD helpers), `lib/auth.js` (session/JWT)
- Models (`lib/models/`): Admin, Page (strict:false for arbitrary page fields), BoardMember, ManagementMember, Project, NewsArticle, Album, MediaResource (group: media-kit|publications), Report, Contact, Setting, Message, Service, Job (status: Open|Closed, requirements: array)
- API routes (`app/api/`): admin CRUD for every model under /api/admin/*, plus public /api/contact and /api/public/settings
- Seed: `npm run seed` -> scripts/seed.js (real site content from lib/defaults.js; add `--force` to wipe+reseed a collection)
- MinIO NOT yet configured (upload API pending credentials)
- Contact form now persists messages to the Message collection
<!-- END:sushmit-energy-state -->
