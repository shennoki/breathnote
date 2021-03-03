import Body from 'layout/Body'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { PageOptionType } from 'types'

type Props = {
  option: PageOptionType
}

const Error: NextPage<Props> = ({ option }) => {
  return (
    <>
      <Head>
        <link rel="canonical" href={option.fullPath} />
        <title>{`404 | ${process.env.NEXT_PUBLIC_SITE_TITLE}`}</title>
        <meta name="description" content="該当するページが見つかりませんでした。" />
        <meta property="og:url" content={option.fullPath} />
        <meta property="og:title" content={`404 | ${process.env.NEXT_PUBLIC_SITE_TITLE}`} />
        <meta property="og:description" content="該当するページが見つかりませんでした。" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_SITE_DOMAIN}/img/og-image.jpg`} />
        <meta name="robots" content="noindex,nofollow" />
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
  const option = {
    pageType: '404',
    fullPath: `${process.env.NEXT_PUBLIC_SITE_DOMAIN}/404`,
  }
  return {
    props: {
      option,
    },
  }
}
