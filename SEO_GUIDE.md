# SEO Guide for Real Estate Website

## Overview

This guide covers the comprehensive SEO implementation for the Jan Jírek Real Estate website built with Astro.

## Implemented SEO Features

### 1. Technical SEO

- ✅ **Sitemap Generation**: Automatic sitemap with proper priorities
- ✅ **Robots.txt**: Proper crawling instructions
- ✅ **Canonical URLs**: Prevent duplicate content issues
- ✅ **Meta Tags**: Complete meta tag implementation
- ✅ **Structured Data**: JSON-LD for real estate listings
- ✅ **Open Graph**: Social media sharing optimization
- ✅ **Twitter Cards**: Twitter-specific meta tags

### 2. Real Estate Specific SEO

- ✅ **Property Schema**: RealEstateListing structured data
- ✅ **Location Data**: Address and location information
- ✅ **Price Information**: Property pricing in structured data
- ✅ **Property Details**: Bedrooms, bathrooms, area
- ✅ **Property Type**: Categorization for search engines

### 3. Performance SEO

- ✅ **Image Optimization**: Cloudinary integration
- ✅ **Font Preloading**: Performance optimization
- ✅ **PWA Support**: Web manifest for mobile experience
- ✅ **Responsive Design**: Mobile-first approach

## Key Components

### SEO Component (`src/components/SEO.astro`)

Handles all meta tags, structured data, and social media optimization:

```astro
<SEO
  title="Property Title"
  description="Enhanced property description"
  type="real-estate"
  propertyType="Byt"
  location="Pardubice"
  price="15,000 Kč"
/>
```

### Layout Integration (`src/layouts/Layout.astro`)

Updated to use the comprehensive SEO component with all necessary props.

### Sitemap (`src/pages/sitemap.xml.ts`)

Custom sitemap generator with proper priorities:

- Homepage: 1.0
- Estate pages: 0.9
- Service pages: 0.8
- Blog pages: 0.7

## Content Optimization

### Estate Pages

- Enhanced descriptions with location and price
- Property-specific structured data
- Optimized images with alt text
- Social sharing with proper meta tags

### Blog Posts

- Article structured data
- Author information
- Publication dates
- Category and tag support

## Local SEO for Real Estate

### Location Optimization

- City-specific keywords (Pardubice, Hradec Králové)
- Neighborhood targeting
- Property type optimization

### Keywords Strategy

Primary Keywords:

- "pronájem bytů Pardubice"
- "prodej nemovitostí Hradec Králové"
- "realitní makléř Pardubice"
- "byt 3+kk Pardubice"

Long-tail Keywords:

- "pronájem bytu 3+kk Pardubice Polabiny"
- "prodej rodinného domu Hradec Králové"
- "realitní služby Pardubice okolí"

## Technical Implementation

### Astro Configuration (`astro.config.mjs`)

```javascript
export default defineConfig({
  site: 'https://janjirek.cz',
  integrations: [
    sitemap({
      filter: page => !page.includes('404'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});
```

### Robots.txt (`public/robots.txt`)

```
User-agent: *
Allow: /
Sitemap: https://janjirek.cz/sitemap-index.xml
```

## Monitoring and Analytics

### Recommended Tools

1. **Google Search Console**: Monitor indexing and performance
2. **Google Analytics**: Track user behavior
3. **Google PageSpeed Insights**: Performance monitoring
4. **Schema.org Validator**: Test structured data

### Key Metrics to Track

- Organic traffic growth
- Property page views
- Contact form submissions
- Local search rankings
- Mobile performance scores

## Best Practices for Real Estate SEO

### 1. Content Strategy

- Regular property updates
- Local market insights
- Neighborhood guides
- Investment advice

### 2. Image Optimization

- High-quality property photos
- Descriptive alt text
- Optimized file sizes
- Responsive images

### 3. Local SEO

- Google My Business optimization
- Local citations
- Customer reviews
- Neighborhood content

### 4. Technical SEO

- Fast loading times
- Mobile-friendly design
- Secure HTTPS
- Clean URL structure

## Future Enhancements

### Planned Improvements

1. **Blog Content**: Regular real estate market updates
2. **Local Pages**: Neighborhood-specific content
3. **Video Content**: Property walkthroughs
4. **Review System**: Customer testimonials
5. **Advanced Schema**: More detailed property data

### Advanced Features

1. **Property Search**: Advanced filtering
2. **Map Integration**: Interactive property maps
3. **Lead Generation**: Enhanced contact forms
4. **Analytics**: Conversion tracking

## Maintenance Checklist

### Monthly Tasks

- [ ] Review Google Search Console
- [ ] Update property listings
- [ ] Check for broken links
- [ ] Monitor page speed

### Quarterly Tasks

- [ ] Update content strategy
- [ ] Review keyword performance
- [ ] Optimize underperforming pages
- [ ] Update local citations

### Annual Tasks

- [ ] Complete SEO audit
- [ ] Update technical infrastructure
- [ ] Review competitor analysis
- [ ] Plan content calendar

## Conclusion

This SEO implementation provides a solid foundation for real estate website optimization. The combination of technical SEO, local optimization, and real estate-specific features will help improve search rankings and drive qualified leads.

Remember to:

- Regularly update property listings
- Create valuable local content
- Monitor performance metrics
- Stay updated with SEO best practices
- Focus on user experience and conversion optimization
