import Date from 'components/date'
import Body from 'layout/body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { getAllTagPaths, getConfig, getTag, getTagPosts } from 'scripts/getter'
import { sortByDesc } from 'scripts/sort'
import { ConfigType, PostType, TagType } from 'types'

type Props = {
  config: ConfigType
  tag: TagType
  posts: PostType[]
}

const Tag: NextPage<Props> = ({ config, tag, posts }) => {
  const pageType = 'tag'
  const fullPath = `${config.siteDomain}/tags/${tag.slug}`
  const isNoIndex = true

  return (
    <>
      <Head>
        <title>
          {tag.title} | {config.siteTitle}
        </title>
        <meta name="description" content={tag.description} />
        <meta name="keywords" content={config.siteKeywords} />
        <meta property="og:title" content={`${tag.title} | ${config.siteTitle}`} />
        <meta property="og:description" content={tag.description} />
        {/* 以下変更不要 */}
        {isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
        <link rel="canonical" href={fullPath} />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        <meta property="og:url" content={fullPath} />
      </Head>
      <Body config={config} pageType={pageType} fullPath={fullPath}>
        <h1>{tag.title}の記事一覧</h1>
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
      </Body>
    </>
  )
}

export default Tag

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllTagPaths()

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const config = await getConfig()
  const tag = await getTag(slug)
  const tagPosts = await getTagPosts(slug)
  const posts = sortByDesc(tagPosts)

  return {
    props: {
      config,
      tag,
      posts,
    },
  }
}
