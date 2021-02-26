import { fetchFailed } from 'scripts/error'
import { AllConfigType, AllKeywordsType, AllPostsType } from 'types'

const KEY = { headers: { 'X-API-KEY': process.env.API_KEY as string } }

export const CONFIG = (async () => {
  const fetchData: AllConfigType = await fetch(`${process.env.API_ENDPOINT}/settings/config`, KEY)
    .then((res) => res.json())
    .catch((err) => fetchFailed(err))

  return fetchData
})()

export const ALL_POSTS = (async () => {
  const posts: AllPostsType = await fetch(`${process.env.API_ENDPOINT}/posts`, KEY)
    .then((res) => res.json())
    .catch((err) => fetchFailed(err))
  const limit = 10
  const roopCount = Math.floor(posts.totalCount / limit)

  for (let i = 1; i <= roopCount; i++) {
    const fetchData = await fetch(`${process.env.API_ENDPOINT}/posts?offset=${limit * i}&limit=${limit}`, KEY)
      .then((res) => res.json())
      .catch((err) => fetchFailed(err))
    posts.contents = posts.contents.concat(fetchData.contents)
  }

  return posts
})()

export const ALL_KEYWORDS = (async () => {
  const keywords: AllKeywordsType = await fetch(`${process.env.API_ENDPOINT}/keywords`, KEY)
    .then((res) => res.json())
    .catch((err) => fetchFailed(err))
  const limit = 10
  const roopCount = Math.floor(keywords.totalCount / limit)

  for (let i = 1; i <= roopCount; i++) {
    const fetchData = await fetch(`${process.env.API_ENDPOINT}/keywords?offset=${limit * i}&limit=${limit}`, KEY)
      .then((res) => res.json())
      .catch((err) => fetchFailed(err))
    keywords.contents = keywords.contents.concat(fetchData.contents)
  }

  return keywords
})()
