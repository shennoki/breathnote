import Date from 'components/date'
import Body from 'layout/body'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { getAllPosts, getConfig } from 'scripts/getter'
import { sortByDesc } from 'scripts/sort'
import { ConfigType, PageOptionType, PostType } from 'types'

type Props = {
  config: ConfigType
  option: PageOptionType
  posts: PostType[]
}

const Home: NextPage<Props> = ({ config, option, posts }) => {
  return (
    <>
      <Head>
        <title>
          {config.siteTitle} | {config.siteSubTitle}
        </title>
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
      <Body config={config} pageType={option.pageType} fullPath={option.fullPath}>
        <section>
          {posts.map((post) => (
            <article key={post.id}>
              <Link href={`/posts/${post.slug}`}>
                <a>
                  <h2>{post.title}</h2>
                </a>
              </Link>
              <Date publishedAt={post.publishedAt} />
              {post.categories.map((category) => (
                <Link key={category.id} href={`/categories/${category.slug}`}>
                  <a>{category.title}</a>
                </Link>
              ))}
            </article>
          ))}
        </section>
      </Body>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const config = await getConfig()
  const allPosts = await getAllPosts()
  const posts = sortByDesc(allPosts)
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
    },
    revalidate: 60,
  }
}
