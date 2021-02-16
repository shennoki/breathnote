import BlogCard from 'components/BlogCard'
import Pagination from 'components/Pagination'
import Body from 'layout/Body'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { PER_PAGE } from 'scripts/const'
import { getAllPosts, getConfig } from 'scripts/getter'
import { ConfigType, PageOptionType, PostType } from 'types'

type Props = {
  config: ConfigType
  option: PageOptionType
  posts: PostType[]
  allPostCount: number
}

const Home: NextPage<Props> = ({ config, option, posts, allPostCount }) => {
  return (
    <>
      <Head>
        <title>
          {config.siteTitle} | {config.siteSubTitle}
        </title>
        {Math.ceil(allPostCount / PER_PAGE) !== 1 ? (
          <link rel="next" href={`${config.siteDomain}/page/2`}></link>
        ) : null}
        <meta name="description" content={config.siteDescription} />
        <meta name="keywords" content={config.siteKeywords} />
        <meta property="og:title" content={`${config.siteTitle} | ${config.siteSubTitle}`} />
        <meta property="og:description" content={config.siteDescription} />
        {/* 以下変更不要 */}
        {option.isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
        <link rel="canonical" href={option.fullPath} />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        <meta property="og:url" content={option.fullPath} />
      </Head>
      <Body pageType={option.pageType} fullPath={option.fullPath}>
        <section>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </section>
        <Pagination allPostCount={allPostCount} pageType={option.pageType} offset={1} />
      </Body>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const config = await getConfig()
  const allPosts = await getAllPosts('desc')
  const posts = allPosts.slice(0, PER_PAGE)
  const allPostCount = allPosts.length
  const option = {
    pageType: 'home',
    fullPath: config.siteDomain,
    isNoIndex: false,
  }

  return {
    props: {
      config,
      option,
      posts,
      allPostCount,
    },
    revalidate: 60,
  }
}
