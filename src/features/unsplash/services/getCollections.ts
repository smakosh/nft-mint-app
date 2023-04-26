import 'server-only';

import { cookies } from 'next/headers';
import type { Collection } from 'types';

const getCollections = async (): Promise<Collection[] | undefined> => {
  const cookieStore = cookies();

  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return undefined;
  }

  const headers = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const meResponse = await fetch('https://api.unsplash.com/me', headers);

  if (!meResponse.ok) {
    return undefined;
  }

  const me = await meResponse.json();

  const collectionsResponse = await fetch(`https://api.unsplash.com/users/${me.username}/collections?page=1`, headers);

  if (!collectionsResponse.ok) {
    throw new Error('Failed to fetch collections');
  }

  const collections = await collectionsResponse.json();

  return collections;
};

export default getCollections;
