import { notFound } from 'scripts/error'
import { sortByAsc, sortByDesc } from 'scripts/sort'
import { ALL_KEYWORDS, ALL_POSTS, CONFIG } from 'scripts/store'
import { ConfigType, KeywordType, PostType } from 'types'

/* ------------------------
  CONFIG GETTER
------------------------ */
export const getConfig = async (): Promise<ConfigType> => {
  const config = await CONFIG
  return {
    siteDomain: config.siteDomain,
    siteTitle: config.siteTitle,
    siteSubTitle: config.siteSubTitle,
    siteDescription: config.siteDescription,
  }
}

/* ------------------------
  POST GETTER
------------------------ */
export const getAllPosts = async (sort: string): Promise<PostType[]> => {
  let posts = (await ALL_POSTS).contents
  if (sort === 'desc') posts = sortByDesc(posts)
  else if (sort === 'asc') posts = sortByAsc(posts)
  return posts
}

export const getAllPostPaths = async (): Promise<{ params: { slug: string } }[]> => {
  const posts = (await ALL_POSTS).contents
  return posts.map((post) => {
    return { params: { slug: post.slug } }
  })
}

export const getPost = async (slug: string): Promise<PostType> => {
  const posts = (await ALL_POSTS).contents
  const post = posts.find((post) => post.slug === slug)
  if (!post) notFound('POST')
  return post as PostType
}

/* ------------------------
  KEYWORD GETTER
------------------------ */
export const getAllKeywords = async (): Promise<KeywordType[]> => {
  const keywords = (await ALL_KEYWORDS).contents
  return keywords
}

export const getAllKeywordPaths = async (): Promise<{ params: { slug: string } }[]> => {
  const keywords = (await ALL_KEYWORDS).contents
  return keywords.map((keyword) => {
    return { params: { slug: keyword.slug } }
  })
}

export const getKeywordPosts = async (slug: string, sort: string): Promise<PostType[]> => {
  const posts = (await ALL_POSTS).contents
  let keywordPosts = posts.filter((post) => {
    return post.keywords.some((keyword) => {
      return keyword.slug === slug
    })
  })
  if (keywordPosts === []) notFound('KEYWORD POSTS')
  if (sort === 'desc') keywordPosts = sortByDesc(keywordPosts)
  else if (sort === 'asc') keywordPosts = sortByAsc(keywordPosts)
  return keywordPosts as PostType[]
}

export const getKeyword = async (slug: string): Promise<KeywordType> => {
  const keywords = (await ALL_KEYWORDS).contents
  const keyword = keywords.find((keyword) => keyword.slug === slug)
  if (!keyword) notFound('KEYWORD')
  return keyword as KeywordType
}
