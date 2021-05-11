import axios from 'axios'
import CustomImage from 'components/atoms/CustomImage'
import CustomLink from 'components/atoms/CustomLink'
import Article from 'components/organisms/Article'
import { fetchAllKeywords, fetchAllPosts } from 'libs/store'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { PageProps } from 'types/pageProps'
import { Post } from 'types/post'
import { API_ENDPOINT, API_KEY, SITE_DOMAIN, SITE_TITLE } from 'utils/env'
/* eslint-disable @typescript-eslint/no-var-requires */
const remarkMath = require('remark-math')
const rehypePrism = require('@mapbox/rehype-prism')
const rehypeKatex = require('rehype-katex')
/* eslint-enable @typescript-eslint/no-var-requires */

type Props = {
  post: Post
}

// next-mdx-remoteで変換するコンポーネント
const components = {
  a: CustomLink,
  img: CustomImage,
}

const Posts: NextPage<Props> = ({ post }) => {
  const [media, setMedia] = useState('print')

  useEffect(() => {
    setMedia('all')
  }, [])

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
          integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
          crossOrigin="anonymous"
          media={media}
        />
      </Head>
      <Article post={post} body={<MDXRemote {...post.body} components={components} />} />
    </>
  )
}

export default Posts

export const getStaticProps: GetStaticProps = async (context) => {
  const keywords = (await fetchAllKeywords()).contents
  const slug = context.params?.slug as string
  const KEY = { headers: { 'X-API-KEY': API_KEY } }
  const previewData = context.previewData as Record<string, unknown>
  let post

  if (context.preview) {
    // 下書きデータから下書き記事を取得
    post = await axios
      .get(`${API_ENDPOINT}/posts/${previewData.draftId}?draftKey=${previewData.draftKey}`, KEY)
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
    body: await serialize(post.body, {
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypePrism, rehypeKatex],
      },
    }),
  }

  const pageProps: PageProps = {
    url: `${SITE_DOMAIN}/posts/${post.slug}`,
    type: 'post',
    title: `${post.title} - ${SITE_TITLE}`,
    description: post.description,
    thumbnail: post.thumbnail ? post.thumbnail.url : null,
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
