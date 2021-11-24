import fetch from 'node-fetch';
import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { UNSPLASH_ACCESS_KEY, UNSPLASH_REDIRECT_URI, UNSPLASH_SECRET_KEY } from 'config';

type Data = {
  name?: string;
  error?: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const code = req.query.code;

    if (code) {
      const response = await fetch(
        `https://unsplash.com/oauth/token?client_id=${UNSPLASH_ACCESS_KEY}&client_secret=${UNSPLASH_SECRET_KEY}&redirect_uri=${UNSPLASH_REDIRECT_URI}&code=${code}&grant_type=authorization_code`,
      );
      const data: any = await response.json();

      res.setHeader(
        'Set-Cookie',
        serialize('access_token', data.access_token, {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7, // 1 week
        }),
      );

      res.redirect(
        307,
        process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://mintify.smakosh.com',
      );
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
