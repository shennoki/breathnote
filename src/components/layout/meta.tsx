import { ConfigType } from 'lib/types'
import Head from 'next/head'
import React, { FC } from 'react'

type Props = {
  metaData: {
    title: string
    description: string
    keywords: string
    fullPath: string
    isNoIndex: boolean
  } & ConfigType
}

const Meta: FC<Props> = ({ metaData }) => {
  return (
    <Head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      {metaData.isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
      <title>{metaData.title}</title>
      <meta name="description" content={metaData.description} />
      <meta name="keywords" content={metaData.keywords} />
      <meta name="author" content="Shinki" />
      <link rel="canonical" href={metaData.fullPath} />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:site_name" content={metaData.siteTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaData.title} />
      <meta property="og:description" content={metaData.description} />
      <meta property="og:image" content={`${metaData.siteDomain}img/og-img.png`} />
      <meta property="og:url" content={metaData.fullPath} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="192x192" href="/img/android-chrome-192x192.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon-180x180.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="msapplication-TileImage" content="/img/site-tile-150x150.png" />
    </Head>
  )
}

export default Meta
