import { defineCollection, z } from 'astro:content';

// Define common schema for all content collections
const baseSchema = z.object({
    title: z.string(),
    description: z.string(),
    tags: z.string().optional(),
    author: z.string().optional(),
    slug: z.string().optional(), // Add custom slug support
    draft: z.boolean().optional().default(false) // Add draft status option
});

export const collections = {
    docs: defineCollection({
        schema: baseSchema
    }),
    ideas: defineCollection({
        schema: baseSchema
    })
};
