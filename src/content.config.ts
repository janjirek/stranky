// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';
import { cldAssetsLoader } from 'astro-cloudinary/loaders';

const referencesCollection = defineCollection({
  loader: file('src/content/general/references.json'),
  schema: z.object({
    id: z.number(),
    fullname: z.string(),
    content: z.string(),
  }),
});

const aboutCollection = defineCollection({
  loader: glob({ pattern: 'about.md', base: './src/content/general' }),
  schema: z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string(),
    ico: z.number(),
    area: z.string(),
    facebook: z.string(),
    linkedin: z.string(),
    instagram: z.string(),
    youtube: z.string(),
    years: z.number(),
    estates: z.number(),
    clients: z.number(),
  }),
});

const termsCollection = defineCollection({
  loader: glob({ pattern: 'terms.md', base: './src/content/general' }),
  schema: z.object({
    title: z.string(),
  }),
});

const catalogueCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/catalogue' }),
  schema: z.object({
    title: z.string(),
    type: z.string(),
    thumbnail: z.string().optional(),
    thumbnail_local: z.string().optional(),
    date: z.date(),
    description: z.string(),
    location: z.string(),
    slug: z.string(),
    price: z.string(),
    mapy_link: z.string(),
    youtube_link: z.string().optional(),
    tags: z.array(z.string()),
    images: z.array(z.string()).optional(),
    images_local: z.array(z.string()).optional(),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    author: z.string(),
    title: z.string(),
    date: z.date(),
    description: z.string(),
    thumbnail: z.string().optional(),
    thumbnail_local: z.string().optional(),
    youtube_link: z.string().optional(),
    slug: z.string(),
  }),
});

const contractsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/contracts' }),
  schema: z.object({
    title: z.string(),
    type: z.string().optional(),
    thumbnail: z.string().optional(),
    thumbnail_local: z.string().optional(),
    date: z.date(),
    description: z.string(),
    location: z.string().optional(),
    slug: z.string(),
    price: z.string().optional(),
    mapy_link: z.string().optional(),
    youtube_link: z.string().optional(),
    tags: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    images_local: z.array(z.string()).optional(),
  }),
});

export const images = {
  assets: defineCollection({
    loader: cldAssetsLoader({
      folder: 'stranky', // Optional, without loads root directory
    }),
  }),
};

export const collections = {
  references: referencesCollection,
  about: aboutCollection,
  catalogue: catalogueCollection,
  blog: blogCollection,
  images: images.assets,
  terms: termsCollection,
  contracts: contractsCollection,
};
