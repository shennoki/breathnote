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
        <title>{`${config.siteTitle} | ${config.siteSubTitle}`}</title>
        {Math.ceil(allPostCount / PER_PAGE) !== 1 ? <link rel="next" href={`${config.siteDomain}/page/2`} /> : null}
        <meta name="description" content={config.siteDescription} />
        <meta property="og:title" content={`${config.siteTitle} | ${config.siteSubTitle}`} />
        <meta property="og:description" content={config.siteDescription} />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        {/* 以下変更不要 */}
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:url" content={option.fullPath + '/'} />
        <link rel="canonical" href={option.fullPath + '/'} />
        {option.isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
      </Head>
      <Body pageType={option.pageType} fullPath={option.fullPath + '/'}>
        <div>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
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
