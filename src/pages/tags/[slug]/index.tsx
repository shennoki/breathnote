import Date from 'components/date'
import Pagination from 'components/pagination'
import Body from 'layout/body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { PER_PAGE } from 'scripts/const'
import { getAllTagPaths, getConfig, getTag, getTagPosts } from 'scripts/getter'
import { ConfigType, PageOptionType, PostType, TagType } from 'types'

type Props = {
  config: ConfigType
  option: PageOptionType
  posts: PostType[]
  allPostCount: number
  tag: TagType
}

const Tag: NextPage<Props> = ({ config, option, posts, allPostCount, tag }) => {
  return (
    <>
      <Head>
        <title>
          {tag.title} | {config.siteTitle}
        </title>
        {Math.ceil(allPostCount / PER_PAGE) !== 1 ? (
          <link rel="next" href={`${config.siteDomain}/tags/${tag.slug}/page/2`}></link>
        ) : null}
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
        <Pagination allPostCount={allPostCount} pageType={option.pageType} slug={tag.slug} />
      </Body>
    </>
  )
}

export default Tag

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const config = await getConfig()
  const tag = await getTag(slug)
  const tagPosts = await getTagPosts(slug, 'desc')
  const posts = tagPosts.slice(0, PER_PAGE)
  const allPostCount = tagPosts.length
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
      posts,
      allPostCount,
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
