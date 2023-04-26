import { redirect } from 'next/navigation';
import SigninWithUnsplash from 'features/unsplash/components/SigninWithUnsplash';
import getUser from 'features/unsplash/services/getUser';

const Signin = async () => {
  const user = await getUser();

  if (user) {
    redirect('/');
  }

  return <SigninWithUnsplash />;
};

export default Signin;
