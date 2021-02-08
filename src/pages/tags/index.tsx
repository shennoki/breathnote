import Body from 'layout/body'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { getAllTags, getConfig } from 'scripts/getter'
import { ConfigType, TagType } from 'types'

type Props = {
  config: ConfigType
  allTags: TagType[]
}

const Tags: NextPage<Props> = ({ config, allTags }) => {
  const pageType = 'tags'
  const fullPath = `${config.siteDomain}/${pageType}`
  const isNoIndex = true

  return (
    <>
      <Head>
        <title>タグ一覧 | {config.siteTitle}</title>
        <meta name="description" content={`【 タグ一覧ページ 】${config.siteDescription}`} />
        <meta name="keywords" content={config.siteKeywords} />
        <meta property="og:title" content={`タグ一覧 | ${config.siteTitle}`} />
        <meta property="og:description" content={`【 タグ一覧ページ 】${config.siteDescription}`} />
        {/* 以下変更不要 */}
        {isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
        <link rel="canonical" href={fullPath} />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        <meta property="og:url" content={fullPath} />
      </Head>
      <Body config={config} pageType={pageType} fullPath={fullPath}>
        <h1>Tags</h1>
        <ul>
          {allTags.map((tag) => (
            <li key={tag.id}>
              <Link href="/tags/[slug]" as={`/tags/${tag.slug}`}>
                <a>{tag.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Body>
    </>
  )
}

export default Tags

export const getStaticProps: GetStaticProps = async () => {
  const config = await getConfig()
  const allTags = await getAllTags()
  return {
    props: {
      config,
      allTags,
    },
  }
}
