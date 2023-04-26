import { redirect } from 'next/navigation';
import getCollectionById from 'features/unsplash/services/getCollectionById';
import Collection from 'features/unsplash/modules/Collection';

const CollectionById = async ({ id }: any) => {
  const collectionById = await getCollectionById(id);

  if (!collectionById) {
    redirect('/404');
  }

  const photos = collectionById.photos;
  const collection = collectionById.collection;

  return <Collection photos={photos} collection={collection} />;
};

export default CollectionById;
