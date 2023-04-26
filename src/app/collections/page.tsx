import Navbar from 'ui/components/Navbar';
import Collections from 'features/unsplash/modules/Collections';

const page = () => (
  <>
    <Navbar />
    {/* @ts-expect-error Async Server Component */}
    <Collections />
  </>
);

export default page;
