import { serialize } from 'cookie';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  return NextResponse.json(
    { message: 'Logout successful' },
    {
      headers: {
        'Set-Cookie': serialize('access_token', '', {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 0, // expires,
          expires: new Date(0),
        }),
      },
    },
  );
}
