import { getCollection } from 'astro:content';

export async function GET() {
  const baseUrl = 'https://janjirek.cz';

  // Get all estate entries
  const estateEntries = await getCollection('catalogue');

  // Get all blog entries
  const blogEntries = await getCollection('blog');

  // Define static pages
  const staticPages = ['', '/nemovitosti', '/sluzby', '/reference', '/blog', '/kontakt', '/o-mne'];

  // Create sitemap entries
  const sitemapEntries = [
    // Static pages
    ...staticPages.map(page => ({
      url: `${baseUrl}${page}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly' as const,
      priority: page === '' ? 1.0 : 0.8,
    })),

    // Estate pages
    ...estateEntries.map(entry => ({
      url: `${baseUrl}/nemovitosti/${entry.data.slug}`,
      lastmod: new Date(entry.data.date).toISOString(),
      changefreq: 'weekly' as const,
      priority: 0.9,
    })),

    // Blog pages
    ...blogEntries.map(entry => ({
      url: `${baseUrl}${entry.data.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries
  .map(
    entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
