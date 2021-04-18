import Archives from 'components/molecules/Archives'
import BlogCard from 'components/molecules/BlogCard'
import Pagination from 'components/molecules/Pagination'
import { ALL_KEYWORDS, ALL_POSTS } from 'libs/store'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { PageProps } from 'types/pageProps'
import { Post } from 'types/post'
import { ARTICLE_PER_PAGE, SITE_DESCRIPTION, SITE_DOMAIN, SITE_SUBTITLE, SITE_TITLE } from 'utils/env'

type Props = {
  pageProps: PageProps
  posts: Post[]
  postLength: number
  offset: number
}

const Home: NextPage<Props> = ({ pageProps, posts, postLength, offset }) => {
  return (
    <>
      <Head>
        <link rel="prev" href={offset === 2 ? `${SITE_DOMAIN}/` : `${SITE_DOMAIN}/page/${offset - 1}`} />
        {offset !== Math.ceil(postLength / ARTICLE_PER_PAGE) && (
          <link rel="next" href={`${SITE_DOMAIN}/page/${offset + 1}`} />
        )}
      </Head>
      <Archives>
        <>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </>
      </Archives>
      <Pagination postLength={postLength} type={pageProps.type} offset={offset} />
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const offset = Number(params?.offset)
  const posts = (await ALL_POSTS).contents.slice(
    ARTICLE_PER_PAGE * offset - ARTICLE_PER_PAGE,
    ARTICLE_PER_PAGE * offset
  )
  const postLength = (await ALL_POSTS).totalCount

  const pageProps: PageProps = {
    url: `${SITE_DOMAIN}/page/${offset}`,
    type: 'home',
    title: `${SITE_TITLE} (${offset}) - ${SITE_SUBTITLE}`,
    description: SITE_DESCRIPTION,
    keywords: (await ALL_KEYWORDS).contents,
  }

  if (!posts.length) return { notFound: true }

  return {
    props: {
      pageProps,
      posts,
      postLength,
      offset,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postLength = (await ALL_POSTS).totalCount
  let paths: { params: { offset: string } }[] = []

  // ページ数に応じてパスを生成
  for (let i = 0; i < Math.floor(postLength / ARTICLE_PER_PAGE); i++) {
    paths = [...paths, { params: { offset: String(i + 2) } }]
  }

  return {
    paths,
    fallback: 'blocking',
  }
}
