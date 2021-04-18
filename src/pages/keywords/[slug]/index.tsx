import Archives from 'components/molecules/Archives'
import BlogCard from 'components/molecules/BlogCard'
import KeywordHeader from 'components/molecules/KeywordHeader'
import Pagination from 'components/molecules/Pagination'
import { getKeywordPosts } from 'libs/requests'
import { fetchAllKeywords } from 'libs/store'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Keyword } from 'types/keyword'
import { PageProps } from 'types/pageProps'
import { Post } from 'types/post'
import { ARTICLE_PER_PAGE, SITE_DOMAIN, SITE_TITLE } from 'utils/env'

type Props = {
  pageProps: PageProps
  posts: Post[]
  postLength: number
  keyword: Keyword
}

const Keywords: NextPage<Props> = ({ pageProps, posts, postLength, keyword }) => {
  return (
    <>
      <Head>{postLength / ARTICLE_PER_PAGE > 1 && <link rel="next" href={`${pageProps.url}/page/2`} />}</Head>
      <KeywordHeader keyword={keyword} postLength={postLength} />
      <Archives>
        <>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </>
      </Archives>
      <Pagination postLength={postLength} type={pageProps.type} offset={1} slug={keyword.slug} />
    </>
  )
}

export default Keywords

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const keywords = (await fetchAllKeywords()).contents
  const slug = params?.slug as string

  // paramsから受け取ったslugを持つキーワードを返却
  const keyword = keywords.find((keyword) => keyword.slug === slug)
  if (!keyword) return { notFound: true }

  // 上記のキーワードを持つ記事のリストを配列で取得
  const keywordPosts = await getKeywordPosts(slug)

  // ページの表示に必要な記事を抜き出す
  const posts = keywordPosts.slice(0, ARTICLE_PER_PAGE)

  const pageProps: PageProps = {
    url: `${SITE_DOMAIN}/keywords/${keyword.slug}`,
    type: 'keywords',
    title: `${keyword.name} - ${SITE_TITLE}`,
    description: keyword.description,
    noindex: true,
    keywords: keywords,
  }

  return {
    props: {
      pageProps,
      posts,
      postLength: keywordPosts.length,
      keyword,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  // キーワードのスラッグをURLパスとして返却用のオブジェクトを作成
  const paths = (await fetchAllKeywords()).contents.map((keyword) => {
    return { params: { slug: keyword.slug } }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}
