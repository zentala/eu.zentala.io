# EU Reform Vision

This repository contains the source code for the EU Reform Vision website built with Astro.

## Project Structure

```tree
/
├── public/            # Static assets
├── src/
│   ├── components/    # UI Components
│   ├── content/       # Content collections (MDX)
│   │   ├── docs/      # Main content
│   │   └── config.ts  # Collection schemas
│   ├── layouts/       # Page layouts
│   ├── pages/         # Page routes
│   └── styles/        # CSS/SCSS styles
├── astro.config.mjs   # Astro configuration
├── tailwind.config.js # Tailwind configuration
└── package.json
```

## Commands

All commands are run from the root of the project:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:4333`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run convert-mdx`  | Convert MDX files to MD format                   |
| `npm test`             | Run full link check (recommended)                |
| `npm run test:urls`    | Test predefined URLs for 200 status              |
| `npm run test:crawl`   | Crawl the site and find broken links             |
| `npm run test:links`   | Same as `npm test`                               |

## Testing URL Routes

This project includes three different tools for testing URL routes and finding broken links:

### 1. URL Checker (Basic)

Tests a predefined list of URLs expected to work on the site:

```bash
npm run test:urls
```

This tool:

- Starts a development server
- Tests a predefined list of important URLs for 200 status codes
- Provides a summary of successful and failed URLs
- Automatically stops the server after completion

### 2. Site Crawler (Complete)

Crawls the entire site starting from the homepage, finding all linked pages:

```bash
npm run test:crawl
```

This tool:

- Starts a development server
- Crawls every link it finds recursively
- Reports all broken internal links
- Provides a detailed report of issues found
- Automatically stops the server after completion

### 3. Link Checker (Comprehensive)

The recommended way to test the entire site:

```bash
# First start the server in another terminal
npm run dev

# Then run the link checker
npm test
```

This tool:

- Requires a running server on port 4333
- Crawls all internal links and reports their status
- Can check external links too (configurable)
- Shows a real-time progress indicator
- Provides a detailed report of broken links

## Content Guidelines

All documentation is stored in MDX format with the following frontmatter requirements:

- title: Page title
- description: Brief page description
- tags: Comma-separated list of topics (optional)
- author: Content author (optional)
- customSlug: Custom URL path (optional)

## External Dependecies

For all I login with GitHub account `zentala@gmail.com`:

- [GitHub Pages](https://github.com/zentala/zentala.eu/settings/pages) for static hosting
- [Appwrite](https://cloud.appwrite.io/console/project-eu/overview/platforms) for newsletter
- [Angolia](https://dashboard.algolia.com/apps/N0RZJY4T6S/dashboard) for search
