# TODO: Codebase Cleanup

## TypeScript Improvements

1. Fix remaining TypeScript warnings in `EUStatisticsChart.astro`:
   - Chart ID handling is currently causing TypeScript warnings
   - Consider using proper type declarations for Chart.js

2. Address unused imports and variables throughout the codebase:
   - in src/pages/index.astro:
     - unused imports: ArrowRightIcon, RobotIcon, DigitalIcon, LanguageIcon
     - unused imports: InteractiveSection, Testimonials
   - in src/components/Footer.astro: 
     - unused variables: isDevelopment
   - in src/components/WhyDigitalReform.astro:
     - unused variables: borderColorClass, bgColorClass
   - in src/pages/benefits.astro:
     - unused variables: benefitsContainer
   - in src/pages/confirm.astro:
     - unused variables: statusMessage
   - in src/pages/ui/index.astro:
     - unused variables: isProduction
   - in src/pages/vision components:
     - unused imports: Card, CardGrid

3. Fix deprecated attributes in components:
   - Replace frameborder with border-0 class in all iframe elements

## Testing Improvements

1. Add comprehensive tests for Algolia search integration:
   - Test search functionality with different queries
   - Verify search results are accurate
   - Test the search on different devices and screen sizes
   - Test the search page with various URL parameters

2. Update link checking to handle broken links more gracefully:
   - Fix links in vision page pointing to book pages
   - Fix links in docs/ideas-catalog pointing to non-existent idea pages
   - Consider implementing redirects for commonly accessed URLs

3. Add unit tests for components:
   - Test TypeScript types in components
   - Test component rendering with different props
   - Test component interactivity

## Content Fixes

1. Fix the problem with CardGrid in content/docs/all.mdx:
   - Properly export Card and CardGrid components or
   - Remove unused imports from MDX files

2. Update broken links in content:
   - See missing_links.md for a comprehensive list
   - Create placeholder pages for missing content or
   - Update links to point to existing content

## Performance Improvements

1. Optimize Algolia search indexing:
   - Review fields being indexed
   - Set appropriate searchable attributes
   - Configure proper facets and filters

2. Optimize TypeScript checking:
   - Review tsconfig.json settings
   - Consider using project references
   - Evaluate incremental TypeScript checking