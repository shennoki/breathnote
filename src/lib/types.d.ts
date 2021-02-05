/* microCMS で管理している Webサイトの設定 */
export type AllConfigType = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
} & Config

/* AllConfigType から不要なデータを抜き取った設定 */
export type ConfigType = {
  siteUrl: string
  siteTitle: string
  siteDescription: string
  siteKeywords: string
}

/* microCMS で管理している記事データ */
export type AllPostsType = {
  contents: PostData[]
  totalCount: number
  offset: number
  limit: number
}

/* AllPostsType から不要なデータを抜き取った記事データ */
export type PostType = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  description: string
  keywords: string
  categories: Category[]
  tags: Tag[]
  body: string
}

/* microCMS で管理しているカテゴリデータ */
export type CategoryType = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  name: string
}

/* microCMS で管理しているタグデータ */
export type TagType = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  name: string
}
