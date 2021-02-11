/* ＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/

  SCRIPTS -> DATA GETTER

  - STORE から非同期処理でデータを取得

＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/ */

import { notFound } from 'scripts/error'
import { ALL_CATEGORIES, ALL_POSTS, ALL_TAGS, CONFIG } from 'scripts/store'
import { CategoryType, ConfigType, CountType, PostType, TagType } from 'types'

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
    siteKeywords: config.siteKeywords,
  }
}

/* ------------------------
  POST GETTER
------------------------ */
export const getAllPosts = async (): Promise<PostType[]> => {
  const posts = (await ALL_POSTS).contents
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

export const getPostCount = async (): Promise<CountType> => {
  const posts = await ALL_POSTS
  return {
    totalCount: posts.totalCount,
    offset: posts.offset,
    limit: posts.limit,
  }
}

/* ------------------------
  CATEGORY GETTER
------------------------ */
export const getAllCategories = async (): Promise<CategoryType[]> => {
  const categories = (await ALL_CATEGORIES).contents
  return categories
}

export const getAllCategoryPaths = async (): Promise<{ params: { slug: string } }[]> => {
  const categories = (await ALL_CATEGORIES).contents
  return categories.map((category) => {
    return { params: { slug: category.slug } }
  })
}

export const getCategoryPosts = async (slug: string): Promise<PostType[]> => {
  const posts = (await ALL_POSTS).contents
  const categoryPosts = posts.filter((post) => {
    return post.categories.some((category) => {
      return category.slug === slug
    })
  })
  if (categoryPosts === []) notFound('CATEGORY POSTS')
  return categoryPosts as PostType[]
}

export const getCategory = async (slug: string): Promise<CategoryType> => {
  const categories = (await ALL_CATEGORIES).contents
  const category = categories.find((category) => category.slug === slug)
  if (!category) notFound('CATEGORY')
  return category as CategoryType
}

/* ------------------------
  TAG GETTER
------------------------ */
export const getAllTags = async (): Promise<TagType[]> => {
  const tags = (await ALL_TAGS).contents
  return tags
}

export const getAllTagPaths = async (): Promise<{ params: { slug: string } }[]> => {
  const tags = (await ALL_TAGS).contents
  return tags.map((tag) => {
    return { params: { slug: tag.slug } }
  })
}

export const getTagPosts = async (slug: string): Promise<PostType[]> => {
  const posts = (await ALL_POSTS).contents
  const tagPosts = posts.filter((post) => {
    return post.tags.some((tag) => {
      return tag.slug === slug
    })
  })
  if (tagPosts === []) notFound('TAG POSTS')
  return tagPosts as PostType[]
}

export const getTag = async (slug: string): Promise<TagType> => {
  const tags = (await ALL_TAGS).contents
  const tag = tags.find((tag) => tag.slug === slug)
  if (!tag) notFound('TAG')
  return tag as TagType
}
