import Date from 'components/date'
import Body from 'layout/body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { getAllPostPaths, getConfig, getPost } from 'scripts/getter'
import { ConfigType, PostType } from 'types'

type Props = {
  config: ConfigType
  post: PostType
}

const Post: NextPage<Props> = ({ config, post }) => {
  const pageType = 'post'
  const fullPath = `${config.siteDomain}/posts/${post.slug}`
  const isNoIndex = false

  return (
    <>
      <Head>
        <title>
          {post.title} | {config.siteTitle}
        </title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords} />
        <meta property="og:title" content={`${post.title} | ${config.siteTitle}`} />
        <meta property="og:description" content={post.description} />
        {/* 以下変更不要 */}
        {isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
        <link rel="canonical" href={fullPath} />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        <meta property="og:url" content={fullPath} />
      </Head>
      <Body config={config} pageType={pageType} fullPath={fullPath}>
        <article>
          <h1>{post.title}</h1>
          <Date publishedAt={post.publishedAt} />
          <div>
            {post.categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <a>{category.title}</a>
              </Link>
            ))}
          </div>
          <div>
            {post.tags.map((tag) => (
              <Link key={tag.id} href={`/tags/${tag.slug}`}>
                <a>{tag.title}</a>
              </Link>
            ))}
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </article>
      </Body>
    </>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostPaths()

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const config = await getConfig()
  const post = await getPost(slug)

  return {
    props: {
      config,
      post,
    },
  }
}
