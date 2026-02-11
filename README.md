# Data Savvy Solutions - Personal/Brand Website

A static, GitHub Pages–compatible personal and brand website built with Jekyll. This site is minimal, accessible, and designed to showcase expertise, projects, and insights through a Knowledge Base and Blog.

## Features

- **Fully Static**: Hosted on GitHub Pages with zero backend runtime
- **Knowledge Base + Blog**: Two separate collections with search and tag filtering
- **Client-Side Search**: Build-time JSON indices + vanilla JavaScript (no frameworks)
- **Responsive Design**: Mobile-first, semantic HTML
- **Accessible**: WCAG-aligned with focus states, contrast, and keyboard navigation
- **Anti-Spam Form**: Honeypot + time-to-submit checks for static hosting
- **Design Tokens**: CSS variables for consistent branding

## Quick Start

### Prerequisites

- Ruby 2.5+
- Jekyll 3.10.0+ (GitHub Pages uses Jekyll 3.x; Jekyll 4.x requires a custom GitHub Actions workflow)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/new_website.git
   cd new_website
   ```

2. Install dependencies (optional, for local parity):
   ```bash
   bundle install
   ```

3. Start the development server:
   ```bash
   jekyll serve
   # or: bundle exec jekyll serve
   ```

4. Open [http://localhost:4000](http://localhost:4000) in your browser.

### Build for Production

```bash
jekyll build
# or: bundle exec jekyll build
```

The static site will be generated in `_site/`.

---

## Site Structure

```
├── _config.yml              # Jekyll configuration
├── _includes/               # Reusable HTML partials
│   ├── head.html
│   ├── nav.html
│   ├── footer.html
│   ├── tag-list.html
│   └── card.html
├── _layouts/                # Page templates
│   ├── base.html
│   ├── page.html
│   ├── landing.html
│   ├── note.html
│   └── post.html
├── _notes/                  # Knowledge Base content (collection)
├── _posts/                  # Blog posts (standard Jekyll)
├── _data/
│   └── projects.yml         # Projects data (YAML)
├── assets/
│   ├── css/main.css         # All styling (CSS variables)
│   ├── js/
│   │   ├── utils.js
│   │   ├── kb.js
│   │   ├── blog.js
│   │   └── form.js
│   ├── img/
│   │   ├── logo-icon.svg
│   │   ├── logo-full.svg
│   │   └── profile.svg
│   └── search/
│       ├── kb.json          # Generated KB index
│       └── blog.json        # Generated blog index
├── kb/index.html            # Knowledge Base listing page
├── blog/index.html          # Blog listing page
├── index.md                 # Landing page
├── about.md
├── mission.md
├── projects.md
├── engagements.md
└── README.md
```

---

## Adding Content

### Add a Knowledge Base Note

Create a new file in `_notes/` with the naming convention `YYYY-MM-DD-title-slug.md`:

```markdown
---
layout: note
title: "Note Title Here"
date: 2026-02-10
tags: [tag-one, tag-two, tag-three]
summary: "A brief 1-2 sentence summary for the listing page."
---

Your markdown content here...
```

Notes are automatically:
- Listed on `/kb/` in reverse chronological order
- Searchable by title, summary, and tags
- Filterable by clicking tags

### Add a Blog Post

Create a new file in `_posts/` with the naming convention `YYYY-MM-DD-title-slug.md`:

```markdown
---
layout: post
title: "Post Title Here"
date: 2026-02-10
tags: [tag-one, tag-two]
summary: "A brief 1-2 sentence summary for the listing page."
---

Your markdown content here...
```

Posts are automatically:
- Listed on `/blog/` in reverse chronological order
- Searchable by title, summary, and tags
- Filterable by clicking tags

### Add a Project

Edit `_data/projects.yml` and add a new entry:

```yaml
- title: "Project Name"
  description: "Short description of what the project does."
  github_url: "https://github.com/owner/project-name"
```

Projects are displayed on `/projects/` as a responsive grid.

---

## Search + Tag Filtering

### How It Works

1. **Build Time**: Jekyll generates JSON indices at `/assets/search/kb.json` and `/assets/search/blog.json` using Liquid
2. **Client Side**: Vanilla JavaScript loads these indices and implements:
   - Substring search across title, summary, and tags (case-insensitive)
   - Tag filtering via query string parameters (`?tag=...`)
   - Search query via query string (`?q=...`)
3. **Degradation**: If JavaScript fails, the server-rendered list is still visible

### Query String Examples

- `/kb/?q=kubernetes` — Search for "kubernetes"
- `/blog/?tag=data-engineering` — Filter by tag
- `/blog/?q=pipeline&tag=data-engineering` — Combine search and tag filter

---

## Customization

### Design System / Branding

All colors and spacing are defined as CSS variables in `assets/css/main.css`:

```css
--color-primary: #14283C;
--color-secondary: #283C50;
--color-accent-amber: #E89B2C;
--color-accent-copper: #A65E3B;
--color-accent-teal: #3FB8AF;
```

Update these to match your brand. The design automatically applies them across all pages.

### Update Placeholder Assets

Replace placeholder assets in `assets/img/`:
- `logo-icon.svg` — Square logo for nav bar
- `logo-full.svg` — Logo with brand name for landing page
- `profile.svg` — Profile image on About page

### Update Navigation Links

Edit `_includes/nav.html` to add or remove navigation items.

### Update Form Handler

In `engagements.md`, replace the `action` URL with your form handler endpoint:

```html
<form ... action="https://formspree.io/f/YOUR_FORM_ID" ...>
```

Supported services: Formspree, Basin, Getform, etc. Follow their setup instructions.

---

## Accessibility

The site meets practical accessibility standards:

- ✅ Semantic HTML (`<main>`, `<nav>`, `<article>`, `<time>`, etc.)
- ✅ Keyboard navigation (Tab through all interactive elements)
- ✅ Visible focus states (Teal outline using `--color-accent-teal`)
- ✅ Color contrast (WCAG AA compliant)
- ✅ Alt text on images
- ✅ Form labels and error messages
- ✅ Skip links (through nav focus)

---

## Performance

- **Zero JavaScript frameworks** — Just vanilla JS for search
- **Minimal dependencies** — Only Jekyll plugins supported by GitHub Pages
- **Fast build times** — Statically generated, no runtime
- **Small CSS** — Single optimized stylesheet with CSS variables
- **JSON indices only** — No database or API calls

---

## Deployment

This site is designed for GitHub Pages. Simply push to your repository:

```bash
git add .
git commit -m "Update site content"
git push origin main
```

GitHub will automatically build and deploy the site to `https://your-username.github.io/repository-name/` (or your custom domain).

---

## Further Reading

See `AGENTS.md` for detailed architectural guidance and conventions for long-term maintenance and collaboration with LLM coding assistants.

---

## License

This site is licensed under the MIT License. See `LICENSE` for details.

---

**Happy building!**
