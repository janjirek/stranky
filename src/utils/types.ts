import type { InferEntrySchema, RenderedContent } from 'astro:content';

export type Testemonial = {
  id: string;
  body?: string;
  collection: 'references';
  data: InferEntrySchema<'references'>;
  rendered?: RenderedContent;
  filePath?: string;
};
