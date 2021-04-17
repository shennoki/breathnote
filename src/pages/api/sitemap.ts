import { generateSitemap } from 'libs/sitemap'
import { ALL_POSTS } from 'libs/store'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const posts = (await ALL_POSTS).contents
  const sitemap = generateSitemap(posts)

  res.statusCode = 200
  res.setHeader('content-type', 'application/xml')
  res.write(sitemap)
  res.end()
}
