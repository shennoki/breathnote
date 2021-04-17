import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { API_ENDPOINT, API_KEY, DRAFT_TOKEN } from 'utils/env'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const KEY = { headers: { 'X-API-KEY': API_KEY } }
  const token = req.query.secret

  if (!token || token !== DRAFT_TOKEN) {
    res.writeHead(302, { Location: `/404` }).end()
  }

  const draft = await axios
    .get(`${API_ENDPOINT}/posts/${req.query.draftId}?fields=id&draftKey=${req.query.draftKey}`, KEY)
    .then((res) => res.data)
    .catch((err) => res.status(500).send(err))

  res.setPreviewData({
    draftId: draft.id,
    draftKey: req.query.draftKey,
  })

  res.writeHead(307, { Location: `/posts/${draft.id}` }).end()
}
