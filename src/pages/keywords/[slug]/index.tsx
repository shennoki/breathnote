import BlogCard from 'components/BlogCard'
import Pagination from 'components/Pagination'
import Body from 'layout/Body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { PER_PAGE } from 'scripts/const'
import { getAllKeywordPaths, getConfig, getKeyword, getKeywordPosts } from 'scripts/getter'
import { ConfigType, KeywordType, PageOptionType, PostType } from 'types'

type Props = {
  config: ConfigType
  option: PageOptionType
  posts: PostType[]
  allPostCount: number
  keyword: KeywordType
}

const Keyword: NextPage<Props> = ({ config, option, posts, allPostCount, keyword }) => {
  return (
    <>
      <Head>
        <title>{`${keyword.name} | ${config.siteTitle}`}</title>
        {Math.ceil(allPostCount / PER_PAGE) !== 1 ? <link rel="next" href={`${option.fullPath}/page/2`} /> : null}
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
        <Pagination allPostCount={allPostCount} pageType={option.pageType} offset={1} slug={keyword.slug} />
      </Body>
    </>
  )
}

export default Keyword

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const config = await getConfig()
  const keyword = await getKeyword(slug)

  if (!keyword) {
    return {
      notFound: true,
    }
  }

  const keywordPosts = await getKeywordPosts(slug, 'desc')
  const posts = keywordPosts.slice(0, PER_PAGE)
  const allPostCount = keywordPosts.length
  const option = {
    pageType: 'keyword',
    fullPath: `${config.siteDomain}/keywords/${keyword.slug}`,
    isNoIndex: true,
  }

  return {
    props: {
      config,
      option,
      posts,
      allPostCount,
      keyword,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllKeywordPaths()

  return {
    paths,
    fallback: 'blocking',
  }
}
