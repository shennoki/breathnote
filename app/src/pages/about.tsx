import AboutArticle from 'components/organisms/About'
import { fetchAllKeywords } from 'libs/store'
import { GetStaticProps, NextPage } from 'next'
import { PageProps } from 'types/pageProps'
import { SITE_DOMAIN, SITE_TITLE } from 'utils/env'

const About: NextPage = () => {
  return <AboutArticle />
}

export default About

export const getStaticProps: GetStaticProps = async () => {
  const pageProps: PageProps = {
    url: `${SITE_DOMAIN}/about`,
    type: 'about',
    title: `About - ${SITE_TITLE}`,
    description:
      'Breathnoteは、フロントエンドの話題や備忘録をアウトプットしているブログです。当サイトに掲載されているコンテンツは自由にご利用いただけますが、ご利用の際に生じた如何なる不具合も当サイトは一切責任を負いません。',
    keywords: (await fetchAllKeywords()).contents,
  }

  return {
    props: {
      pageProps,
    },
  }
}
