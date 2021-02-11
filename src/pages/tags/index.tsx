import Body from 'layout/body'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { getAllTags, getConfig } from 'scripts/getter'
import { ConfigType, PageOptionType, TagType } from 'types'

type Props = {
  config: ConfigType
  option: PageOptionType
  tags: TagType[]
}

const Tags: NextPage<Props> = ({ config, option, tags }) => {
  return (
    <>
      <Head>
        <title>タグ一覧 | {config.siteTitle}</title>
        <meta name="description" content={`【 タグ一覧ページ 】${config.siteDescription}`} />
        <meta name="keywords" content={config.siteKeywords} />
        <meta property="og:title" content={`タグ一覧 | ${config.siteTitle}`} />
        <meta property="og:description" content={`【 タグ一覧ページ 】${config.siteDescription}`} />
        {/* 以下変更不要 */}
        {option.isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
        <link rel="canonical" href={option.fullPath} />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        <meta property="og:url" content={option.fullPath} />
      </Head>
      <Body pageType={option.pageType} fullPath={option.fullPath}>
        <h1>Tags</h1>
        <ul>
          {tags.map((tag) => (
            <li key={tag.id}>
              <Link href={`/tags/${tag.slug}`}>
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
  const tags = await getAllTags()
  const option = {
    pageType: 'tags',
    fullPath: `${config.siteDomain}/tags`,
    isNoIndex: true,
  }
  return {
    props: {
      config,
      option,
      tags,
    },
    revalidate: 60,
  }
}
