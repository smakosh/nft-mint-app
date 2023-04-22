import { NextResponse } from 'next/server';
import { INFURA_IPFS_PROJECT_ID, INFURA_IPFS_PROJECT_SECRET } from 'config';

export const runtime = 'edge';

export async function POST() {
  const auth = 'Basic ' + Buffer.from(`${INFURA_IPFS_PROJECT_ID}:${INFURA_IPFS_PROJECT_SECRET}`).toString('base64');

  return NextResponse.json({ auth });
}
