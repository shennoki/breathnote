import { ALL_POSTS } from 'libs/store'

// keywords/index.tsx, keywords/page/[offset].tsx
export const getKeywordPosts = async (slug: string) => {
  const posts = (await ALL_POSTS).contents
  const keywordPosts = posts.filter((post) => {
    return post.keywords.some((keyword) => {
      return keyword.slug === slug
    })
  })
  return keywordPosts
}
