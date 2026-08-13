import { defineCollection, defineContentConfig } from '@harlan-zw/comark-content'
import { z } from 'zod'

const ogImageSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
}).loose()

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string().default(''),
        layout: z.enum(['centered', 'default', 'page', 'post']).optional(),
        prose: z.boolean().default(true),
        breadcrumbs: z.boolean().default(true),
        h1: z.boolean().default(true),
        wide: z.boolean().default(false),
        icon: z.string().optional(),
        image: z.string().optional(),
        status: z.enum(['published', 'sponsors-only', 'unlisted']).default('published'),
        publishedAt: z.string().optional(),
        newsletter: z.boolean().default(false),
        tags: z.array(z.string()).default([]),
        ogImage: ogImageSchema.optional(),
      }),
      indexes: [
        { columns: ['publishedAt'] },
        { columns: ['newsletter'] },
        { columns: ['status'] },
      ],
    }),
  },
})
