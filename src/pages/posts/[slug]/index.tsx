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
import React, { useEffect, useState } from 'react'
import { getCorrectDate } from 'scripts/date'
import { getAllPostPaths, getConfig, getPost } from 'scripts/getter'
import { ConfigType, PageOptionType, PostType } from 'types'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rehypePrism = require('@mapbox/rehype-prism')

type Props = {
  config: ConfigType
  option: PageOptionType
  post: PostType
}

const components = {
  a: CustomLink,
  image: CustomImage,
}

const Post: NextPage<Props> = ({ config, option, post }) => {
  const body = hydrate(post.body, { components })
  const [media, setMedia] = useState('print')

  useEffect(() => {
    setMedia('all')
  }, [])

  return (
    <>
      <Head>
        <title>{`${post.title} | ${config.siteTitle}`}</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={`${post.title} | ${config.siteTitle}`} />
        <meta property="og:description" content={post.description} />
        {post.thumbnail ? (
          <meta property="og:image" content={post.thumbnail.url} />
        ) : (
          <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        )}
        {/* 以下変更不要 */}
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:url" content={option.fullPath} />
        <link rel="canonical" href={option.fullPath} />
        {option.isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism-tomorrow.min.css"
          media={media}
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.23.0/themes/prism-tomorrow.min.css"
          />
        </noscript>
      </Head>
      <Body pageType={option.pageType} fullPath={option.fullPath}>
        <article className="px-3 sm:px-5 md:px-7 lg:px-16 pt-5 sm:pt-6 md:pt-7 lg:pt-14 pb-8 sm:pb-9 md:pb-12 lg:pb-20 mb-5 md:mb-7 lg:mb-8 xl:mb-9 rounded-lg border-light dark:border-dark shadow-neumo dark:shadow-neumo-dark">
          <h1 className="max-w-4xl mx-auto mb-4 md:mb-6 lg:mb-10 text-lg sm:text-2xl lg:text-3xl font-bold break-words table">
            <span className="text-xl sm:text-3xl lg:text-4xl text-accent dark:text-yellow-300">
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
                  priority={true}
                />
              </div>
            </>
          ) : null}
          <div className="my-4 md:my-6 flex justify-center items-center">
            <div className="my-2 md:my-0 flex flex-wrap justify-center items-center">
              <Svg type="publish" strokeWidth={1.5} class="w-5 h-5 sm:w-6 sm:h-6" />
              <time dateTime={post.publishedAt} itemProp="datepublished" className="ml-2 text-xs sm:text-sm block">
                {getCorrectDate(post.publishedAt, 'yyyy年MM月dd日')}
              </time>
            </div>
            <div className="my-2 md:my-0 flex flex-wrap justify-center items-center">
              <Svg type="update" strokeWidth={1.5} class="w-5 h-5 sm:w-6 sm:h-6 ml-4 sm:ml-14" />
              <time dateTime={post.revisedAt} itemProp="modified" className="ml-2 text-xs sm:text-sm block">
                {getCorrectDate(post.revisedAt, 'yyyy年MM月dd日')}
              </time>
            </div>
          </div>
          <div className="mx-auto table">
            <ul className="text-xs sm:text-sm flex flex-wrap justify-center">
              {post.keywords.map((keyword) => (
                <li
                  key={keyword.id}
                  className={`mx-3 md:mx-7 mb-3 md:mb-0 text-accent dark:text-yellow-300 rounded-sm sm:rounded border-light hover:border-accent dark:border-dark dark:hover:border-yellow-300 shadow-inset hover:shadow-none dark:shadow-inset-dark dark:hover:shadow-none`}
                >
                  <Link href={`/keywords/${keyword.slug}`}>
                    <a className="px-2.5 sm:px-4 py-1 sm:py-1.5 block">{keyword.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4 md:mt-8 lg:mt-14 prose prose-sm lg:prose max-w-none lg:max-w-none dark:prose-dark">
            {body}
          </div>
        </article>
      </Body>
    </>
  )
}

export default Post

export const getStaticProps: GetStaticProps = async (context) => {
  const config = await getConfig()
  let post

  if (!context.preview) {
    /* 公開済みの記事 (getStaticPaths 経由) */
    const publishPost = await getPost(context.params?.slug as string)
    if (!publishPost) {
      return {
        notFound: true,
      }
    }
    post = {
      ...publishPost,
      body: await renderToString(publishPost.body, {
        components,
        mdxOptions: {
          rehypePlugins: [rehypePrism],
        },
      }),
    }
  } else if (context.preview) {
    /* プレビュー記事 (setPreviewData 経由) */
    const previewPost = await fetch(
      `${process.env.API_ENDPOINT}/posts/${context.previewData.draftId}?draftKey=${context.previewData.draftKey}`,
      { headers: { 'X-API-KEY': process.env.API_KEY as string } }
    ).then((res) => res.json())
    post = {
      ...previewPost,
      body: await renderToString(previewPost.body, {
        components,
        mdxOptions: {
          rehypePlugins: [rehypePrism],
        },
      }),
    }
  }

  const option = {
    pageType: 'post',
    fullPath: `${config.siteDomain}/posts/${post.slug}`,
    isNoIndex: false,
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
