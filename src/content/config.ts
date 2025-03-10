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

// Define schema for transcripts collection
const transcriptSchema = baseSchema.extend({
    // YouTube specific information
    youtubeId: z.string(), // YouTube video ID
    channelName: z.string(), // YouTube channel name
    channelUrl: z.string().url(), // YouTube channel URL
    videoDate: z.string(), // Publication date of the video
    
    // AI generation metadata
    aiGenerated: z.boolean().default(true),
    generationDate: z.string().optional(), // When the transcript was generated
    publishDate: z.string().optional(), // When the transcript was published on the site
    
    // Additional fields
    duration: z.string(), // Duration of video content (e.g., "10:24")
    language: z.string(), // Language of the original content
    
    // Content-specific fields
    fullTranscript: z.boolean().default(false), // Whether this is a full transcript or partial with summary
    keyPoints: z.array(z.string()).optional(), // Array of key points from the video
});

export const collections = {
    docs: defineCollection({
        schema: baseSchema
    }),
    ideas: defineCollection({
        schema: baseSchema
    }),
    transcripts: defineCollection({
        schema: transcriptSchema
    })
};
