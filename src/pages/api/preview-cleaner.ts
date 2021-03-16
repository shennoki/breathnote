import { NextApiRequest, NextApiResponse } from 'next'

export default async (_req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  res.clearPreviewData()
  res.writeHead(302, { Location: `/` }).end()
}
