import { getFormattedDate } from 'libs/date'
import { Post } from 'types/post'
import { SITE_DOMAIN } from 'utils/env'

export const generateSitemap = (posts: Post[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:xhtml="http://www.w3.org/1999/xhtml"
              xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
              xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
              xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
                <url>
                  <loc>${`${SITE_DOMAIN}/`}</loc>
                  <lastmod>${getFormattedDate(posts[0].publishedAt, 'yyyy-MM-dd')}</lastmod>
                  <changefreq>daily</changefreq>
                  <priority>1.0</priority>
                </url>
                <url>
                  <loc>${`${SITE_DOMAIN}/about`}</loc>
                  <changefreq>never</changefreq>
                </url>
              ${posts
                .map((post) => {
                  return `
                    <url>
                      <loc>${`${SITE_DOMAIN}/posts/${post.slug}`}</loc>
                      <lastmod>${getFormattedDate(post.publishedAt, 'yyyy-MM-dd')}</lastmod>
                      <changefreq>weekly</changefreq>
                    </url>
                  `
                })
                .join('')}
            </urlset>
  `
}
