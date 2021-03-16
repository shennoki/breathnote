import CustomImage from 'components/CustomImage'
import CustomLink from 'components/CustomLink'
import Svg from 'components/Svg'
import Body from 'layout/Body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import hydrate from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getCorrectDate } from 'scripts/date'
import { getAllPostPaths, getPost } from 'scripts/getter'
import { PageOptionType, PostType } from 'types'
import { API_ENDPOINT, API_KEY, SITE_DOMAIN, SITE_TITLE } from 'utils/env'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rehypePrism = require('@mapbox/rehype-prism')

type Props = {
  post: PostType
  option: PageOptionType
}

const components = {
  a: CustomLink,
  img: CustomImage,
}

const Post: NextPage<Props> = ({ post, option }) => {
  const body = hydrate(post.body, { components })

  return (
    <>
      <Head>
        <link rel="canonical" href={option.fullPath} />
        <title>{`${post.title} | ${SITE_TITLE}`}</title>
        <meta name="description" content={post.description} />
        <meta property="og:url" content={option.fullPath} />
        <meta property="og:title" content={`${post.title} | ${SITE_TITLE}`} />
        <meta property="og:description" content={post.description} />
        {post.thumbnail ? (
          <meta property="og:image" content={post.thumbnail.url} />
        ) : (
          <meta property="og:image" content={`${SITE_DOMAIN}/img/og-image.jpg`} />
        )}
      </Head>
      <Body pageType={option.pageType} fullPath={option.fullPath}>
        <article className="px-1 md:px-7 lg:px-14 sm:py-2 md:py-8 lg:py-10 rounded-lg">
          <h1 className="max-w-4xl mx-auto mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-lg sm:text-xl md:text-2xl my-leading-normal break-all table">
            <span className="text-xl sm:text-2xl md:text-3xl text-accent-light dark:text-accent-dark align-bottom tracking-wider">
              {post.title.substr(0, 1)}
            </span>
            {post.title.substr(1)}
          </h1>
          {post.thumbnail ? (
            <>
              <div className="image-wrapper">
                <Image
                  src={post.thumbnail.url}
                  alt={post.title}
                  width={post.thumbnail.width}
                  height={post.thumbnail.height}
                />
              </div>
            </>
          ) : null}
          <div className="my-4 md:my-6 flex justify-center items-center">
            <div className="flex justify-center items-center">
              <Svg type="publish" strokeWidth={1.5} class="w-5 h-5 sm:w-6 sm:h-6" />
              <time dateTime={post.publishedAt} itemProp="datepublished" className="ml-2 text-xs sm:text-sm block">
                {getCorrectDate(post.publishedAt, 'yyyy年MM月dd日')}
              </time>
            </div>
            <div className="ml-4 sm:ml-14 flex justify-center items-center">
              <Svg type="update" strokeWidth={1.5} class="w-5 h-5 sm:w-6 sm:h-6" />
              <time dateTime={post.revisedAt} itemProp="modified" className="ml-2 text-xs sm:text-sm block">
                {getCorrectDate(post.revisedAt, 'yyyy年MM月dd日')}
              </time>
            </div>
          </div>
          <ul className="text-xs sm:text-sm flex flex-wrap justify-center">
            {post.keywords.map((keyword) => (
              <li
                key={keyword.id}
                className={`mx-3 md:mx-7 mb-3 md:mb-6 text-accent-light dark:text-accent-dark rounded border border-clearness hover:border-accent-light dark:border-shadow-dark dark:hover:border-accent-dark shadow-inset-light hover:shadow-none dark:shadow-inset-dark`}
              >
                <Link href={`/keywords/${keyword.slug}`}>
                  <a className="px-2.5 sm:px-4 py-1 sm:py-1.5 block">{keyword.name}</a>
                </Link>
              </li>
            ))}
          </ul>
          <div className="max-w-none lg:max-w-none my-5 prose prose-sm lg:prose dark:prose-dark">{body}</div>
        </article>
      </Body>
    </>
  )
}

export default Post

export const getStaticProps: GetStaticProps = async (context) => {
  let post

  if (context.preview) {
    post = await fetch(
      `${API_ENDPOINT}/posts/${context.previewData.draftId}?draftKey=${context.previewData.draftKey}`,
      { headers: { 'X-API-KEY': API_KEY } }
    ).then((res) => res.json())
  } else {
    post = await getPost(context.params?.slug as string)
    if (!post) return { notFound: true }
  }

  post = {
    ...post,
    body: await renderToString(post.body, {
      components,
      mdxOptions: {
        rehypePlugins: [rehypePrism],
      },
    }),
  }

  const option = {
    pageType: 'post',
    fullPath: `${SITE_DOMAIN}/posts/${post.slug}`,
  }

  return {
    props: {
      post,
      option,
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
