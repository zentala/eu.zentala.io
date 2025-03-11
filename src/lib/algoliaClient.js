import * as algoliasearch from 'algoliasearch';

// Algolia search client - using the search-only API key that can be public
export const searchClient = algoliasearch.default(
  import.meta.env.PUBLIC_ALGOLIA_APP_ID || 'placeholder',
  import.meta.env.PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY || 'placeholder'
);

export const searchIndex = import.meta.env.PUBLIC_ALGOLIA_INDEX_NAME || 'eu_zentala_io';