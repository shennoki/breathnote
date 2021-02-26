/* ヘッドレス CMS のデータに付与されるカウントデータ */
export type CountType = {
  totalCount: number
  offset: number
  limit: number
}

/* ヘッドレス CMS で管理している Web サイトの設定データ */
export type AllConfigType = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
} & ConfigType

/* AllConfigType から必要なデータを取り出した設定データ */
export type ConfigType = {
  siteDomain: string
  siteTitle: string
  siteSubTitle: string
  siteDescription: string
}

/* ヘッドレス CMS で管理している記事一覧データ */
export type AllPostsType = {
  contents: PostType[]
} & CountType

/* 記事データ */
export type PostType = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  slug: string
  title: string
  description: string
  keywords: KeywordType[]
  thumbnail?: {
    url: string
    height: number
    width: number
  }
  body: string | Source
}

/* ヘッドレス CMS で管理しているカテゴリ一覧データ */
export type AllKeywordsType = {
  contents: KeywordType[]
} & CountType

/* カテゴリデータ */
export type KeywordType = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  name: string
  slug: string
  description: string
}

/* Pages 層のオプション定数を管理するデータ */
export type PageOptionType = {
  pageType: string
  fullPath: string
  isNoIndex: boolean
}
