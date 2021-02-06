import Date from 'components/date'
import Body from 'components/layout/body'
import { getAllPostPaths, getConfig, getPost } from 'lib/getter'
import { ConfigType, PostType } from 'lib/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import React, { FC } from 'react'

type Props = {
  config: ConfigType
  post: PostType
}

const Post: FC<Props> = ({ config, post }) => {
  const pageType = 'post'

  return (
    <Body config={config} pageType={pageType} post={post}>
      <article>
        <h1>{post.title}</h1>
        <Date publishedAt={post.publishedAt} />
        <div>
          {post.categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <a>{category.title}</a>
            </Link>
          ))}
        </div>
        <div>
          {post.tags.map((tag) => (
            <Link key={tag.id} href={`/tags/${tag.slug}`}>
              <a>{tag.title}</a>
            </Link>
          ))}
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
      </article>
    </Body>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostPaths()

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const config = await getConfig()
  const post = await getPost(slug)

  return {
    props: {
      config,
      post,
    },
  }
}
