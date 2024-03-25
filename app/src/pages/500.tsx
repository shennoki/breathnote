import ErrorArticle from 'components/organisms/Error'
import { fetchAllKeywords } from 'libs/store'
import { GetStaticProps, NextPage } from 'next'
import { PageProps } from 'types/pageProps'
import { SITE_DOMAIN, SITE_TITLE } from 'utils/env'

const Error: NextPage = () => {
  return <ErrorArticle status={500} message="Server Error." />
}

export default Error

export const getStaticProps: GetStaticProps = async () => {
  const pageProps: PageProps = {
    url: `${SITE_DOMAIN}/500`,
    type: '500',
    title: `500 - ${SITE_TITLE}`,
    description: 'サーバー側でエラーが発生しました。',
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
