/* ＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/

  LIB -> GETTER

  - STORE から非同期処理で取得したデータを返却

＿/ ＿/ ＿/ ＿/ ＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/ */

import * as Store from 'lib/store'
import { CategoryType, ConfigType, PostType, TagType } from 'lib/types'

/* -------------------------------------------
  getConfig : CONFIG から必要なデータを抜き出して返却
------------------------------------------- */
export const getConfig = async (): Promise<ConfigType> => {
  const allConfig = await Store.CONFIG
  const config = {
    siteDomain: allConfig.siteDomain,
    siteTitle: allConfig.siteTitle,
    siteSubTitle: allConfig.siteSubTitle,
    siteDescription: allConfig.siteDescription,
    siteKeywords: allConfig.siteKeywords,
  }

  return config
}

/* -------------------------------------------
  getSortedPosts : ALL_POSTS を日付が新しい順に並べ替えて返却
  getAllPostPaths : ALL_POSTS から slug を抜き出して返却
  getPost : 受け取った slug に一致する記事を ALL_POSTS から返却
------------------------------------------- */
export const getSortedPosts = async (): Promise<PostType[]> => {
  const allPosts = await Store.ALL_POSTS

  return allPosts.sort((a, b) => {
    if (a.publishedAt < b.publishedAt) {
      return 1
    } else {
      return -1
    }
  })
}

export const getAllPostPaths = async (): Promise<{ params: { slug: string } }[]> => {
  const allPosts = await Store.ALL_POSTS

  return allPosts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    }
  })
}

export const getPost = async (slug: string): Promise<PostType> => {
  const allPosts = await Store.ALL_POSTS
  const post = allPosts.find((post) => post.slug === slug)

  if (post) {
    return post
  } else {
    throw 'Post not found.'
  }
}

/* -------------------------------------------
  getAllCategories : ALL_CATEGORIES を返却
  getAllCategoryPaths : ALL_CATEGORIES から slug を抜き出して返却
  getCategoryPosts : 受け取った slug に一致する記事を ALL_POSTS から返却
  getCategory : 受け取った slug に一致するカテゴリを ALL_CATEGORIES から返却
------------------------------------------- */
export const getAllCategories = async (): Promise<CategoryType[]> => {
  const allCategories = await Store.ALL_CATEGORIES

  return allCategories
}

export const getAllCategoryPaths = async (): Promise<{ params: { slug: string } }[]> => {
  const allCategories = await Store.ALL_CATEGORIES

  return allCategories.map((category) => {
    return {
      params: {
        slug: category.slug,
      },
    }
  })
}

export const getCategoryPosts = async (slug: string): Promise<PostType[]> => {
  const allPosts = await Store.ALL_POSTS
  const categoryPosts = allPosts.filter((post) => {
    const isFound = post.categories.some((category) => {
      return category.slug === slug
    })
    return isFound
  })

  return categoryPosts
}

export const getCategory = async (slug: string): Promise<CategoryType> => {
  const allCategories = await Store.ALL_CATEGORIES
  const category = allCategories.find((category) => category.slug === slug)

  if (category) {
    return category
  } else {
    throw 'Category not found.'
  }
}

/* -------------------------------------------
  getAllTags : ALL_TAGS を返却
  getAllTagPaths : ALL_TAGS から slug を抜き出して返却
  getTagPosts : 受け取った slug に一致する記事を ALL_POSTS から返却
  getTag : 受け取った slug に一致するタグを ALL_TAGS から返却
------------------------------------------- */
export const getAllTags = async (): Promise<TagType[]> => {
  const allTags = await Store.ALL_TAGS

  return allTags
}

export const getAllTagPaths = async (): Promise<{ params: { slug: string } }[]> => {
  const allTags = await Store.ALL_TAGS

  return allTags.map((tag) => {
    return {
      params: {
        slug: tag.slug,
      },
    }
  })
}

export const getTagPosts = async (slug: string): Promise<PostType[]> => {
  const allPosts = await Store.ALL_POSTS
  const tagPosts = allPosts.filter((post) => {
    const isFound = post.tags.some((tag) => {
      return tag.slug === slug
    })
    return isFound
  })

  return tagPosts
}

export const getTag = async (slug: string): Promise<TagType> => {
  const allTags = await Store.ALL_TAGS
  const tag = allTags.find((tag) => tag.slug === slug)

  if (tag) {
    return tag
  } else {
    throw 'Tag not found.'
  }
}
