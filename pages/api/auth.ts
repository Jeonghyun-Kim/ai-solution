import { removeTokenOnCookie, setTokenOnCookie } from '@lib/cookie';
import { NextApiRequest, NextApiResponse } from 'next';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'POST') {
    setTokenOnCookie(res, 'your_secret_token');

    return res.status(204).end();
  }

  if (req.method === 'DELETE') {
    removeTokenOnCookie(res);

    return res.status(204).end();
  }

  return res.status(404).send('Method not exists.');
};

export default handler;
