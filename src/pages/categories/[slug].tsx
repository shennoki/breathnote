import Date from 'components/date'
import Body from 'layout/body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { getAllCategoryPaths, getCategory, getCategoryPosts, getConfig } from 'scripts/getter'
import { sortByDesc } from 'scripts/sort'
import { CategoryType, ConfigType, PostType } from 'types'

type Props = {
  config: ConfigType
  category: CategoryType
  posts: PostType[]
}

const Category: NextPage<Props> = ({ config, category, posts }) => {
  const pageType = 'category'
  const fullPath = `${config.siteDomain}/categories/${category.slug}`
  const isNoIndex = true

  return (
    <>
      <Head>
        <title>
          {category.title} | {config.siteTitle}
        </title>
        <meta name="description" content={category.description} />
        <meta name="keywords" content={config.siteKeywords} />
        <meta property="og:title" content={`${category.title} | ${config.siteTitle}`} />
        <meta property="og:description" content={category.description} />
        {/* 以下変更不要 */}
        {isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
        <link rel="canonical" href={fullPath} />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        <meta property="og:url" content={fullPath} />
      </Head>
      <Body config={config} pageType={pageType} fullPath={fullPath}>
        <h1>{category.title}の記事一覧</h1>
        {posts.map((post) => (
          <article key={post.id}>
            <Link href={`/posts/${post.slug}`}>
              <h2>
                <a>{post.title}</a>
              </h2>
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

export default Category

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllCategoryPaths()

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const config = await getConfig()
  const category = await getCategory(slug)
  const categoryPosts = await getCategoryPosts(slug)
  const posts = sortByDesc(categoryPosts)

  return {
    props: {
      config,
      category,
      posts,
    },
  }
}
