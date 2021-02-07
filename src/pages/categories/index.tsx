import Body from 'layout/body'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { getAllCategories, getConfig } from 'scripts/getter'
import { CategoryType, ConfigType } from 'types'

type Props = {
  config: ConfigType
  allCategories: CategoryType[]
}

const Categories: NextPage<Props> = ({ config, allCategories }) => {
  const pageType = 'categories'
  const fullPath = `${config.siteDomain}/${pageType}`
  const isNoIndex = true

  return (
    <>
      <Head>
        <title>カテゴリ一覧 | {config.siteTitle}</title>
        <meta name="description" content={`【 カテゴリ一覧ページ 】${config.siteDescription}`} />
        <meta name="keywords" content={config.siteKeywords} />
        <meta property="og:title" content={`カテゴリ一覧 | ${config.siteTitle}`} />
        <meta property="og:description" content={`【 カテゴリ一覧ページ 】${config.siteDescription}`} />
        {/* 以下変更不要 */}
        {isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
        <link rel="canonical" href={fullPath} />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        <meta property="og:url" content={fullPath} />
      </Head>
      <Body config={config} pageType={pageType} fullPath={fullPath}>
        <h1>Categories</h1>
        <ul>
          {allCategories.map((category) => (
            <li key={category.id}>
              <Link href={`/${pageType}/${category.slug}`}>
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
  const allCategories = await getAllCategories()
  return {
    props: {
      config,
      allCategories,
    },
  }
}
