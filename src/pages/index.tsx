import BlogCard from 'components/BlogCard'
import Pagination from 'components/Pagination'
import Body from 'layout/Body'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { ALL_POSTS } from 'scripts/store'
import { PageOptionType, PostType } from 'types'

type Props = {
  posts: PostType[]
  allPostLength: number
  option: PageOptionType
}

const Home: NextPage<Props> = ({ posts, allPostLength, option }) => {
  return (
    <>
      <Head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_SITE_DOMAIN}/`} />
        <title>{`${process.env.NEXT_PUBLIC_SITE_TITLE} | ${process.env.NEXT_PUBLIC_SITE_SUBTITLE}`}</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_SITE_DOMAIN}/`} />
        <meta
          property="og:title"
          content={`${process.env.NEXT_PUBLIC_SITE_TITLE} | ${process.env.NEXT_PUBLIC_SITE_SUBTITLE}`}
        />
        <meta property="og:description" content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_DOMAIN}/img/og-image.jpg`} />
        {Math.ceil(allPostLength / Number(process.env.NEXT_PUBLIC_ARTICLE_PER_PAGE)) !== 1 ? (
          <link rel="next" href={`${process.env.NEXT_PUBLIC_SITE_DOMAIN}/page/2`} />
        ) : null}
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
  const posts = (await ALL_POSTS).contents.slice(0, Number(process.env.NEXT_PUBLIC_ARTICLE_PER_PAGE))
  const allPostLength = (await ALL_POSTS).totalCount
  const option = {
    pageType: 'home',
    fullPath: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/`,
  }
  return {
    props: {
      posts,
      allPostLength,
      option,
    },
    revalidate: 300,
  }
}
