'use client';

import { useDisconnect } from 'wagmi';
import { useRouter } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/solid';
import ThemeSwitcher from 'ui/components/ThemeSwitcher';

const Navbar = () => {
  const router = useRouter();
  const { disconnect } = useDisconnect();

  const handleLogout = async () => {
    await fetch('/api/logout');

    disconnect();
    router.push('/signin');
  };

  return (
    <div className="py-4 text-right container mx-auto">
      <div className="flex items-center justify-end">
        <ConnectButton />
        <ThemeSwitcher />
        <button
          onClick={handleLogout}
          type="button"
          className="ml-2 inline-flex justify-center  px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md bg-opacity-90 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Logout
          <ArrowLeftOnRectangleIcon
            className="w-5 h-5 ml-2 -mr-1 text-gray-200 hover:text-gray-100"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
