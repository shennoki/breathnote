import Pagination from 'components/Pagination'
import Body from 'layout/Body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { PER_PAGE } from 'scripts/const'
import { getAllCategories, getCategory, getCategoryPosts, getConfig } from 'scripts/getter'
import { CategoryType, ConfigType, PageOptionType, PostType } from 'types'

type Props = {
  config: ConfigType
  option: PageOptionType
  posts: PostType[]
  allPostCount: number
  offset: number
  category: CategoryType
}

const Category: NextPage<Props> = ({ config, option, posts, allPostCount, offset, category }) => {
  return (
    <>
      <Head>
        <title>
          {category.title} | {config.siteTitle}
        </title>
        <link
          rel="prev"
          href={
            offset === 2
              ? `${config.siteDomain}/categories/${category.slug}`
              : `${config.siteDomain}/categories/${category.slug}/page/${offset - 1}`
          }
        ></link>
        {offset !== Math.ceil(allPostCount / PER_PAGE) ? (
          <link rel="next" href={`${config.siteDomain}/categories/${category.slug}/page/${offset + 1}`}></link>
        ) : null}
        <meta name="description" content={category.description} />
        <meta name="keywords" content={config.siteKeywords} />
        <meta property="og:title" content={`${category.title} | ${config.siteTitle}`} />
        <meta property="og:description" content={category.description} />
        {/* 以下変更不要 */}
        {option.isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
        <link rel="canonical" href={option.fullPath} />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        <meta property="og:url" content={option.fullPath} />
      </Head>
      <Body pageType={option.pageType} fullPath={option.fullPath}>
        <h1>{category.title}の記事一覧</h1>
        {posts.map((post) => (
          <article key={post.id}>
            <Link href={`/posts/${post.slug}`}>
              <a>
                <h2>{post.title}</h2>
              </a>
            </Link>
            {post.categories.map((category) => (
              <Link key={category.id} href={`/categories/${category.slug}`}>
                <a>{category.title}</a>
              </Link>
            ))}
          </article>
        ))}
        <Pagination allPostCount={allPostCount} pageType={option.pageType} offset={offset} slug={category.slug} />
      </Body>
    </>
  )
}

export default Category

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const offset = Number(params?.offset)
  const config = await getConfig()
  const category = await getCategory(slug)
  const categoryPosts = await getCategoryPosts(slug, 'desc')
  const posts = categoryPosts.slice(PER_PAGE * offset - PER_PAGE, PER_PAGE * offset)
  const allPostCount = categoryPosts.length
  const option = {
    pageType: 'category',
    fullPath: `${config.siteDomain}/categories/${category.slug}/page/${offset}`,
    isNoIndex: true,
  }

  if (!category) {
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
      offset,
      category,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = (await getAllCategories()).map((category) => {
    return category.slug
  })
  const offsets = slugs.map(async (slug) => {
    const length = (await getCategoryPosts(slug, 'desc')).length
    return Math.floor(length / PER_PAGE)
  })
  let paths: {
    params: {
      slug: string
      offset: string
    }
  }[] = []

  for (let i = 0; i < slugs.length; i++) {
    paths = [
      ...paths,
      {
        params: {
          slug: slugs[i],
          offset: String(offsets[i]),
        },
      },
    ]
  }

  return {
    paths,
    fallback: 'blocking',
  }
}
