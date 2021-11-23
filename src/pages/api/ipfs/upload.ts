import type { NextApiRequest, NextApiResponse } from 'next';
import { INFURA_IPFS_PROJECT_ID, INFURA_IPFS_PROJECT_SECRET } from 'config';

type Data = {
  auth?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    if (req.method === 'POST') {
      const auth = 'Basic ' + Buffer.from(`${INFURA_IPFS_PROJECT_ID}:${INFURA_IPFS_PROJECT_SECRET}`).toString('base64');

      return res.status(200).json({ auth });
    }

    return res.status(501).json({ error: 'Forbidden' });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}
