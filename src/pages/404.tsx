import Body from 'layout/body'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { getConfig } from 'scripts/getter'
import { ConfigType, PageOptionType } from 'types'

type Props = {
  config: ConfigType
  option: PageOptionType
}

const Error: NextPage<Props> = ({ config, option }) => {
  return (
    <>
      <Head>
        <title>404 | {config.siteTitle}</title>
        <meta name="description" content="該当するページが見つかりませんでした。" />
        <meta name="keywords" content={config.siteKeywords} />
        <meta property="og:title" content={`404 | {config.siteTitle}`} />
        <meta property="og:description" content="該当するページが見つかりませんでした。" />
        {/* 以下変更不要 */}
        {option.isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
        <link rel="canonical" href={option.fullPath} />
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        <meta property="og:url" content={option.fullPath} />
      </Head>
      <Body config={config} pageType={option.pageType} fullPath={option.fullPath}>
        <section>
          <h2>Not Found...</h2>
        </section>
      </Body>
    </>
  )
}

export default Error

export const getStaticProps: GetStaticProps = async () => {
  const config = await getConfig()
  const option = {
    pageType: '404',
    fullPath: `${config.siteDomain}/404`,
    isNoIndex: true,
  }

  return {
    props: {
      config,
      option,
    },
    revalidate: 60,
  }
}
