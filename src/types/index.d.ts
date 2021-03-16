export type CountType = {
  totalCount: number
  offset: number
  limit: number
}

export type AllPostsType = {
  contents: PostType[]
} & CountType

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

export type AllKeywordsType = {
  contents: KeywordType[]
} & CountType

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

export type PageOptionType = {
  pageType: string
  fullPath: string
}
