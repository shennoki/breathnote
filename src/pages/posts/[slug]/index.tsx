import Date from 'components/Date'
import Body from 'layout/Body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getAllPostPaths, getConfig, getPost } from 'scripts/getter'
import { ConfigType, PageOptionType, PostType } from 'types'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rehypePrism = require('@mapbox/rehype-prism')

type Props = {
  config: ConfigType
  option: PageOptionType
  post: PostType
}

const components = { Image }

const Post: NextPage<Props> = ({ config, option, post }) => {
  const body = hydrate(post.body, { components })

  return (
    <>
      <Head>
        <title>
          {post.title} | {config.siteTitle}
        </title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords} />
        <meta property="og:title" content={`${post.title} | ${config.siteTitle}`} />
        <meta property="og:description" content={post.description} />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism-tomorrow.min.css"
          rel="stylesheet"
        />
        {/* 以下変更不要 */}
        {option.isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
        <link rel="canonical" href={option.fullPath} />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        <meta property="og:url" content={option.fullPath} />
      </Head>
      <Body pageType={option.pageType} fullPath={option.fullPath}>
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
          {body}
        </article>
      </Body>
    </>
  )
}

export default Post

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const config = await getConfig()
  const mdxPost = await getPost(slug)
  const post = {
    ...mdxPost,
    body: await renderToString(mdxPost.body, {
      components,
      mdxOptions: {
        rehypePlugins: [rehypePrism],
      },
    }),
  }
  const option = {
    pageType: 'post',
    fullPath: `${config.siteDomain}/posts/${post.slug}`,
    isNoIndex: false,
  }

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      config,
      option,
      post,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostPaths()

  return {
    paths,
    fallback: 'blocking',
  }
}
