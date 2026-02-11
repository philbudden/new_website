This repository is a **static-first, GitHub Pages–compatible** personal/brand website built with **Jekyll**. It is intended to be created and maintained collaboratively by a human and an LLM coding assistant.

This file is durable guidance for long-term evolution. It defines architectural intent, conventions, guardrails, and how an agent should work within the repo.

---
## 1) Non-Negotiables

### Hosting + Runtime

- **GitHub Pages** hosting.
- **Fully static output**: no server-side runtime, no databases, no backend services.
- Jekyll build must work with GitHub Pages constraints.
  - Prefer **GitHub Pages supported plugins** only.
  - Prefer **zero custom plugins** (pure Liquid + includes + data files) unless absolutely necessary.

### Dependency Discipline

- **No JavaScript frameworks** (React/Vue/Svelte/etc.).
- **Minimal dependencies**:
  - Small, auditable client-side JS only for search + tag filtering.
  - Avoid bundlers where possible. If a build step is introduced, it must remain GitHub Pages compatible (or be clearly optional and documented).

### Maintainability

- Changes must be **incremental, reviewable, and reversible**.
- Keep concerns separate:
  - **Content** in Markdown collections.
  - **Layout** in `_layouts/` and `_includes/`.
  - **Styling** in a small set of CSS files.
  - **Data/config** in `_config.yml` and optionally `_data/`.

### Accessibility

- Must meet practical accessibility standards:
  - Semantic HTML.
  - Keyboard navigable.
  - Visible focus states.
  - Sufficient color contrast.
  - Images have `alt` text (placeholders must still have alt text).

---
## 2) Site Information Architecture


Required top-level pages:
- Landing (`/`)
- About (`/about/`)
- Mission (`/mission/`)
- Projects (`/projects/`)
- Engagements (`/engagements/`)
- Knowledge Base index (`/kb/`)
- Blog index (`/blog/`)

Required navigation (persistent):
- About
- Mission
- Projects
- Engagements
- Knowledge Base
- Blog

Footer is persistent across pages.
### Landing Page

- Mobile: show **logo icon only**.
- Larger screens: show **full logo** (icon + brand name).
- No additional page content besides:
  - Header/nav
  - Landing logo treatment
  - Footer

### About Page

- Profile image + several paragraphs.
- Text wraps around image on larger screens; responsive stacking on mobile.

### Mission Page

- Typography-first, simple.

### Projects Page

- Projects are data-driven and easy to add.
- Each project requires:
  - Title
  - Short description
  - GitHub repo link

### Engagements Page

- Several paragraphs + enquiry form.
- Form must remain static-friendly and include anti-spam measures.

### Knowledge Base + Blog

Two **separate Jekyll collections**:
- `notes` (Knowledge Base)
- `posts` (Blog; standard Jekyll posts)

Both require:
- Reverse chronological listing
- Individual content pages
- Title/date/tags displayed
- Short preview in list view
- Client-side search
- Tag filtering based on front matter

---
## 3) Content Model Conventions

### 3.1 Front Matter Requirements

#### Knowledge Base notes (`_notes/`)

Standard Jekyll naming: YYYY-MM-DD-title-slug.md

Each note MUST include:
```yaml
---
title: "Note Title"
date: 2026-02-10
tags: [tag-one, tag-two]
summary: "1–2 sentence summary for list previews."
---
```

#### Blog posts (`_posts/`)

Standard Jekyll naming: YYYY-MM-DD-title-slug.md

Each post MUST include:
```yaml
---
title: "Post Title"
date: 2026-02-10
tags: [tag-one, tag-two]
summary: "1–2 sentence summary for list previews."
---
```
  
### 3.2 Tag Rules

- Tags are normalized to lower-case kebab-case (e.g., k3s, data-engineering, homelab).
- Tags must be an array. Never a comma-separated string.
- Tags are generated dynamically from the content front matter; do not maintain a separate hard-coded tag list.

### 3.3 Previews / Excerpts

- Use summary when present for list preview text.
- If summary is missing, fall back to a short excerpt (trimmed) derived from content.  

## 4) Search + Tag Filtering Architecture

### Principles

- Client-side only.
- Minimal JS, no framework.
- Works without a server.
- Degrades gracefully:  
	- If JS is disabled, the lists still render normally (without search/filter interactivity).

### Required Approach

- Generate a small JSON index at build time using Liquid:  
	- One index for notes (KB)
	- One index for blog posts 
- Each index item includes:  
	- title
	- url
	- date
	- tags
	- summary (or excerpt)
- Search is:  
	- Simple substring match (title + summary + tags) OR a small, dependency-free search library (only if truly justified). 
- Tag filtering:  
	- Clicking a tag applies a filter to show items with that tag.
	- The active tag filter state should be reflected in the URL query string (preferred), e.g. ?tag=...  
- Search query should also be reflectable via query string (preferred), e.g. ?q=...

### Implementation Guardrails

- Do not fetch third-party scripts.
- No analytics scripts by default.
- Avoid large libraries. If any dependency is introduced, justify it and keep it small and pinned.

## 5) Static-Friendly Enquiry Form (Engagements)

No server-side code is allowed.

Acceptable options:
1. Third-party form handler (e.g., Formspree, Getform, Basin, Netlify Forms if using Netlify — but this site is GitHub Pages, so Netlify Forms only if explicitly deployed there).
2. Static endpoint via Cloudflare Turnstile + serverless is not allowed (serverless is a runtime). Avoid.
3. Email link fallback is allowed as a secondary option.

Anti-spam requirements (must implement at least two):
- Honeypot hidden field.
- Time-to-submit check (client-side; rejects instant submissions).
- Optional: simple challenge (non-invasive) or provider-level spam filtering.

Form conventions:
- Labels are always present.
- Field name attributes are stable.
- Provide user feedback for success/failure without relying on a backend.

## 6) Design System (Tokens)

Use CSS variables for the palette and spacing. Do not hard-code colors repeatedly.

### Brand Colors

- --color-primary: #14283C;
- --color-secondary: #283C50;

Accents
- --color-accent-amber: #E89B2C;
- --color-accent-copper: #A65E3B;
- --color-accent-teal: #3FB8AF;

Neutrals
- --color-graphite: #282828;
- --color-graphite-soft: #3C3C3C;
- --color-offwhite: #F2F2F2;

### UI Requirements

- Nav bar uses primary color.
- Links + CTAs use Signal Amber.
- Focus states use Teal Glow.
- Cards/panels use Secondary (or subtle variants) while preserving readability.
- Typography is clean and minimal (system fonts preferred).

## 7) Repository Structure Expectations

Preferred structure:

```code
.

├─ _config.yml

├─ Gemfile (optional; only if needed for local dev parity)

├─ README.md

├─ assets/

│  ├─ css/

│  │  ├─ main.css

│  │  └─ components.css (optional; only if needed)

│  ├─ js/

│  │  ├─ kb.js

│  │  ├─ blog.js

│  │  └─ utils.js

│  └─ img/

│     ├─ logo-icon.svg (placeholder)

│     ├─ logo-full.svg (placeholder)

│     └─ profile.jpg (placeholder)

├─ _includes/

│  ├─ head.html

│  ├─ nav.html

│  ├─ footer.html

│  ├─ card.html

│  └─ tag-list.html

├─ _layouts/

│  ├─ base.html

│  ├─ page.html

│  ├─ landing.html

│  ├─ note.html

│  └─ post.html

├─ _notes/

│  ├─ 2026-02-10-sample-note-1.md

│  └─ 2026-02-09-sample-note-2.md

├─ _posts/

│  ├─ 2026-02-10-sample-post-1.md

│  └─ 2026-02-08-sample-post-2.md

├─ kb/

│  └─ index.html

├─ blog/

│  └─ index.html

├─ about.md

├─ mission.md

├─ projects.md

├─ engagements.md

└─ index.md
```

### Notes: 

- kb/index.html and blog/index.html are dedicated listing pages that load their respective search/filter scripts.
- If JSON indices are generated, place them at stable paths like: 
	- /assets/search/kb.json
	- /assets/search/blog.json  

## 8) LLM Agent Operating Rules

### Read-First

Before changing anything, the agent MUST:
1. Read AGENTS.md
2. Read _config.yml
3. Scan existing _layouts/, _includes/, and assets/ structure
4. Respect established patterns and naming

### Change Discipline

- Make the smallest coherent set of changes to achieve the goal.
- Keep diffs clean:  
	- Avoid unrelated formatting churn.
	- Avoid renaming unless necessary.
- Prefer explicitness over cleverness:  
	- Simple Liquid loops.
	- Small, readable JS.

### Safety + Compatibility

- Do not introduce unsupported GitHub Pages plugins.
- Do not add server-side components.
- Do not add heavy dependencies.
- Avoid third-party scripts.

### Documentation

- Update README.md when structure, build, or content conventions change.
- Keep instructions short and reproducible.

## 9) Local Development Expectations

- Site should run locally with standard Jekyll tooling.
- If a Gemfile is included, keep it aligned with GitHub Pages expectations.
- Do not require Node tooling unless absolutely necessary; if introduced, it must be optional.

## 10) Definition of Done (for any change)

A change is “done” when:
- Jekyll builds successfully.
- Navigation works and is consistent across pages.
- KB and Blog listings work with:  
	- reverse chronological ordering
	- previews
	- tag display
	- client-side search
	- tag filtering
- Accessibility basics are preserved (keyboard + focus + semantic structure).
- No unnecessary dependencies were added.
