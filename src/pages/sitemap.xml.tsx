import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import { getAllPosts, getConfig } from 'scripts/getter'
import { sortByDesc } from 'scripts/sort'
import { ConfigType, PostType } from 'types'

const generateSitemapXml = async (posts: PostType[], config: ConfigType) => {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
        ${posts
          .map((post) => {
            return `
              <url>
                <loc>${`${config.siteDomain}/posts/${post.slug}`}</loc>
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
  const config = await getConfig()
  const posts = await getAllPosts()
  const sortedPosts = sortByDesc(posts)
  const xml = await generateSitemapXml(sortedPosts, config)

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
