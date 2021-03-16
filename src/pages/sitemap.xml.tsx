import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { ALL_POSTS } from 'scripts/store'
import { PostType } from 'types'
import { SITE_DOMAIN } from 'utils/env'

const generateSitemapXml = async (posts: PostType[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:xhtml="http://www.w3.org/1999/xhtml"
              xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
              xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
              xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
              ${posts
                .map((post) => {
                  return `
                    <url>
                      <loc>${`${SITE_DOMAIN}/posts/${post.slug}`}</loc>
                      <lastmod>${post.publishedAt}</lastmod>
                      <changefreq>weekly</changefreq>
                    </url>
                  `
                })
                .join('')}
            </urlset>
  `
}

export const getServerSideProps: GetServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const posts = (await ALL_POSTS).contents
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
