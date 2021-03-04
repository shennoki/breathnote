import BlogCard from 'components/BlogCard'
import Pagination from 'components/Pagination'
import Body from 'layout/Body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { getAllKeywordPaths, getKeyword, getKeywordPosts } from 'scripts/getter'
import { KeywordType, PageOptionType, PostType } from 'types'

type Props = {
  posts: PostType[]
  allPostLength: number
  keyword: KeywordType
  option: PageOptionType
}

const Keyword: NextPage<Props> = ({ posts, allPostLength, keyword, option }) => {
  return (
    <>
      <Head>
        <link rel="canonical" href={option.fullPath} />
        <title>{`${keyword.name} | ${process.env.NEXT_PUBLIC_SITE_TITLE}`}</title>
        <meta name="description" content={keyword.description} />
        <meta property="og:url" content={option.fullPath} />
        <meta property="og:title" content={`${keyword.name} | ${process.env.NEXT_PUBLIC_SITE_TITLE}`} />
        <meta property="og:description" content={keyword.description} />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_DOMAIN}/img/og-image.jpg`} />
        {Math.ceil(allPostLength / Number(process.env.NEXT_PUBLIC_ARTICLE_PER_PAGE)) !== 1 ? (
          <link rel="next" href={`${option.fullPath}/page/2`} />
        ) : null}
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Body pageType={option.pageType} fullPath={option.fullPath}>
        <section>
          <h1 className="mb-4 sm:mb-6 md:mb-8 text-xl sm:text-2xl md:text-3xl text-center">
            <span className="text-2xl sm:text-3xl md:text-4xl text-accent-light dark:text-accent-dark tracking-wider">
              {keyword.name}
            </span>
            の記事
          </h1>
          <p className="w-11/12 md:w-auto mx-auto mb-6 sm:mb-8 md:mb-10 text-xs sm:text-sm md:table">
            {keyword.description}
          </p>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </section>
        <Pagination allPostLength={allPostLength} pageType={option.pageType} offset={1} slug={keyword.slug} />
      </Body>
    </>
  )
}

export default Keyword

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const keyword = await getKeyword(slug)

  if (!keyword) return { notFound: true }

  const keywordPosts = await getKeywordPosts(slug)
  const posts = keywordPosts.slice(0, Number(process.env.NEXT_PUBLIC_ARTICLE_PER_PAGE))
  const allPostLength = keywordPosts.length
  const option = {
    pageType: 'keyword',
    fullPath: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/keywords/${keyword.slug}`,
  }

  return {
    props: {
      posts,
      allPostLength,
      keyword,
      option,
    },
    revalidate: 300,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllKeywordPaths()

  return {
    paths,
    fallback: 'blocking',
  }
}
