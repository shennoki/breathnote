import rehypePrism from '@mapbox/rehype-prism'
import axios from 'axios'
import CustomImage from 'components/atoms/CustomImage'
import CustomLink from 'components/atoms/CustomLink'
import Article from 'components/organisms/Article'
import { fetchAllKeywords, fetchAllPosts } from 'libs/store'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { PageProps } from 'types/pageProps'
import { Post } from 'types/post'
import { API_ENDPOINT, API_KEY, REVALIDATE_TIME, SITE_DOMAIN, SITE_TITLE } from 'utils/env'

type Props = {
  post: Post
}

// next-mdx-remoteで変換するコンポーネント
const components = {
  a: CustomLink,
  img: CustomImage,
}

const Posts: NextPage<Props> = ({ post }) => {
  return <Article post={post} body={<MDXRemote {...post.body} components={components} />} />
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
        remarkPlugins: [remarkMath, remarkGfm],
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
    revalidate: REVALIDATE_TIME,
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
