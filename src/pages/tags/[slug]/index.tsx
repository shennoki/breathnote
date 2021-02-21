import BlogCard from 'components/BlogCard'
import Pagination from 'components/Pagination'
import Body from 'layout/Body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
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
        <title>{`${tag.title} | ${config.siteTitle}`}</title>
        {Math.ceil(allPostCount / PER_PAGE) !== 1 ? <link rel="next" href={`${option.fullPath}/page/2`} /> : null}
        <meta name="description" content={tag.description} />
        <meta property="og:title" content={`${tag.title} | ${config.siteTitle}`} />
        <meta property="og:description" content={tag.description} />
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
            <span className="text-2xl md:text-4xl text-accent dark:text-yellow-300 tracking-wider transition-my-colors">
              {tag.title}
            </span>
            の記事
          </h1>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </section>
        <Pagination allPostCount={allPostCount} pageType={option.pageType} offset={1} slug={tag.slug} />
      </Body>
    </>
  )
}

export default Tag

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const config = await getConfig()
  const tag = await getTag(slug)

  if (!tag) {
    return {
      notFound: true,
    }
  }

  const tagPosts = await getTagPosts(slug, 'desc')
  const posts = tagPosts.slice(0, PER_PAGE)
  const allPostCount = tagPosts.length
  const option = {
    pageType: 'tag',
    fullPath: `${config.siteDomain}/tags/${tag.slug}`,
    isNoIndex: true,
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
