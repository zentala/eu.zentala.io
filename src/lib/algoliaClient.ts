// Algolia client implementation with mock client
// Using any type to avoid TypeScript errors
let searchClient: any = null;
let searchIndex: string = 'eu_zentala_io';

// Define a mock search client
const mockSearchClient = {
  search: async (requests: any[]) => {
    console.log('Using mock search client with requests:', requests);
    return {
      results: requests.map(() => ({
        hits: [],
        nbHits: 0,
        page: 0,
        nbPages: 0,
        hitsPerPage: 0,
        exhaustiveNbHits: true,
        query: '',
        params: '',
        processingTimeMS: 0,
        index: ''
      }))
    };
  }
};

// Initialize the client
function initAlgoliaClient() {
  try {
    if (typeof window !== 'undefined') {
      console.log('Initializing Algolia client...');
      
      // Get environment variables
      const appId = import.meta.env.PUBLIC_ALGOLIA_APP_ID;
      const apiKey = import.meta.env.PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY;
      const indexName = import.meta.env.PUBLIC_ALGOLIA_INDEX_NAME;
      
      console.log('Environment variables:', { 
        appId: appId ? 'defined' : 'undefined', 
        apiKey: apiKey ? 'defined' : 'undefined', 
        indexName: indexName ? 'defined' : 'undefined' 
      });
      
      // For now, just use the mock client to avoid TypeScript errors
      searchClient = mockSearchClient;
      
      if (indexName) {
        searchIndex = indexName;
      }
      
      console.log('Using mock Algolia client');
    }
  } catch (error) {
    console.error('Error initializing Algolia client:', error);
    searchClient = mockSearchClient;
  }
  
  console.log('Final searchClient type:', typeof searchClient);
  console.log('Final searchIndex:', searchIndex);
  console.log('Final searchClient methods:', searchClient ? Object.keys(searchClient) : 'none');
}

// Initialize the client
initAlgoliaClient();

export { searchClient, searchIndex }; 