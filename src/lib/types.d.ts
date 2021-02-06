/* ＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/

  LIB -> TYPES

  - 型定義ファイル

  - AllConfigType : microCMS で管理している Webサイトの設定
  - ConfigType : AllConfigType から不要なデータを抜き取った設定
  - AllPostsType : microCMS で管理している記事一覧データ
  - PostType : 記事データ
  - AllCategoriesType : microCMS で管理しているカテゴリ一覧データ
  - CategoryType : カテゴリデータ
  - AllTagsType : microCMS で管理しているタグ一覧データ
  - TagType : タグデータ

＿/ ＿/ ＿/ ＿/ ＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/ */

export type AllConfigType = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
} & ConfigType

export type ConfigType = {
  siteDomain: string
  siteTitle: string
  siteSubTitle: string
  siteDescription: string
  siteKeywords: string
}

export type AllPostsType = {
  contents: PostType[]
  totalCount: number
  offset: number
  limit: number
}

export type PostType = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  slug: string
  title: string
  description: string
  keywords: string
  categories: CategoryType[]
  tags: TagType[]
  body: string
}

export type AllCategoriesType = {
  contents: CategoryType[]
  totalCount: number
  offset: number
  limit: number
}

export type CategoryType = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  slug: string
  title: string
  description: string
}

export type AllTagsType = {
  contents: TagType[]
  totalCount: number
  offset: number
  limit: number
}

export type TagType = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  slug: string
  title: string
  description: string
}
