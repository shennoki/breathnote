import { fetchFailed } from 'scripts/error'
import { AllCategoriesType, AllConfigType, AllPostsType } from 'types'

const KEY = { headers: { 'X-API-KEY': process.env.API_KEY as string } }

export const CONFIG = (async () => {
  const fetchData: AllConfigType = await fetch(`${process.env.ENDPOINT}/settings/config`, KEY)
    .then((res) => res.json())
    .catch((err) => fetchFailed(err))

  return fetchData
})()

export const ALL_POSTS = (async () => {
  const posts: AllPostsType = await fetch(`${process.env.ENDPOINT}/posts`, KEY)
    .then((res) => res.json())
    .catch((err) => fetchFailed(err))
  const limit = 10
  const roopCount = Math.floor(posts.totalCount / limit)

  for (let i = 1; i <= roopCount; i++) {
    const fetchData = await fetch(`${process.env.ENDPOINT}/posts?offset=${limit * i}&limit=${limit}`, KEY)
      .then((res) => res.json())
      .catch((err) => fetchFailed(err))
    posts.contents = posts.contents.concat(fetchData.contents)
  }

  return posts
})()

export const ALL_CATEGORIES = (async () => {
  const categories: AllCategoriesType = await fetch(`${process.env.ENDPOINT}/categories`, KEY)
    .then((res) => res.json())
    .catch((err) => fetchFailed(err))
  const limit = 10
  const roopCount = Math.floor(categories.totalCount / limit)

  for (let i = 1; i <= roopCount; i++) {
    const fetchData = await fetch(`${process.env.ENDPOINT}/categories?offset=${limit * i}&limit=${limit}`, KEY)
      .then((res) => res.json())
      .catch((err) => fetchFailed(err))
    categories.contents = categories.contents.concat(fetchData.contents)
  }

  return categories
})()

export const ALL_TAGS = (async () => {
  const tags: AllCategoriesType = await fetch(`${process.env.ENDPOINT}/tags`, KEY)
    .then((res) => res.json())
    .catch((err) => fetchFailed(err))
  const limit = 10
  const roopCount = Math.floor(tags.totalCount / limit)

  for (let i = 1; i <= roopCount; i++) {
    const fetchData = await fetch(`${process.env.ENDPOINT}/tags?offset=${limit * i}&limit=${limit}`, KEY)
      .then((res) => res.json())
      .catch((err) => fetchFailed(err))
    tags.contents = tags.contents.concat(fetchData.contents)
  }

  return tags
})()
