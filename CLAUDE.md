# CLAUDE.md - AI Assistant Guide

## Commands
- Build: `npm run build` (astro check && astro build)
- Development: `npm run dev` (astro dev)
- Preview: `npm run preview` (astro preview)
- Convert MDX files: `npm run convert-mdx`

## Project Structure
- `/src/content/docs/` - Main documentation content (MDX files)
- `/src/components/` - Astro components
- `/src/layouts/` - Page layouts
- `/src/pages/` - Route pages

## Tech Stack
- Astro with strict TypeScript
- TailwindCSS with DaisyUI for styling
- SCSS for custom styling

## Conventions
- Use TypeScript for type safety
- Follow Astro's component patterns
- Prefer functional components
- Use semantic HTML elements
- Keep components small and focused
- Organize imports with built-ins first, then external packages, then local imports
- Use descriptive naming for files and components
- All code comments must be in English, even if communication is in Polish

## Content Guidelines
- Store documentation in MDX format with required frontmatter: title, description, tags, author
- All content should be written in English
- Index.mdx files serve as table of contents for subdirectories
- Use Astro's content collections API for structured content