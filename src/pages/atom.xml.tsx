import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import RSS from 'rss'
import { ALL_POSTS } from 'scripts/store'
import { PostType } from 'types'
import { SITE_DESCRIPTION, SITE_DOMAIN, SITE_TITLE } from 'utils/env'

const generateFeedXml = async (posts: PostType[]) => {
  const feed = new RSS({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site_url: `${SITE_DOMAIN}/`,
    feed_url: `${SITE_DOMAIN}/atom.xml`,
    language: 'ja',
  })

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: `<img src="${post.thumbnail ? post.thumbnail.url : `${SITE_DOMAIN}/img/og-image.jpg`}" />${
        post.description
      }`,
      url: `${SITE_DOMAIN}/posts/${post.slug}`,
      author: 'Shinki',
      date: post.publishedAt,
    })
  })

  return feed.xml()
}

export const getServerSideProps: GetServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const posts = (await ALL_POSTS).contents
  const xml = await generateFeedXml(posts)

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
