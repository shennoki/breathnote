import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import RSS from 'rss'
import { ALL_POSTS } from 'scripts/store'
import { PostType } from 'types'

const generateFeedXml = async (posts: PostType[]) => {
  const feed = new RSS({
    title: process.env.NEXT_PUBLIC_SITE_TITLE as string,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION as string,
    site_url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/`,
    feed_url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/atom.xml`,
    language: 'ja',
  })

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: `<img src="${
        post.thumbnail ? post.thumbnail.url : `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/img/og-image.jpg`
      }" />${post.description}`,
      url: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/posts/${post.slug}`,
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
