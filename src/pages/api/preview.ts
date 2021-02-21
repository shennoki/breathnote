import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.secret !== process.env.DRAFT_TOKEN || !req.query.draftId) {
    return res.status(401).json({ message: 'UNAUTHORIZED ACCESS' })
  }

  const post = await fetch(
    `${process.env.API_ENDPOINT}/posts/${req.query.draftId}?fields=id,slug&draftKey=${req.query.draftKey}`,
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
  res.writeHead(307, { Location: `/posts/${post.slug}` })
  res.end('PREVIEW MODE ENABLED')
}
