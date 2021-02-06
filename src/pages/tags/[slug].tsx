import Date from 'components/date'
import Body from 'components/layout/body'
import { getAllTagPaths, getConfig, getTag, getTagPosts } from 'lib/getter'
import { ConfigType, PostType, TagType } from 'lib/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
  config: ConfigType
  tag: TagType
  tagPosts: PostType[]
}

const Tag: FC<Props> = ({ config, tag, tagPosts }) => {
  const pageType = 'tag'

  return (
    <Body config={config} pageType={pageType} tag={tag}>
      <h1>{tag.title}の記事一覧</h1>
      {tagPosts.map(({ id, publishedAt, slug, title, categories }) => (
        <article key={id}>
          <Link href={`/posts/${slug}`}>
            <h2>
              <a>{title}</a>
            </h2>
          </Link>
          <Date publishedAt={publishedAt} />
          {categories.map((tag) => (
            <Link key={tag.id} href={`/categories/${tag.slug}`}>
              <a>{tag.title}</a>
            </Link>
          ))}
        </article>
      ))}
    </Body>
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
  const posts = await getTagPosts(slug)
  const tagPosts = posts

  return {
    props: {
      config,
      tag,
      tagPosts,
    },
  }
}
