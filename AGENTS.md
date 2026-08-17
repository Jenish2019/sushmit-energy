<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:sushmit-energy-state -->
# Sushmit Energy - Current Project State (Updated Aug 17, 2026)

## Notion Database
- Parent page: "Sushmit Energy" (previously "Developer OS")
- Task tracker: "Sushmit Energy - Task List" under Sushmit Energy page
- DB ID: `3a0cb3cd-1d7f-817a-8d3f-dffcff45c486`

## Repo
- Live repo: `github.com/Jenish2019/sushmit-energy` (branch `main`, auto-deploys on Vercel on push)
- Local root: `D:\sushmit-energy` (this is the ONLY dev copy; `D:\sushmit-new` is the old scratch copy and is NOT a git repo — do not edit it)
- Windows / PowerShell 5.1; `npm.cmd` for Start-Process; no `&&`

## Routes (public)
- `/` - Homepage (Header, Banner, IntroSection, LatestUpdates, Projects, ChairmanMessage, Footer)
- `/about-us/` - Company vision/mission/objectives
- `/board-of-directors/` - 5 board members (with social links)
- `/message-of-chairman/` - Chairman's message
- `/our-management-team/` - 6 team members
- `/investment-oppourtunity/` - Investment info
- `/projects/` - Main project (Kunaban) hero page: facts sidebar (River/Type + editable `specs` grid), overview rich text, features, image band, CTA
- `/gallery/` - Album cards (cover image, falls back to first photo); links to detail pages
- `/gallery/[slug]/` - Album detail: cover as PageHero background + first photo in grid, keyboard-navigable lightbox (`components/AlbumLightbox.js`); 404 if slug not found
- `/news/` - News articles
- `/resources/` - Resources (media kit + publications)
- `/media/[slug]/` - Universal article detail page (news/blog/press). Archive-style with sidebar (Quick Links + Latest Articles); 404 if not found
- `/contact-us/` - Contact form (posts to /api/contact, persists to Message collection; phone field)
- `/policy/` - Policy download
- `/reports/` - Annual & quarterly reports
- `/login/` - Admin login page (real auth, redirects to /admin/dashboard)

## Public site is DB-driven (frontend wired to MongoDB)
- Public pages are async server components with `export const dynamic = 'force-dynamic'` reading MongoDB via `lib/data.js` (`getSettings`, `getBannerSlides`, `getHomepage`, `getContact`, `getProjects`, `getProjectBySlug`, `getMainProject`, `getBoardMembers`, `getManagementMembers`, `getNews(category)`, `getBlogPosts`, `getNewsArticleBySlug(slug)`, `getRecentArticles(limit)`, `getAllArticles`, `getAlbums`, `getAlbumBySlug(slug)`, `getMediaResources(group)`, `getReports`, `getPage(slug)`)
- DB-first with fallback to real site content in `lib/defaults.js` (used only when a collection is empty)
- Client components (Header/Footer/Contact/PageHero) fetch `/api/public/settings` (force-dynamic) for settings + contact; PageHero accepts an `image` prop override for per-page header backgrounds
- `components/Pagination.js` renders 10-per-page pagination wired into admin News/Resources/Messages tables

## Admin Panel (/admin)
- Dashboard, Homepage, Company (About/Board/Chairman/Management/Investment), Projects (editable `specs` rows), Media (News/Resources), Gallery (multi-image upload, slug auto-gen), Messages (paginated read/unread/delete), Contact Us, Policy, Reports, Settings (Media tab: pageHeroImage upload)
- All admin pages wired to MongoDB via /api/admin/* routes (real CRUD, no more local state mocks)
- Admin auth: POST /api/admin/auth/register (first admin only), /login, /logout, /me. Session = httpOnly JWT cookie `admin_session` (7 days)
- Access control: `proxy.js` (Next.js 16 middleware) protects all `/admin` pages (redirect -> /login) and `/api/admin/*` routes (401) except auth endpoints; `/login` redirects to /admin if already authed. Admin layout also checks `/me` client-side and wires the logout button.
- Seed admin: admin@gmail.com / admin123 (change immediately). Reset via `npm run reset-admin [email] [password] [name]`

## Backend (MongoDB Atlas - connected)
- DB: sushmit_energy (Atlas cluster0.zsxcvne.mongodb.net)
- Env: `.env.local` (gitignored) -> MONGODB_URI, MONGODB_DB. Copy `.env.example`
- Helper: `lib/mongodb.js` (cached mongoose connection), `lib/api.js` (CRUD helpers), `lib/auth.js` (session/JWT)
- Models (`lib/models/`): Admin, Page (strict:false for arbitrary page fields), BoardMember, ManagementMember, Project (has `specs` array), NewsArticle, Album (slug + images: Mixed), MediaResource (group: media-kit|publications), Report (description/size), Contact, Setting (has pageHeroImage + bannerSlides), Message, Service
- API routes (`app/api/`): admin CRUD for every model under /api/admin/*, plus public /api/contact and /api/public/settings
- Seed: `npm run seed` -> scripts/seed.js (real site content from lib/defaults.js; add `--force` to wipe+reseed a collection)
- MinIO uploads: `/api/admin/upload` (`components/UploadButton.js`, image 2 MB / other 50 MB caps) — MinIO integration present; verify credentials
- Contact form persists messages to the Message collection

## Deployment / Vercel
- vercel.json: `{ "framework": "nextjs", "buildCommand": "next build" }` — no outputDirectory override
- Build-time env: Vercel CI has NO `.env.local`; `lib/mongodb.js` keeps the MONGODB_URI check LAZY (throws inside connectDB, not module scope) so `next build` on Vercel does NOT fail at build time. NEVER move that guard back to module scope.
- Runtime env on Vercel: MONGODB_URI, MONGODB_DB, MINIO_* must be set in Vercel -> Project -> Environment Variables
- Gotcha: running `next build` while a `next dev` server is live corrupts the dev server's `.next` (empty HTTP responses / "JSON.parse: unexpected end of data") — restart the dev server after a build
<!-- END:sushmit-energy-state -->
