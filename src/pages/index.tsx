import Archives from 'components/molecules/Archives'
import BlogCard from 'components/molecules/BlogCard'
import Pagination from 'components/molecules/Pagination'
import { fetchAllKeywords, fetchAllPosts } from 'libs/store'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { PageProps } from 'types/pageProps'
import { Post } from 'types/post'
import { ARTICLE_PER_PAGE, SITE_DESCRIPTION, SITE_DOMAIN, SITE_SUBTITLE, SITE_TITLE } from 'utils/env'

type Props = {
  pageProps: PageProps
  posts: Post[]
  postLength: number
}

const Home: NextPage<Props> = ({ pageProps, posts, postLength }) => {
  return (
    <>
      <Head>{postLength >= ARTICLE_PER_PAGE && <link rel="next" href={`${SITE_DOMAIN}/page/2`} />}</Head>
      <Archives>
        <>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </>
      </Archives>
      <Pagination postLength={postLength} type={pageProps.type} offset={1} />
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const posts = (await fetchAllPosts()).contents.slice(0, ARTICLE_PER_PAGE)
  const postLength = (await fetchAllPosts()).totalCount

  const pageProps: PageProps = {
    url: `${SITE_DOMAIN}/`,
    type: 'home',
    title: `${SITE_TITLE} - ${SITE_SUBTITLE}`,
    description: SITE_DESCRIPTION,
    keywords: (await fetchAllKeywords()).contents,
  }

  return {
    props: {
      pageProps,
      posts,
      postLength,
    },
    revalidate: 60,
  }
}
