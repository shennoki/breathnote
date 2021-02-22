import BlogCard from 'components/BlogCard'
import Pagination from 'components/Pagination'
import Body from 'layout/Body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { PER_PAGE } from 'scripts/const'
import { getAllCategoryPaths, getCategory, getCategoryPosts, getConfig } from 'scripts/getter'
import { CategoryType, ConfigType, PageOptionType, PostType } from 'types'

type Props = {
  config: ConfigType
  option: PageOptionType
  posts: PostType[]
  allPostCount: number
  category: CategoryType
}

const Category: NextPage<Props> = ({ config, option, posts, allPostCount, category }) => {
  return (
    <>
      <Head>
        <title>{`${category.title} | ${config.siteTitle}`}</title>
        {Math.ceil(allPostCount / PER_PAGE) !== 1 ? <link rel="next" href={`${option.fullPath}/page/2`} /> : null}
        <meta name="description" content={category.description} />
        <meta property="og:title" content={`${category.title} | ${config.siteTitle}`} />
        <meta property="og:description" content={category.description} />
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
            <span className="text-2xl md:text-4xl text-accent dark:text-yellow-300 tracking-wider">
              {category.title}
            </span>
            の記事
          </h1>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </section>
        <Pagination allPostCount={allPostCount} pageType={option.pageType} offset={1} slug={category.slug} />
      </Body>
    </>
  )
}

export default Category

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const config = await getConfig()
  const category = await getCategory(slug)

  if (!category) {
    return {
      notFound: true,
    }
  }

  const categoryPosts = await getCategoryPosts(slug, 'desc')
  const posts = categoryPosts.slice(0, PER_PAGE)
  const allPostCount = categoryPosts.length
  const option = {
    pageType: 'category',
    fullPath: `${config.siteDomain}/categories/${category.slug}`,
    isNoIndex: true,
  }

  return {
    props: {
      config,
      option,
      posts,
      allPostCount,
      category,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllCategoryPaths()

  return {
    paths,
    fallback: 'blocking',
  }
}
