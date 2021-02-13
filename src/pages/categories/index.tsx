import Body from 'layout/Body'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { getAllCategories, getConfig } from 'scripts/getter'
import { CategoryType, ConfigType, PageOptionType } from 'types'

type Props = {
  config: ConfigType
  option: PageOptionType
  categories: CategoryType[]
}

const Categories: NextPage<Props> = ({ config, option, categories }) => {
  return (
    <>
      <Head>
        <title>カテゴリ一覧 | {config.siteTitle}</title>
        <meta name="description" content={`【 カテゴリ一覧ページ 】${config.siteDescription}`} />
        <meta name="keywords" content={config.siteKeywords} />
        <meta property="og:title" content={`カテゴリ一覧 | ${config.siteTitle}`} />
        <meta property="og:description" content={`【 カテゴリ一覧ページ 】${config.siteDescription}`} />
        {/* 以下変更不要 */}
        {option.isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
        <link rel="canonical" href={option.fullPath} />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        <meta property="og:url" content={option.fullPath} />
      </Head>
      <Body pageType={option.pageType} fullPath={option.fullPath}>
        <h1>Categories</h1>
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/categories/${category.slug}`}>
                <a>{category.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Body>
    </>
  )
}

export default Categories

export const getStaticProps: GetStaticProps = async () => {
  const config = await getConfig()
  const categories = await getAllCategories()
  const option = {
    pageType: 'categories',
    fullPath: `${config.siteDomain}/categories`,
    isNoIndex: true,
  }

  return {
    props: {
      config,
      option,
      categories,
    },
    revalidate: 60,
  }
}
