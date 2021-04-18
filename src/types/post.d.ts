import { Keyword } from 'types/keyword'

export type AllPosts = {
  contents: Post[]
  totalCount: number
  offset: number
  limit: number
}

export type Post = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  slug: string
  title: string
  description: string
  keywords: Keyword[]
  thumbnail?: {
    url: string
    height: number
    width: number
  }
  body: string | Source
}
