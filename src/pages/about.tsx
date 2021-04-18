import About from 'components/organisms/About'
import { ALL_KEYWORDS } from 'libs/store'
import { GetStaticProps, NextPage } from 'next'
import React from 'react'
import { PageProps } from 'types/pageProps'
import { SITE_DOMAIN, SITE_TITLE } from 'utils/env'

const Posts: NextPage = () => {
  return <About />
}

export default Posts

export const getStaticProps: GetStaticProps = async () => {
  const pageProps: PageProps = {
    url: `${SITE_DOMAIN}/about`,
    type: 'about',
    title: `About - ${SITE_TITLE}`,
    description: '',
    keywords: (await ALL_KEYWORDS).contents,
  }

  return {
    props: {
      pageProps,
    },
  }
}
