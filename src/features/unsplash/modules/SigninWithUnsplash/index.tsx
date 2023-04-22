import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { UNSPLASH_ACCESS_KEY, UNSPLASH_REDIRECT_URI } from 'config';

const SigninWithUnsplash = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');

  if (accessToken) {
    redirect('/');
  }

  const handleLogin = () => {
    window.location.href = `https://unsplash.com/oauth/authorize?client_id=${UNSPLASH_ACCESS_KEY}&redirect_uri=${UNSPLASH_REDIRECT_URI}&response_type=code&scope=public`;
  };

  return (
    <div className="mb-8">
      <h1 className="mb-5 text-xl">Login with Unsplash to continue</h1>
      <button
        type="button"
        onClick={handleLogin}
        className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded dark:bg-white dark:text-black dark:hover:bg-gray-800 transition-all ease-in-out duration-300"
      >
        Login with Unsplash
      </button>
    </div>
  );
};

export default SigninWithUnsplash;
