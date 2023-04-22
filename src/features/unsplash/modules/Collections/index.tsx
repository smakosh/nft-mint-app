import Link from 'next/link';
import { redirect } from 'next/navigation';
import Card from 'ui/components/Card';
import getCollections from 'features/unsplash/services/getCollections';

const Collections = async () => {
  const collections = await getCollections();

  if (!collections) {
    redirect('/signin');
  }

  return (
    <section className="pt-8 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {collections.map(({ id, title, cover_photo }) => (
          <div key={id}>
            <Link href={`/collection/${id}`} className="w-full h-full">
              <Card photo={cover_photo.urls.regular} title={title} alt={title} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collections;
