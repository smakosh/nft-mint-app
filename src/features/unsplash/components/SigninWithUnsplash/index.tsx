'use client';

import { UNSPLASH_ACCESS_KEY, UNSPLASH_REDIRECT_URI } from 'config';
import Footer from 'ui/components/Footer';
import ThemeSwitcher from 'ui/components/ThemeSwitcher';

const SigninWithUnsplash = () => {
  const handleLogin = () => {
    window.location.href = `https://unsplash.com/oauth/authorize?client_id=${UNSPLASH_ACCESS_KEY}&redirect_uri=${UNSPLASH_REDIRECT_URI}&response_type=code&scope=public`;
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="self-center w-auto mx-auto text-center flex justify-between flex-col h-96">
        <div className="mb-40">
          <div className="mb-20">
            <h2 className="w-1/2 mx-auto my-6 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-purple-900">
              Fetch and mint your Unsplash shots easily, then decide where to list them!
            </h2>
            <p className="text-sm italic text-gray-500 dark:text-gray-400">Instagram & Dribbble coming soon</p>
          </div>
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
          <ThemeSwitcher />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default SigninWithUnsplash;
