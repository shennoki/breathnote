import Date from 'components/date'
import Body from 'components/layout/body'
import { getAllPostPaths, getConfig, getPost } from 'lib/cms'
import { ConfigType, PostType } from 'lib/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import React, { FC } from 'react'

type Props = {
  config: ConfigType
  fullPathPost: PostType
}

const Post: FC<Props> = ({ config, fullPathPost }) => {
  const pageType = 'post'

  return (
    <Body pageType={pageType} config={config} post={fullPathPost}>
      <article>
        <h1>{fullPathPost.title}</h1>
        <Date publishedAt={fullPathPost.publishedAt} />
        <div>
          {fullPathPost.categories.map(({ id, name }) => (
            <span key={id}>{name}</span>
          ))}
        </div>
        <div>
          {fullPathPost.tags.map(({ id, name }) => (
            <span key={id}>{name}</span>
          ))}
        </div>
        <div dangerouslySetInnerHTML={{ __html: fullPathPost.body }} />
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
  const config = await getConfig()
  const post = await getPost(params?.id as string)
  /* id (slug) に親ディレクトリのパスを追加する */
  const fullPathPost = { ...post, id: `post/${post.id}` }

  return {
    props: {
      config,
      fullPathPost,
    },
  }
}
