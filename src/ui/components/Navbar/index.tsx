import { LogoutIcon } from '@heroicons/react/solid';
import ThemeSwitcher from 'ui/components/ThemeSwitcher';
import { ConnectButton } from '@rainbow-me/rainbowkit';

type NavbarProps = { handleLogout: () => Promise<void> };

const Navbar = ({ handleLogout }: NavbarProps) => (
  <div className="py-4 text-right">
    <div className="flex items-center justify-end">
      <ConnectButton />
      <ThemeSwitcher />
      <button
        onClick={handleLogout}
        className="ml-2 inline-flex justify-center  px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md bg-opacity-90 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Logout
        <LogoutIcon className="w-5 h-5 ml-2 -mr-1 text-gray-200 hover:text-gray-100" aria-hidden="true" />
      </button>
    </div>
  </div>
);

export default Navbar;
