import Date from 'components/date'
import Body from 'layout/body'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { getAllPosts, getConfig } from 'scripts/getter'
import { sortByDesc } from 'scripts/sort'
import { ConfigType, PostType } from 'types'

type Props = {
  config: ConfigType
  posts: PostType[]
}

const Home: NextPage<Props> = ({ config, posts }) => {
  const pageType = 'home'
  const fullPath = config.siteDomain
  const isNoIndex = false

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
        {isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
        <link rel="canonical" href={fullPath} />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        <meta property="og:url" content={fullPath} />
      </Head>
      <Body config={config} pageType={pageType} fullPath={fullPath}>
        <section>
          {posts.map((post) => (
            <article key={post.id}>
              <Link href="/posts/[slug]" as={`/posts/${post.slug}`}>
                <a>
                  <h2>{post.title}</h2>
                </a>
              </Link>
              <Date publishedAt={post.publishedAt} />
              {post.categories.map((category) => (
                <Link key={category.id} href="/categories/[slug]" as={`/categories/${category.slug}`}>
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
  return {
    props: {
      config,
      posts,
    },
  }
}
