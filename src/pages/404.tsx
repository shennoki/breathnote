import ErrorArticle from 'components/organisms/Error'
import { fetchAllKeywords } from 'libs/store'
import { GetStaticProps, NextPage } from 'next'
import React from 'react'
import { PageProps } from 'types/pageProps'
import { SITE_DOMAIN, SITE_TITLE } from 'utils/env'

const Error: NextPage = () => {
  return <ErrorArticle status={404} message="Not Found." />
}

export default Error

export const getStaticProps: GetStaticProps = async () => {
  const pageProps: PageProps = {
    url: `${SITE_DOMAIN}/404`,
    type: '404',
    title: `404 - ${SITE_TITLE}`,
    description: '該当するページが見つかりませんでした。',
    thumbnail: `${SITE_DOMAIN}/img/og-img.jpg`,
    noindex: true,
    keywords: (await fetchAllKeywords()).contents,
  }

  return {
    props: {
      pageProps,
    },
  }
}
