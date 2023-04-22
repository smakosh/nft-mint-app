import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import { UNSPLASH_ACCESS_KEY, UNSPLASH_REDIRECT_URI, UNSPLASH_SECRET_KEY } from 'config';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    const unsplashResponse = await fetch(
      `https://unsplash.com/oauth/token?client_id=${UNSPLASH_ACCESS_KEY}&client_secret=${UNSPLASH_SECRET_KEY}&redirect_uri=${UNSPLASH_REDIRECT_URI}&code=${code}&grant_type=authorization_code`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!unsplashResponse.ok) {
      return new Response(null, { status: 401 });
    }

    const data: any = await unsplashResponse.json();

    return NextResponse.redirect(new URL('/collections', request.url), {
      headers: {
        'Set-Cookie': serialize('access_token', data.access_token, {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7, // 1 week
        }),
      },
    });
  } else {
    return new Response(null, { status: 401 });
  }
}
