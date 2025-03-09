import { defineCollection, z } from 'astro:content';

// Define common schema for all content collections
const baseSchema = z.object({
    title: z.string(),
    description: z.string(),
    tags: z.string().optional(),
    author: z.string().optional(),
    customSlug: z.string().optional(), // Renamed from slug to customSlug to avoid conflict with Astro's reserved slug field
    draft: z.boolean().optional().default(false) // Add draft status option
});

// Define schema for summaries collection
const summarySchema = baseSchema.extend({
    // Source information
    sourceType: z.enum(['youtube', 'article', 'podcast', 'interview', 'other']),
    sourceUrl: z.string().url(),
    sourceId: z.string().optional(), // YouTube ID, article ID, etc.
    sourceTitle: z.string().optional(), // Original title if different from summary title
    sourceAuthor: z.string().optional(), // Original author/creator
    sourceAuthorUrl: z.string().url().optional(), // URL to author profile/channel
    sourceDate: z.string().optional(), // Publication date of original content
    
    // AI generation metadata
    aiGenerated: z.boolean().default(true),
    generationDate: z.string().optional(), // When the summary was generated
    publishDate: z.string().optional(), // When the summary was published on the site
    generationPrompt: z.string().optional(),
    
    // Additional fields
    coverImage: z.string().optional(), // URL or path to cover image
    duration: z.string().optional(), // Duration of video/audio content
    language: z.string().optional(), // Language of the original content
    
    // Content type-specific fields
    youtubeEmbed: z.boolean().optional().default(true), // Whether to embed YouTube player
    transcriptOnly: z.boolean().optional().default(false), // Is this only a transcript or a summary
    keyPoints: z.array(z.string()).optional(), // Array of key points from content
});

export const collections = {
    docs: defineCollection({
        schema: baseSchema
    }),
    ideas: defineCollection({
        schema: baseSchema
    }),
    summaries: defineCollection({
        schema: summarySchema
    })
};
