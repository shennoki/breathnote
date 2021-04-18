export type AllKeywords = {
  contents: Keyword[]
  totalCount: number
  offset: number
  limit: number
}

export type Keyword = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  name: string
  slug: string
  description: string
}
