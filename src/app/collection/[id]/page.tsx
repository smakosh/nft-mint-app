import Navbar from 'ui/components/Navbar';
import CollectionById from 'features/unsplash/modules/CollectionById';

const page = ({ params }: any) => (
  <>
    <Navbar />
    {/* @ts-expect-error Async Server Component */}
    <CollectionById id={params.id} />
  </>
);

export default page;
