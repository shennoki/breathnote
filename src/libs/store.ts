import axios from 'axios'
import { AllKeywords } from 'types/keyword'
import { AllPosts } from 'types/post'
import { API_ENDPOINT, API_KEY } from 'utils/env'

const KEY = { headers: { 'X-API-KEY': API_KEY } }

const fetchAllPosts = async () => {
  console.log('ALL_POSTS fire')

  // 一度に受け取る記事数
  const limit = 10

  // 総記事数等を含む最初の10記事を取得
  const posts: AllPosts = await axios
    .get(`${API_ENDPOINT}/posts?limit=${limit}`, KEY)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(`FETCH FAILED (fetchAllPosts() - First reqest) : ${err}`)
    })

  // APIを叩く回数
  const requestsCount = Math.floor(posts.totalCount / limit)

  // すべての記事を取得してposts.contentsに追加
  for (let i = 1; i <= requestsCount; i++) {
    const fetchData = await axios
      .get(`${API_ENDPOINT}/posts?offset=${limit * i}&limit=${limit}`, KEY)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(`FETCH FAILED (fetchAllPosts() - Roop ${i} reqest) : ${err}`)
      })
    posts.contents = posts.contents.concat(fetchData.contents)
  }

  // 記事を降順 (公開日が新しい順) に並び替え
  if (posts.contents.length > 1) {
    posts.contents.sort((a, b) => {
      if (a.publishedAt < b.publishedAt) {
        return 1
      } else {
        return -1
      }
    })
  }

  return posts
}

const fetchAllKeywords = async () => {
  console.log('ALL_KEYWORDS fire')

  // 一度に受け取るキーワード数
  const limit = 10

  // 総キーワード数等を含む最初の10データを取得
  const keywords: AllKeywords = await axios
    .get(`${API_ENDPOINT}/keywords?limit=${limit}`, KEY)
    .then((res) => res.data)
    .catch((err) => {
      throw new Error(`FETCH FAILED (fetchAllKeywords() - First reqest) : ${err}`)
    })

  // APIを叩く回数
  const requestsCount = Math.floor(keywords.totalCount / limit)

  // すべてのキーワードを取得してposts.contentsに追加
  for (let i = 1; i <= requestsCount; i++) {
    const fetchData = await axios
      .get(`${API_ENDPOINT}/keywords?offset=${limit * i}&limit=${limit}`, KEY)
      .then((res) => res.data)
      .catch((err) => {
        throw new Error(`FETCH FAILED (fetchAllKeywords() - Roop ${i} reqest) : ${err}`)
      })
    keywords.contents = keywords.contents.concat(fetchData.contents)
  }

  // キーワードを昇順 (アルファベット順) に並び替え
  if (keywords.contents.length > 1) {
    keywords.contents.sort((a, b) => {
      if (a.name > b.name) {
        return 1
      } else {
        return -1
      }
    })
  }

  return keywords
}

export const ALL_POSTS = fetchAllPosts()
export const ALL_KEYWORDS = fetchAllKeywords()
