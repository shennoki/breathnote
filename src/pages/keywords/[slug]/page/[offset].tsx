import Archives from 'components/molecules/Archives'
import BlogCard from 'components/molecules/BlogCard'
import KeywordHeader from 'components/molecules/KeywordHeader'
import Pagination from 'components/molecules/Pagination'
import { getKeywordPosts } from 'libs/requests'
import { ALL_KEYWORDS } from 'libs/store'
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
  offset: number
}

const Keywords: NextPage<Props> = ({ pageProps, posts, postLength, keyword, offset }) => {
  return (
    <>
      <Head>
        <link
          rel="prev"
          href={
            offset === 2
              ? `${SITE_DOMAIN}/keywords/${keyword.slug}`
              : `${SITE_DOMAIN}/keywords/${keyword.slug}/page/${offset - 1}`
          }
        />
        {offset !== Math.ceil(postLength / ARTICLE_PER_PAGE) && (
          <link rel="next" href={`${SITE_DOMAIN}/keywords/${keyword.slug}/page/${offset + 1}`} />
        )}
      </Head>
      <KeywordHeader keyword={keyword} postLength={postLength} />
      <Archives>
        <>
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </>
      </Archives>
      <Pagination postLength={postLength} type={pageProps.type} offset={offset} slug={keyword.slug} />
    </>
  )
}

export default Keywords

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const keywords = (await ALL_KEYWORDS).contents
  const slug = params?.slug as string
  const offset = Number(params?.offset)

  // paramsから受け取ったslugを持つキーワードを返却
  const keyword = keywords.find((keyword) => keyword.slug === slug)
  if (!keyword) return { notFound: true }

  // 上記のキーワードを持つ記事のリストを配列で取得
  const keywordPosts = await getKeywordPosts(slug)

  // ページの表示に必要な記事を抜き出す
  const posts = keywordPosts.slice(ARTICLE_PER_PAGE * offset - ARTICLE_PER_PAGE, ARTICLE_PER_PAGE * offset)
  if (posts.length === 0) return { notFound: true }

  const pageProps: PageProps = {
    url: `${SITE_DOMAIN}/keywords/${keyword.slug}/page/${offset}`,
    type: 'keywords',
    title: `${keyword.name} (${offset}) - ${SITE_TITLE}`,
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
      offset,
    },
    revalidate: 60,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: { params: { slug: string; offset: string } }[] = []

  // キーワードのスラッグ一覧を取得
  const slugs = (await ALL_KEYWORDS).contents.map((keyword) => {
    return keyword.slug
  })

  // キーワードごとのページ数を取得
  const offsets = slugs.map(async (slug) => {
    const length = (await getKeywordPosts(slug)).length
    return Math.floor(length / ARTICLE_PER_PAGE)
  })

  // スラッグとページ数をパスにセット
  for (let i = 0; i < slugs.length; i++) {
    paths = paths.concat([
      {
        params: {
          slug: slugs[i],
          offset: String(offsets[i]),
        },
      },
    ])
  }

  return {
    paths,
    fallback: 'blocking',
  }
}
