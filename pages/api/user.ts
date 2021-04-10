import { NextApiRequest, NextApiResponse } from 'next';

const handler: (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> = async (req, res) => {
  if (req.method === 'GET') {
    const { 'aisolution-token': token } = req.cookies;

    if (token)
      return res.json({ _id: 'your_admin_id', name: 'gjk287', profile: null });

    return res.status(401).send('No token on cookies.');
  }

  return res.status(404).json({ error: 'No Token on Cookies.' });
};

export default handler;
