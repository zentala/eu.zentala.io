# Algolia Indexing TODO List

Last updated: 3/14/2025, 8:50:20 PM

## Files exceeding Algolia size limit (10000 bytes)

### 1. src/content/transcripts/europe-make-or-break.mdx

- **Slug:** /transcripts/europe-make-or-break
- **Total size:** 18138 bytes
- **Content:** 17462 bytes (17254 characters)
- **Title:** 32 bytes (30 characters)
- **Description:** 145 bytes (143 characters)

### 2. src/content/transcripts/it-is-time-for-Intermarium-2.0-against-russia.mdx

- **Slug:** /transcripts/it-is-time-for-Intermarium-2.0-against-russia
- **Total size:** 23354 bytes
- **Content:** 22610 bytes (22381 characters)
- **Title:** 47 bytes (45 characters)
- **Description:** 150 bytes (148 characters)

### 3. src/content/transcripts/the-eu-could-die.mdx

- **Slug:** /transcripts/the-eu-could-die
- **Total size:** 20236 bytes
- **Content:** 19568 bytes (19332 characters)
- **Title:** 42 bytes (40 characters)
- **Description:** 137 bytes (135 characters)

## How to fix the issue

1. Open the file mentioned above
2. Shorten the content of the field that is too long (usually the "content" field)
3. Run the indexing process again: `npm run index-algolia`

Algolia has a 10KB limit per record. Most often, the problem is with the "content" field being too long.
