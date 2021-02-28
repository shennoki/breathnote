import Svg from 'components/Svg'
import Body from 'layout/Body'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { ALL_KEYWORDS } from 'scripts/store'
import { KeywordType, PageOptionType } from 'types'

type Props = {
  keywords: KeywordType[]
  option: PageOptionType
}

const Keywords: NextPage<Props> = ({ keywords, option }) => {
  return (
    <>
      <Head>
        <link rel="canonical" href={option.fullPath} />
        <title>{`キーワード一覧 | ${process.env.NEXT_PUBLIC_SITE_TITLE}`}</title>
        <meta
          name="description"
          content="キーワード一覧ページです。フレームワークや設計思想、ライブラリ、サービスなど様々な分野のキーワードで記事をまとめています。"
        />
        <meta property="og:url" content={option.fullPath} />
        <meta property="og:title" content={`キーワード一覧 | ${process.env.NEXT_PUBLIC_SITE_TITLE}`} />
        <meta
          property="og:description"
          content="キーワード一覧ページです。フレームワークや設計思想、ライブラリ、サービスなど様々な分野のキーワードで記事をまとめています。"
        />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_DOMAIN}/img/og-image.jpg`} />
      </Head>
      <Body pageType={option.pageType} fullPath={option.fullPath}>
        <section className="mb-10 md:mb-20 lg:mb-32">
          <h1 className="text-xl md:text-3xl text-center">
            <span className="text-2xl md:text-4xl text-accent dark:text-yellow-300">キ</span>
            ーワード一覧
          </h1>
          <ul className="flex flex-wrap justify-around items-center">
            {keywords.map((keyword) => (
              <li key={keyword.id} className="mt-6 mx-6">
                <Link href={`/keywords/${keyword.slug}`}>
                  <a className="md:text-lg hover:text-accent dark:hover:text-yellow-300 flex items-center">
                    <Svg type="clip" strokeWidth={1.5} class="w-5 h-5 mr-1.5" />
                    {keyword.name}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Body>
    </>
  )
}

export default Keywords

export const getStaticProps: GetStaticProps = async () => {
  const keywords = (await ALL_KEYWORDS).contents
  const option = {
    pageType: 'keywords',
    fullPath: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/keywords`,
  }

  return {
    props: {
      keywords,
      option,
    },
    revalidate: 300,
  }
}
