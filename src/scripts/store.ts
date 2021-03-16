import { AllKeywordsType, AllPostsType } from 'types'
import { API_ENDPOINT, API_KEY } from 'utils/env'

const KEY = { headers: { 'X-API-KEY': API_KEY } }

export const ALL_POSTS = (async () => {
  const posts: AllPostsType = await fetch(`${API_ENDPOINT}/posts`, KEY)
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(`FETCH FAILED : ${err}`)
    })
  const limit = 10
  const roopCount = Math.floor(posts.totalCount / limit)

  for (let i = 1; i <= roopCount; i++) {
    const fetchData = await fetch(`${API_ENDPOINT}/posts?offset=${limit * i}&limit=${limit}`, KEY)
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(`FETCH FAILED : ${err}`)
      })
    posts.contents = posts.contents.concat(fetchData.contents)
  }

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
})()

export const ALL_KEYWORDS = (async () => {
  const keywords: AllKeywordsType = await fetch(`${API_ENDPOINT}/keywords`, KEY)
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(`FETCH FAILED : ${err}`)
    })
  const limit = 10
  const roopCount = Math.floor(keywords.totalCount / limit)

  for (let i = 1; i <= roopCount; i++) {
    const fetchData = await fetch(`${API_ENDPOINT}/keywords?offset=${limit * i}&limit=${limit}`, KEY)
      .then((res) => res.json())
      .catch((err) => {
        throw new Error(`FETCH FAILED : ${err}`)
      })
    keywords.contents = keywords.contents.concat(fetchData.contents)
  }

  return keywords
})()
