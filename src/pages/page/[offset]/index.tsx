import Pagination from 'components/Pagination'
import Body from 'layout/Body'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { PER_PAGE } from 'scripts/const'
import { getAllPosts, getConfig } from 'scripts/getter'
import { ConfigType, PageOptionType, PostType } from 'types'

type Props = {
  config: ConfigType
  option: PageOptionType
  posts: PostType[]
  allPostCount: number
  offset: number
}

const Home: NextPage<Props> = ({ config, option, posts, allPostCount, offset }) => {
  return (
    <>
      <Head>
        <title>
          {config.siteTitle} | {config.siteSubTitle}
        </title>
        <link
          rel="prev"
          href={offset === 2 ? `${config.siteDomain}` : `${config.siteDomain}/page/${offset - 1}`}
        ></link>
        {offset !== Math.ceil(allPostCount / PER_PAGE) ? (
          <link rel="next" href={`${config.siteDomain}/page/${offset + 1}`}></link>
        ) : null}
        <meta name="description" content={config.siteDescription} />
        <meta name="keywords" content={config.siteKeywords} />
        <meta property="og:title" content={`${config.siteTitle} | ${config.siteSubTitle}`} />
        <meta property="og:description" content={config.siteDescription} />
        {/* 以下変更不要 */}
        {option.isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
        <link rel="canonical" href={option.fullPath} />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        <meta property="og:url" content={option.fullPath} />
      </Head>
      <Body pageType={option.pageType} fullPath={option.fullPath}>
        <section>
          {posts.map((post) => (
            <article key={post.id}>
              <Link href={`/posts/${post.slug}`}>
                <a>
                  <h2>{post.title}</h2>
                </a>
              </Link>
              {post.categories.map((category) => (
                <Link key={category.id} href={`/categories/${category.slug}`}>
                  <a>{category.title}</a>
                </Link>
              ))}
            </article>
          ))}
        </section>
        <Pagination pageType={option.pageType} allPostCount={allPostCount} offset={offset} />
      </Body>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const offset = Number(params?.offset)
  const config = await getConfig()
  const allPosts = await getAllPosts('desc')
  const posts = allPosts.slice(PER_PAGE * offset - PER_PAGE, PER_PAGE * offset)
  const allPostCount = allPosts.length
  const option = {
    pageType: 'home',
    fullPath: `${config.siteDomain}/page/${offset}`,
    isNoIndex: false,
  }

  return {
    props: {
      config,
      option,
      posts,
      allPostCount,
      offset,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPostCount = (await getAllPosts('desc')).length
  let paths: { params: { offset: string } }[] = []
  for (let i = 0; i < Math.floor(allPostCount / PER_PAGE); i++) {
    paths = [...paths, { params: { offset: String(i + 2) } }]
  }

  return {
    paths,
    fallback: 'blocking',
  }
}
