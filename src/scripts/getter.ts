import { ALL_KEYWORDS, ALL_POSTS } from 'scripts/store'
import { KeywordType, PostType } from 'types'

export const getAllPostPaths = async (): Promise<{ params: { slug: string } }[]> => {
  const posts = (await ALL_POSTS).contents
  return posts.map((post) => {
    return { params: { slug: post.slug } }
  })
}

export const getPost = async (slug: string): Promise<PostType> => {
  const posts = (await ALL_POSTS).contents
  const post = posts.find((post) => post.slug === slug)
  return post as PostType
}

export const getAllKeywordPaths = async (): Promise<{ params: { slug: string } }[]> => {
  const keywords = (await ALL_KEYWORDS).contents
  return keywords.map((keyword) => {
    return { params: { slug: keyword.slug } }
  })
}

export const getKeywordPosts = async (slug: string): Promise<PostType[]> => {
  const posts = (await ALL_POSTS).contents
  const keywordPosts = posts.filter((post) => {
    return post.keywords.some((keyword) => {
      return keyword.slug === slug
    })
  })
  return keywordPosts as PostType[]
}

export const getKeyword = async (slug: string): Promise<KeywordType> => {
  const keywords = (await ALL_KEYWORDS).contents
  const keyword = keywords.find((keyword) => keyword.slug === slug)
  return keyword as KeywordType
}
