import { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'
import { API_ENDPOINT, API_KEY, DRAFT_TOKEN } from 'utils/env'

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const token = req.query.secret

  if (!token || token !== DRAFT_TOKEN) {
    res.writeHead(302, { Location: `/404` }).end()
  }

  const draft = await fetch(`${API_ENDPOINT}/posts/${req.query.draftId}?fields=id&draftKey=${req.query.draftKey}`, {
    headers: { 'X-API-KEY': API_KEY },
  })
    .then((res) => res.json())
    .catch((err) => {
      alert(err)
      res.status(500).end()
    })

  res.setPreviewData({
    draftId: draft.id,
    draftKey: req.query.draftKey,
  })

  res.writeHead(307, { Location: `/posts/${draft.id}` }).end()
}
