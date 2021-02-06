import Footer from 'components/layout/footer'
import Header from 'components/layout/header'
import Meta from 'components/layout/meta'
import Sidebar from 'components/layout/sidebar'
import Share from 'components/share'
import { CategoryType, ConfigType, PostType, TagType } from 'lib/types'
import React, { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  config: ConfigType
  pageType: string
  post?: PostType
  category?: CategoryType
  tag?: TagType
}

const Body: FC<Props> = ({ children, config, pageType, post, category, tag }) => {
  const noIndexType = ['categories', 'category', 'tags', 'tag']
  let title, description, fullPath

  switch (pageType) {
    case 'home':
      title = `${config.siteTitle} | ${config.siteSubTitle}`
      description = config.siteDescription
      fullPath = config.siteDomain
      break
    case 'post':
      title = `${post?.title} | ${config.siteTitle}`
      description = post?.description
      fullPath = `${config.siteDomain}posts/${post?.slug}`
      break
    case 'categories':
      title = `カテゴリ一覧 | ${config.siteTitle}`
      description = `【 カテゴリ一覧ページ 】${config.siteDescription}`
      fullPath = `${config.siteDomain}${pageType}`
      break
    case 'category':
      title = `${category?.title} | ${config.siteTitle}`
      description = category?.description
      fullPath = `${config.siteDomain}categories/${category?.slug}`
      break
    case 'tags':
      title = `タグ一覧 | ${config.siteTitle}`
      description = `【 タグ一覧ページ 】${config.siteDescription}`
      fullPath = `${config.siteDomain}${pageType}`
      break
    case 'tag':
      title = `${tag?.title} | ${config.siteTitle}`
      description = tag?.description
      fullPath = `${config.siteDomain}tags/${tag?.slug}`
      break
    default:
      title = `${config.siteTitle} | ${config.siteTitle}`
      description = config.siteDescription
      fullPath = config.siteDomain
      break
  }

  const metaData = {
    ...config,
    title: title as string,
    description: description as string,
    keywords: post?.keywords ? post.keywords : config.siteKeywords,
    fullPath: fullPath as string,
    isNoIndex: noIndexType.some((type) => type === pageType),
  }

  return (
    <>
      <Meta metaData={metaData} />
      <Header pageType={pageType} />
      <main>
        <Share path={metaData.fullPath} text={metaData.title} />
        {children}
        <Sidebar />
      </main>
      <Footer />
    </>
  )
}

export default Body
