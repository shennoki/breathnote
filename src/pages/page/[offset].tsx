import BlogCard from 'components/BlogCard'
import Pagination from 'components/Pagination'
import Body from 'layout/Body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { ALL_POSTS } from 'scripts/store'
import { PageOptionType, PostType } from 'types'

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
        <title>{`${process.env.NEXT_PUBLIC_SITE_TITLE} (${offset}) | ${process.env.NEXT_PUBLIC_SITE_SUBTITLE}`}</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />
        <meta property="og:url" content={option.fullPath} />
        <meta
          property="og:title"
          content={`${process.env.NEXT_PUBLIC_SITE_TITLE} (${offset}) | ${process.env.NEXT_PUBLIC_SITE_SUBTITLE}`}
        />
        <meta property="og:description" content={process.env.NEXT_PUBLIC_SITE_DESCRIPTION} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_DOMAIN}/img/og-image.jpg`} />
        <link
          rel="prev"
          href={
            offset === 2
              ? `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/`
              : `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/page/${offset - 1}`
          }
        />
        {offset !== Math.ceil(allPostLength / Number(process.env.NEXT_PUBLIC_ARTICLE_PER_PAGE)) ? (
          <link rel="next" href={`${process.env.NEXT_PUBLIC_SITE_DOMAIN}/page/${offset + 1}`} />
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
  const PER_PAGE = Number(process.env.NEXT_PUBLIC_ARTICLE_PER_PAGE)
  const offset = Number(params?.offset)
  const posts = (await ALL_POSTS).contents.slice(PER_PAGE * offset - PER_PAGE, PER_PAGE * offset)
  const allPostLength = (await ALL_POSTS).totalCount
  const option = {
    pageType: 'home',
    fullPath: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/page/${offset}`,
  }

  if (posts.length === 0) return { notFound: true }

  return {
    props: {
      posts,
      allPostLength,
      option,
      offset,
    },
    revalidate: 300,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPostLength = (await ALL_POSTS).totalCount
  let paths: { params: { offset: string } }[] = []
  for (let i = 0; i < Math.floor(allPostLength / Number(process.env.NEXT_PUBLIC_ARTICLE_PER_PAGE)); i++) {
    paths = [...paths, { params: { offset: String(i + 2) } }]
  }
  return {
    paths,
    fallback: 'blocking',
  }
}
