import { GetServerSideProps } from 'next';
import cookie from 'cookie';
import SEO from 'utils/SEO';
import GoBack from 'ui/components/GoBack';
import Layout from 'ui/components/Layout';
import Collection, { CollectionProps } from 'features/unsplash/modules/Collection';

const CollectionPage = ({ photos, collection }: CollectionProps) => (
  <Layout>
    <SEO title={collection.title} url={`/collection/${collection.id}`} />
    <GoBack link="/" />
    <Collection photos={photos} collection={collection} />
  </Layout>
);

export const getServerSideProps: GetServerSideProps = async (ctx): Promise<any> => {
  const cookies = cookie.parse(ctx.req.headers.cookie || '');
  const accessToken = cookies.access_token;

  if (accessToken && ctx.params?.id) {
    const headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const response = await fetch(`https://api.unsplash.com/collections/${ctx.params.id}/photos?page=1`, headers);
    const photos = await response.json();

    const res = await fetch(`https://api.unsplash.com/collections/${ctx.params.id}`, headers);
    const collection = await res.json();

    return {
      props: {
        photos,
        collection,
      },
    };
  }

  return {
    redirect: {
      destination: '/signin',
    },
  };
};

export default CollectionPage;
