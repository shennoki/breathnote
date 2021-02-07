/* ＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/

  LIBRARY -> STORE

  - microCMS から非同期処理で取得したデータを保存

  - CONFIG : サイト設定 (オブジェクト)
  - ALL_POSTS : 記事一覧 (配列)
  - ALL_CATEGORIES : カテゴリ一覧 (配列)
  - ALL_TAGS : タグ一覧 (配列)

＿/ ＿/ ＿/ ＿/ ＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/＿/ */

import highlight from 'highlight.js'
import marked from 'marked'
import { AllCategoriesType, AllConfigType, AllPostsType, AllTagsType } from 'types'

/* build 時の RSS・sitemap 生成時に fetch API を使えるようにする */
// eslint-disable-next-line @typescript-eslint/no-var-requires
global.fetch = require('node-fetch').default

const apiUrl = 'https://breathnote.microcms.io/api/v1/'

export const CONFIG = (async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY as string },
  }
  const fetchData: AllConfigType = await fetch(`${apiUrl}settings/config`, key)
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
  const fetchData: AllPostsType = await fetch(`${apiUrl}posts`, key)
    .then((res) => res.json())
    .catch((err) => {
      throw err
    })

  /* Marked.js のパース設定 */
  marked.setOptions({
    /* GitHub Flavored Markdown も認識して変換する */
    gfm: true,
    /* 改行方式を GFM 仕様にする */
    breaks: true,
    /* code 要素に標準で付与される langage- を削除 */
    langPrefix: '',
    /* シンタックスハイライトに highlight.js を使用 */
    highlight: (code, lang) => {
      return highlight.highlightAuto(code, [lang]).value
    },
  })

  /* 記事本文 (fetchData.contents.body) をパース */
  const posts = await Promise.all(
    fetchData.contents.map(async (content) => {
      const htmlBody = await marked(content.body)
      content.body = htmlBody

      return content
    })
  )

  return posts
})()

export const ALL_CATEGORIES = (async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY as string },
  }
  const fetchData: AllCategoriesType = await fetch(`${apiUrl}categories`, key)
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
  const fetchData: AllTagsType = await fetch(`${apiUrl}tags`, key)
    .then((res) => res.json())
    .catch((err) => {
      throw err
    })

  return fetchData.contents
})()
