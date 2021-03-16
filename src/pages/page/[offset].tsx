import BlogCard from 'components/BlogCard'
import Pagination from 'components/Pagination'
import Body from 'layout/Body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { ALL_POSTS } from 'scripts/store'
import { PageOptionType, PostType } from 'types'
import { ARTICLE_PER_PAGE, SITE_DESCRIPTION, SITE_DOMAIN, SITE_SUBTITLE, SITE_TITLE } from 'utils/env'

type Props = {
  posts: PostType[]
  allPostLength: number
  option: PageOptionType
  offset: number
}

const Home: NextPage<Props> = ({ posts, allPostLength, option, offset }) => {
  return (
    <>
      <Head>
        <link rel="canonical" href={option.fullPath} />
        <title>{`${SITE_TITLE} (${offset}) | ${SITE_SUBTITLE}`}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={option.fullPath} />
        <meta property="og:title" content={`${SITE_TITLE} (${offset}) | ${SITE_SUBTITLE}`} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={`${SITE_DOMAIN}/img/og-image.jpg`} />
        <link rel="prev" href={offset === 2 ? `${SITE_DOMAIN}/` : `${SITE_DOMAIN}/page/${offset - 1}`} />
        {offset !== Math.ceil(allPostLength / ARTICLE_PER_PAGE) ? (
          <link rel="next" href={`${SITE_DOMAIN}/page/${offset + 1}`} />
        ) : null}
      </Head>
      <Body pageType={option.pageType} fullPath={option.fullPath}>
        <section>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </section>
        <Pagination allPostLength={allPostLength} pageType={option.pageType} offset={offset} />
      </Body>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const offset = Number(params?.offset)
  const posts = (await ALL_POSTS).contents.slice(
    ARTICLE_PER_PAGE * offset - ARTICLE_PER_PAGE,
    ARTICLE_PER_PAGE * offset
  )
  const allPostLength = (await ALL_POSTS).totalCount
  const option = {
    pageType: 'home',
    fullPath: `${SITE_DOMAIN}/page/${offset}`,
  }

  if (posts.length === 0) return { notFound: true }

  return {
    props: {
      posts,
      allPostLength,
      option,
      offset,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPostLength = (await ALL_POSTS).totalCount
  let paths: { params: { offset: string } }[] = []
  for (let i = 0; i < Math.floor(allPostLength / ARTICLE_PER_PAGE); i++) {
    paths = [...paths, { params: { offset: String(i + 2) } }]
  }
  return {
    paths,
    fallback: 'blocking',
  }
}
