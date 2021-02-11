import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import RSS from 'rss'
import { getAllPosts, getConfig } from 'scripts/getter'
import { sortByDesc } from 'scripts/sort'
import { ConfigType, PostType } from 'types'

const generateFeedXml = async (posts: PostType[], config: ConfigType) => {
  const feed = new RSS({
    title: config.siteTitle,
    description: config.siteDescription,
    site_url: config.siteDomain,
    feed_url: `${config.siteDomain}/feed`,
    language: 'ja',
  })

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      date: new Date(post.publishedAt),
      url: `${config.siteDomain}/posts/${post.slug}`,
    })
  })

  return feed.xml()
}

export const getServerSideProps: GetServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const config = await getConfig()
  const posts = await getAllPosts()
  const sortedPosts = sortByDesc(posts)
  const xml = await generateFeedXml(sortedPosts, config)

  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Content-Type', 'text/xml')
  res.end(xml)

  return {
    props: {},
  }
}

const Feed: NextPage = () => null
export default Feed
