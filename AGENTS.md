<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:sushmit-energy-state -->
# Sushmit Energy - Current Project State (Updated Jul 17, 2026)

## Notion Database
- Parent page: "Sushmit Energy" (previously "Developer OS")
- Task tracker: "Sushmit Energy - Task List" under Sushmit Energy page
- DB ID: `3a0cb3cd-1d7f-817a-8d3f-dffcff45c486`

## Routes (27 total, all Static)
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
- `/gallery/` - 3 album cards
- `/contact-us/` - Contact form (client-side mock)
- `/policy/` - Policy download
- `/reports/` - Annual & quarterly reports (was placeholder, now populated)
- `/press-releases/` - 6 press releases
- `/sushmit-news/` - 5 news articles
- `/informationenergy/` - Energy news (6 articles)
- `/media-kit/` - 6 downloadable resources
- `/blog/` - 6 blog posts
- `/publications/` - 6 reports/publications
- `/current-vacancies/` - 5 job listings
- `/resume/` - Resume upload form (client-side)
- `/login/` - Login page (client-side mock)

## Components (6)
Header, Footer, Banner, IntroSection, Projects, ChairmanMessage

## Design Tokens
- Colors: --primary-blue (#0c50a0), --primary-green (#0f8a43)
- Max width: 1200px
- CSS-in-JS with <style> blocks in each page/component
- globals.css has utility classes (.container, .section-padding, .btn, .btn-primary, .btn-green, .btn-outline, .grid, .flex)

## Assets
- Only local image: /public/images/logo.png
- All other images from web.archive.org URLs

## Backend
- None. server/ directory is empty.
- No API routes (no app/api/)
- Contact form and resume upload are client-side only mocks
<!-- END:sushmit-energy-state -->
