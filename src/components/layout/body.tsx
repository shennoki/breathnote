import Footer from 'components/layout/footer'
import Header from 'components/layout/header'
import Meta from 'components/layout/meta'
import Sidebar from 'components/layout/sidebar'
import Share from 'components/share'
import { ConfigType, PostType } from 'lib/types'
import React, { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  pageType: string
  config: ConfigType
  post?: PostType
}

const Body: FC<Props> = ({ children, pageType, config, post }) => {
  /* title ~ path : 記事ページの場合は記事のメタ情報を、それ以外のページではサイト情報を格納する */
  const metaData = {
    ...config,
    title: post?.title ? `${post.title} | ${config.siteTitle}` : config.siteTitle,
    description: post?.description ? post.description : config.siteDescription,
    keywords: post?.keywords ? post.keywords : config.siteKeywords,
    path: post?.id ? config.siteUrl + post.id : config.siteUrl,
  }

  return (
    <>
      <Meta metaData={metaData} />
      <Header pageType={pageType} />
      <main>
        <Share path={metaData.path} text={metaData.title} />
        {children}
        <Sidebar />
      </main>
      <Footer />
    </>
  )
}

export default Body
