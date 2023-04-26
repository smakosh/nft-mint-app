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
        {collections.map(({ id, title, cover_photo, user }) => (
          <Link key={id} href={`/collection/${id}`} className="w-full h-full block">
            <Card photo={cover_photo.urls.regular} title={title} alt={title} user={user} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Collections;
