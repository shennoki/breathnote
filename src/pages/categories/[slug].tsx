import Date from 'components/date'
import Body from 'components/layout/body'
import { getAllCategoryPaths, getCategory, getCategoryPosts, getConfig } from 'lib/getter'
import { CategoryType, ConfigType, PostType } from 'lib/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
  config: ConfigType
  category: CategoryType
  categoryPosts: PostType[]
}

const Category: FC<Props> = ({ config, category, categoryPosts }) => {
  const pageType = 'category'

  return (
    <Body config={config} pageType={pageType} category={category}>
      <h1>{category.title}の記事一覧</h1>
      {categoryPosts.map(({ id, publishedAt, slug, title, categories }) => (
        <article key={id}>
          <Link href={`/posts/${slug}`}>
            <h2>
              <a>{title}</a>
            </h2>
          </Link>
          <Date publishedAt={publishedAt} />
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <a>{category.title}</a>
            </Link>
          ))}
        </article>
      ))}
    </Body>
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
  const posts = await getCategoryPosts(slug)
  const categoryPosts = posts

  return {
    props: {
      config,
      category,
      categoryPosts,
    },
  }
}
