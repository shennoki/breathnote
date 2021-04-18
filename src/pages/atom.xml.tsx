import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import RSS from 'rss'
import { Post } from 'types/post'
import { API_ENDPOINT, API_KEY, SITE_DESCRIPTION, SITE_DOMAIN, SITE_TITLE } from 'utils/env'

const generateFeedXml = async (posts: Post[]) => {
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
      description: `<img src="${post.thumbnail ? post.thumbnail.url : `${SITE_DOMAIN}/img/og-img.jpg`}" />${
        post.description
      }`,
      url: `${SITE_DOMAIN}/posts/${post.slug}`,
      author: 'Shinki',
      date: post.publishedAt,
    })
  })

  return feed.xml()
}

const AtomFeed: NextPage = () => null
export default AtomFeed

export const getServerSideProps: GetServerSideProps = async ({ res }: GetServerSidePropsContext) => {
  const posts: Post[] = await axios
    .get(`${API_ENDPOINT}/posts?limit=20`, { headers: { 'X-API-KEY': API_KEY } })
    .then((res) => res.data.contents)
    .catch((err) => {
      throw new Error(`FETCH FAILED (atom.xml) : ${err}`)
    })
  const xml = await generateFeedXml(posts)

  res.statusCode = 200
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate')
  res.setHeader('Content-Type', 'text/xml')
  res.end(xml)

  return {
    props: {},
  }
}
