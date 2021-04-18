import axios from 'axios'
import CustomImage from 'components/atoms/CustomImage'
import CustomLink from 'components/atoms/CustomLink'
import Article from 'components/organisms/Article'
import { fetchAllKeywords, fetchAllPosts } from 'libs/store'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import React from 'react'
import { PageProps } from 'types/pageProps'
import { Post } from 'types/post'
import { API_ENDPOINT, API_KEY, SITE_DOMAIN, SITE_TITLE } from 'utils/env'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rehypePrism = require('@mapbox/rehype-prism')

type Props = {
  post: Post
}

// next-mdx-remoteで変換するコンポーネント
const components = {
  a: CustomLink,
  img: CustomImage,
}

const Posts: NextPage<Props> = ({ post }) => {
  // クライアントでも変換が必要 (next-mdx-remote)
  const body = hydrate(post.body, { components })

  return <Article post={post} body={body} />
}

export default Posts

export const getStaticProps: GetStaticProps = async (context) => {
  const keywords = (await fetchAllKeywords()).contents
  const slug = context.params?.slug as string
  const KEY = { headers: { 'X-API-KEY': API_KEY } }
  let post

  if (context.preview) {
    // 下書きデータから下書き記事を取得
    post = await axios
      .get(`${API_ENDPOINT}/posts/${context.previewData.draftId}?draftKey=${context.previewData.draftKey}`, KEY)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(`FETCH FAILED (/page/post/[slug].tsx - Draft) : ${err}`)
      })
  } else {
    // 記事のスラッグから公開済みの記事を取得
    post = (await fetchAllPosts()).contents.find((post) => post.slug === slug)
    if (!post) return { notFound: true }
  }

  // next-mdx-remoteでマークダウンをJSXに変換
  post = {
    ...post,
    body: await renderToString(post.body, {
      components,
      mdxOptions: {
        rehypePlugins: [rehypePrism], // シンタックスハイライト
      },
    }),
  }

  const pageProps: PageProps = {
    url: `${SITE_DOMAIN}/posts/${post.slug}`,
    type: 'post',
    title: `${post.title} - ${SITE_TITLE}`,
    description: post.description,
    thumbnail: post.thumbnail.url,
    keywords: keywords,
  }

  return {
    props: {
      pageProps,
      post,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // 記事のスラッグをURLパスとして返却用のオブジェクトを作成
  const paths = (await fetchAllPosts()).contents.map((post) => {
    return { params: { slug: post.slug } }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}
