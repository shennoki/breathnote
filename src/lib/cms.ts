import { AllConfigType, AllPostsType, ConfigType, PostType } from 'lib/types'

/* CONFIG : CMS から取得したサイト設定をオブジェクトとして格納 */
const CONFIG = (async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY as string },
  }

  const fetchData: AllConfigType = await fetch('https://breathnote.microcms.io/api/v1/setting/config', key)
    .then((res) => res.json())
    .catch((err) => console.error(err))

  return fetchData
})()

/* ALL_POSTS : CMS から取得した記事一覧を配列として格納 */
const ALL_POSTS = (async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY as string },
  }

  const fetchData: AllPostsType = await fetch('https://breathnote.microcms.io/api/v1/post', key)
    .then((res) => res.json())
    .catch((err) => console.error(err))

  return fetchData.contents
})()

/* ALL_POST_PATHS : ALL_POSTS で取得した記事から ID のみを抜き出して配列として格納 */
const ALL_POST_PATHS = (async () => {
  const array: { id: string }[] = []

  ;(await ALL_POSTS).map((post) => {
    array.push({ id: post.id })
  })

  return array
})()

/* getConfig : CONFIG から必要なデータを抜き出して返却 */
export const getConfig = async (): Promise<ConfigType> => {
  const allConfig = await CONFIG
  const config = {
    siteUrl: allConfig.siteUrl,
    siteTitle: allConfig.siteTitle,
    siteDescription: allConfig.siteDescription,
    siteKeywords: allConfig.siteKeywords,
  }

  return config
}

/* getSortedPosts : ALL_POSTS を日付が新しい順に並べ替えて返却 */
export const getSortedPosts = async (): Promise<PostType[]> => {
  const allPosts = await ALL_POSTS

  return allPosts.sort((a, b) => {
    if (a.publishedAt < b.publishedAt) {
      return 1
    } else {
      return -1
    }
  })
}

/* getPost : 受け取った ID に一致する記事を ALL_POSTS から返却 */
export const getPost = async (id: string): Promise<PostType> => {
  const allPosts = await ALL_POSTS

  const post = allPosts.find((post) => id === post.id)

  return post
}

/* getAllPostPaths : ALL_POST_PATHS を GetStaticPaths が求める形式にして返却 */
export const getAllPostPaths = async (): Promise<{ params: { id: string } }[]> => {
  const allPostsPaths = await ALL_POST_PATHS

  return allPostsPaths.map((path) => {
    return {
      params: {
        id: path.id,
      },
    }
  })
}
