import { getFormattedDate } from 'libs/date'
import { fetchAllPosts } from 'libs/store'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { Post } from 'types/post'
import { SITE_DOMAIN } from 'utils/env'

const generateSitemapXml = async (posts: Post[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:xhtml="http://www.w3.org/1999/xhtml"
              xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
              xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
              xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
                <url>
                  <loc>${`${SITE_DOMAIN}/`}</loc>
                  <lastmod>${getFormattedDate(posts[0].revisedAt, 'yyyy-MM-dd')}</lastmod>
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
                      <lastmod>${getFormattedDate(post.revisedAt, 'yyyy-MM-dd')}</lastmod>
                      <changefreq>weekly</changefreq>
                    </url>
                  `
                })
                .join('')}
            </urlset>
  `
}

export const getServerSideProps: GetServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const posts = (await fetchAllPosts()).contents
  const xml = await generateSitemapXml(posts)

  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Content-Type', 'text/xml')
  res.end(xml)

  return {
    props: {},
  }
}

const Sitemap: NextPage = () => null
export default Sitemap
