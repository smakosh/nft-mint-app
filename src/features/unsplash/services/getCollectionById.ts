import 'server-only';

import { cookies } from 'next/headers';
import type { Collection, CollectionPhoto } from 'types';

type GetCollectionByIdResponse = {
  collection: Collection;
  photos: CollectionPhoto[];
};

const getCollectionById = async (collectionId: string): Promise<GetCollectionByIdResponse | undefined> => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (!accessToken) {
    return undefined;
  }

  if (accessToken) {
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    // const meResponse = await fetch('https://api.unsplash.com/me', headers);

    // if (!meResponse.ok) {
    //   return undefined;
    // }

    const photosResponse = await fetch(`https://api.unsplash.com/collections/${collectionId}/photos?page=1`, {
      ...headers,
      next: { revalidate: 60 },
    });

    // if (!photosResponse.ok) {
    //   throw new Error('Failed to fetch photos');
    // }

    const photos = await photosResponse.json();

    const collectionResponse = await fetch(`https://api.unsplash.com/collections/${collectionId}`, {
      ...headers,
      next: { revalidate: 60 },
    });

    // if (!collectionResponse.ok) {
    //   throw new Error('Failed to fetch collections');
    // }

    const collection = await collectionResponse.json();

    return {
      photos,
      collection,
    };
  }
};

export default getCollectionById;
