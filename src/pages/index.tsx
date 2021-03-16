import BlogCard from 'components/BlogCard'
import Pagination from 'components/Pagination'
import Body from 'layout/Body'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { ALL_POSTS } from 'scripts/store'
import { PageOptionType, PostType } from 'types'
import { ARTICLE_PER_PAGE, SITE_DESCRIPTION, SITE_DOMAIN, SITE_SUBTITLE, SITE_TITLE } from 'utils/env'

type Props = {
  posts: PostType[]
  allPostLength: number
  option: PageOptionType
}

const Home: NextPage<Props> = ({ posts, allPostLength, option }) => {
  return (
    <>
      <Head>
        <link rel="canonical" href={`${SITE_DOMAIN}/`} />
        <title>{`${SITE_TITLE} | ${SITE_SUBTITLE}`}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <meta property="og:url" content={`${SITE_DOMAIN}/`} />
        <meta property="og:title" content={`${SITE_TITLE} | ${SITE_SUBTITLE}`} />
        <meta property="og:description" content={SITE_DESCRIPTION} />
        <meta property="og:image" content={`${SITE_DOMAIN}/img/og-image.jpg`} />
        {Math.ceil(allPostLength / ARTICLE_PER_PAGE) !== 1 ? <link rel="next" href={`${SITE_DOMAIN}/page/2`} /> : null}
      </Head>
      <Body pageType={option.pageType} fullPath={option.fullPath}>
        <div>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <Pagination allPostLength={allPostLength} pageType={option.pageType} offset={1} />
      </Body>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await ALL_POSTS).contents.slice(0, ARTICLE_PER_PAGE)
  const allPostLength = (await ALL_POSTS).totalCount
  const option = {
    pageType: 'home',
    fullPath: `${SITE_DOMAIN}/`,
  }
  return {
    props: {
      posts,
      allPostLength,
      option,
    },
    revalidate: 60,
  }
}
