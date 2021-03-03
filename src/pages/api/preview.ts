import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.query.secret !== process.env.DRAFT_TOKEN || !req.query.draftId) {
    res.writeHead(302, { Location: `/404` })
    return res.end('UNAUTHORIZED ACCESS')
  }

  const post = await fetch(
    `${process.env.API_ENDPOINT}/posts/${req.query.draftId}?fields=id&draftKey=${req.query.draftKey}`,
    { headers: { 'X-API-KEY': process.env.API_KEY as string } }
  )
    .then((res) => res.json())
    .catch(() => null)

  if (!post) {
    return res.status(401).json({ message: 'INVALID REQUEST' })
  }

  res.setPreviewData({
    draftId: post.id,
    draftKey: req.query.draftKey,
  })
  res.writeHead(307, { Location: `/posts/${post.id}` })
  res.end('PREVIEW MODE ENABLED')
}
