import BlogCard from 'components/BlogCard'
import Pagination from 'components/Pagination'
import Body from 'layout/Body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { PER_PAGE } from 'scripts/const'
import { getAllKeywords, getConfig, getKeyword, getKeywordPosts } from 'scripts/getter'
import { ConfigType, KeywordType, PageOptionType, PostType } from 'types'

type Props = {
  config: ConfigType
  option: PageOptionType
  posts: PostType[]
  allPostCount: number
  offset: number
  keyword: KeywordType
}

const Keyword: NextPage<Props> = ({ config, option, posts, allPostCount, offset, keyword }) => {
  return (
    <>
      <Head>
        <title>{`${keyword.name} | ${config.siteTitle}`}</title>
        <link
          rel="prev"
          href={
            offset === 2
              ? `${config.siteDomain}/keywords/${keyword.slug}`
              : `${config.siteDomain}/keywords/${keyword.slug}/page/${offset - 1}`
          }
        />
        {offset !== Math.ceil(allPostCount / PER_PAGE) ? (
          <link rel="next" href={`${config.siteDomain}/keywords/${keyword.slug}/page/${offset + 1}`} />
        ) : null}
        <meta name="description" content={keyword.description} />
        <meta property="og:title" content={`${keyword.name} | ${config.siteTitle}`} />
        <meta property="og:description" content={keyword.description} />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        {/* 以下変更不要 */}
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:url" content={option.fullPath} />
        <link rel="canonical" href={option.fullPath} />
        {option.isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
      </Head>
      <Body pageType={option.pageType} fullPath={option.fullPath}>
        <section>
          <h1 className="mb-4 md:mb-8 lg:mb-10 text-xl md:text-3xl text-center">
            <span className="text-2xl md:text-4xl text-accent dark:text-yellow-300 tracking-wider">{keyword.name}</span>
            の記事
          </h1>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </section>
        <Pagination allPostCount={allPostCount} pageType={option.pageType} offset={offset} slug={keyword.slug} />
      </Body>
    </>
  )
}

export default Keyword

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const offset = Number(params?.offset)
  const config = await getConfig()
  const keyword = await getKeyword(slug)
  const keywordPosts = await getKeywordPosts(slug, 'desc')
  const posts = keywordPosts.slice(PER_PAGE * offset - PER_PAGE, PER_PAGE * offset)
  const allPostCount = keywordPosts.length
  const option = {
    pageType: 'keyword',
    fullPath: `${config.siteDomain}/keywords/${keyword.slug}/page/${offset}`,
    isNoIndex: true,
  }

  if (posts.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      config,
      option,
      posts,
      allPostCount,
      offset,
      keyword,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = (await getAllKeywords()).map((keyword) => {
    return keyword.slug
  })
  const offsets = slugs.map(async (slug) => {
    const length = (await getKeywordPosts(slug, 'desc')).length
    return Math.floor(length / PER_PAGE)
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
