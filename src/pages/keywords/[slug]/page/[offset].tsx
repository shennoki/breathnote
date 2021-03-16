import BlogCard from 'components/BlogCard'
import Pagination from 'components/Pagination'
import Body from 'layout/Body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { getKeyword, getKeywordPosts } from 'scripts/getter'
import { ALL_KEYWORDS } from 'scripts/store'
import { KeywordType, PageOptionType, PostType } from 'types'
import { ARTICLE_PER_PAGE, SITE_DOMAIN, SITE_TITLE } from 'utils/env'

type Props = {
  posts: PostType[]
  allPostLength: number
  keyword: KeywordType
  option: PageOptionType
  offset: number
}

const Keyword: NextPage<Props> = ({ posts, allPostLength, keyword, option, offset }) => {
  return (
    <>
      <Head>
        <link rel="canonical" href={option.fullPath} />
        <title>{`${keyword.name} (${offset}) | ${SITE_TITLE}`}</title>
        <meta name="description" content={keyword.description} />
        <meta property="og:url" content={option.fullPath} />
        <meta property="og:title" content={`${keyword.name} (${offset}) | ${SITE_TITLE}`} />
        <meta property="og:description" content={keyword.description} />
        <meta property="og:image" content={`${SITE_DOMAIN}/img/og-image.jpg`} />
        <link
          rel="prev"
          href={
            offset === 2
              ? `${SITE_DOMAIN}/keywords/${keyword.slug}`
              : `${SITE_DOMAIN}/keywords/${keyword.slug}/page/${offset - 1}`
          }
        />
        {offset !== Math.ceil(allPostLength / ARTICLE_PER_PAGE) ? (
          <link rel="next" href={`${SITE_DOMAIN}/keywords/${keyword.slug}/page/${offset + 1}`} />
        ) : null}
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <Body pageType={option.pageType} fullPath={option.fullPath}>
        <section>
          <h1 className="mb-6 sm:mb-8 md:mb-10 text-xl sm:text-2xl md:text-3xl text-center">
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
        <Pagination allPostLength={allPostLength} pageType={option.pageType} offset={offset} slug={keyword.slug} />
      </Body>
    </>
  )
}

export default Keyword

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const offset = Number(params?.offset)
  const keyword = await getKeyword(slug)
  const keywordPosts = await getKeywordPosts(slug)
  const posts = keywordPosts.slice(ARTICLE_PER_PAGE * offset - ARTICLE_PER_PAGE, ARTICLE_PER_PAGE * offset)
  const allPostLength = keywordPosts.length
  const option = {
    pageType: 'keyword',
    fullPath: `${SITE_DOMAIN}/keywords/${keyword.slug}/page/${offset}`,
  }

  if (posts.length === 0) return { notFound: true }

  return {
    props: {
      posts,
      allPostLength,
      keyword,
      option,
      offset,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = (await ALL_KEYWORDS).contents.map((keyword) => {
    return keyword.slug
  })
  const offsets = slugs.map(async (slug) => {
    const length = (await getKeywordPosts(slug)).length
    return Math.floor(length / ARTICLE_PER_PAGE)
  })
  let paths: {
    params: {
      slug: string
      offset: string
    }
  }[] = []

  for (let i = 0; i < slugs.length; i++) {
    paths = [
      ...paths,
      {
        params: {
          slug: slugs[i],
          offset: String(offsets[i]),
        },
      },
    ]
  }

  return {
    paths,
    fallback: 'blocking',
  }
}
