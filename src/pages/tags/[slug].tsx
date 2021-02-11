import Date from 'components/date'
import Body from 'layout/body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { getAllTagPaths, getConfig, getTag, getTagPosts } from 'scripts/getter'
import { sortByDesc } from 'scripts/sort'
import { ConfigType, PageOptionType, PostType, TagType } from 'types'

type Props = {
  config: ConfigType
  option: PageOptionType
  sortedPosts: PostType[]
  tag: TagType
}

const Tag: NextPage<Props> = ({ config, option, sortedPosts, tag }) => {
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
        {option.isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
        <link rel="canonical" href={option.fullPath} />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        <meta property="og:url" content={option.fullPath} />
      </Head>
      <Body pageType={option.pageType} fullPath={option.fullPath}>
        <h1>{tag.title}の記事一覧</h1>
        {sortedPosts.map((post) => (
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
      </Body>
    </>
  )
}

export default Tag

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const config = await getConfig()
  const posts = await getTagPosts(slug)
  const sortedPosts = sortByDesc(posts)
  const tag = await getTag(slug)
  const option = {
    pageType: 'tag',
    fullPath: `${config.siteDomain}/tags/${tag.slug}`,
    isNoIndex: true,
  }

  if (!tag) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      config,
      option,
      sortedPosts,
      tag,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllTagPaths()

  return {
    paths,
    fallback: 'blocking',
  }
}
