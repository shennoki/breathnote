/* ＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/

  LIBRARY -> SORT

  - 記事を並び変える関数群

  - sortByDesc : 日付が新しい順に並び変える
  - sortByAsc : 日付が古い順に並び変える

＿/ ＿/ ＿/ ＿/ ＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/ */

import { PostType } from 'types'

export const sortByDesc = (posts: PostType[]): PostType[] => {
  if (posts.length > 1) {
    return posts.sort((a, b) => {
      if (a.publishedAt < b.publishedAt) {
        return 1
      } else {
        return -1
      }
    })
  }
  return posts
}

export const sortByAsc = (posts: PostType[]): PostType[] => {
  if (posts.length > 1) {
    return posts.sort((a, b) => {
      if (a.publishedAt > b.publishedAt) {
        return 1
      } else {
        return -1
      }
    })
  }
  return posts
}
