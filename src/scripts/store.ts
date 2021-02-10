/* ＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/

  LIBRARY -> STORE

  - microCMS から非同期処理で取得したデータを保存

  - CONFIG : サイト設定 (オブジェクト)
  - ALL_POSTS : 記事一覧 (配列)
  - ALL_CATEGORIES : カテゴリ一覧 (配列)
  - ALL_TAGS : タグ一覧 (配列)

＿/ ＿/ ＿/ ＿/ ＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/ */

import { AllCategoriesType, AllConfigType, AllPostsType, AllTagsType } from 'types'

export const CONFIG = (async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY as string },
  }
  const fetchData: AllConfigType = await fetch(`${process.env.ENDPOINT}/settings/config`, key)
    .then((res) => res.json())
    .catch((err) => {
      throw err
    })

  return fetchData
})()

export const ALL_POSTS = (async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY as string },
  }
  const fetchData: AllPostsType = await fetch(`${process.env.ENDPOINT}/posts`, key)
    .then((res) => res.json())
    .catch((err) => {
      throw err
    })

  return fetchData.contents
})()

export const ALL_CATEGORIES = (async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY as string },
  }
  const fetchData: AllCategoriesType = await fetch(`${process.env.ENDPOINT}/categories`, key)
    .then((res) => res.json())
    .catch((err) => {
      throw err
    })

  return fetchData.contents
})()

export const ALL_TAGS = (async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY as string },
  }
  const fetchData: AllTagsType = await fetch(`${process.env.ENDPOINT}/tags`, key)
    .then((res) => res.json())
    .catch((err) => {
      throw err
    })

  return fetchData.contents
})()
