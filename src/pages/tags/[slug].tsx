import Date from 'components/date'
import Body from 'layout/body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ErrorPage from 'pages/404'
import React from 'react'
import { getAllTagPaths, getConfig, getTag, getTagPosts } from 'scripts/getter'
import { sortByDesc } from 'scripts/sort'
import { ConfigType, PageOptionType, PostType, TagType } from 'types'

type Props = {
  config: ConfigType
  option: PageOptionType
  posts: PostType[]
  tag: TagType
}

const Tag: NextPage<Props> = ({ config, option, posts, tag }) => {
  const router = useRouter()

  if (!router.isFallback && !tag.id) return <ErrorPage statusCode={404} />

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
      <Body config={config} pageType={option.pageType} fullPath={option.fullPath}>
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
      </Body>
    </>
  )
}

export default Tag

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllTagPaths()

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const tag = await getTag(slug)
  const config = await getConfig()
  const tagPosts = await getTagPosts(slug)
  const posts = sortByDesc(tagPosts)
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
      tag,
    },
    revalidate: 60,
  }
}
