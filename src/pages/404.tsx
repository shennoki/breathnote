import Body from 'layout/Body'
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
        <title>{`404 | ${config.siteTitle}`}</title>
        <meta name="description" content="該当するページが見つかりませんでした。" />
        <meta property="og:title" content={`404 | ${config.siteTitle}`} />
        <meta property="og:description" content="該当するページが見つかりませんでした。" />
        <meta property="og:image" content={`${config.siteDomain}/img/og-image.jpg`} />
        {/* 以下変更不要 */}
        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:url" content={option.fullPath} />
        <link rel="canonical" href={option.fullPath} />
        {option.isNoIndex ? <meta name="robots" content="noindex,follow" /> : null}
      </Head>
      <Body pageType={option.pageType} fullPath={option.fullPath}>
        <article className="mb-10 md:mb-20">
          <h1 className="text-8xl text-center font-bold">404</h1>
          <h2 className="mt-4 text-2xl text-center font-bold">ページが見つかりません…</h2>
          <p className="mt-5 mx-auto text-sm table">
            申し訳ございませんが、ご指定いただいたページが見つかりませんでした。
          </p>
          <p className="mt-5 mx-auto text-sm table">ホームへ戻るか、各種SNSから管理者へご連絡ください。</p>
        </article>
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
  }
}
