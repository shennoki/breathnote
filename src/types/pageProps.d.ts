import { Keyword } from 'types/keyword'

export type PageProps = {
  url: string
  type: string
  title: string
  description: string
  thumbnail?: string
  noindex?: boolean
  keywords: Keyword[]
}
