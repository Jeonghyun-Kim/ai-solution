import { NextApiResponse } from 'next';
import { serialize } from 'cookie';

export const setTokenOnCookie: (res: NextApiResponse, token: string) => void = (
  res,
  token,
) => {
  const cookies = [
    serialize('aisolution-token', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    }),
  ];

  res.setHeader('Set-Cookie', cookies);
};

export const removeTokenOnCookie: (res: NextApiResponse) => void = (res) => {
  res.setHeader('Set-Cookie', [
    serialize('aisolution-token', '', {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    }),
  ]);
};
