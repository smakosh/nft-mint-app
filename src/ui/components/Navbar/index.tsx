import { Fragment } from 'react';
import toast from 'react-hot-toast';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Menu, Transition } from '@headlessui/react';
import {
  CashIcon,
  ChevronDownIcon,
  ClipboardCopyIcon,
  GlobeAltIcon,
  LockClosedIcon,
  LogoutIcon,
} from '@heroicons/react/solid';
import { UserData } from 'features/user/redux/userSlice';
import ThemeSwitcher from '../ThemeSwitcher';

type NavbarProps = Pick<UserData, 'address' | 'balance' | 'network' | 'shortAddress' | 'symbol' | 'ethENS'> & {
  signIn: () => void;
  disconnectWallet: () => void;
  handleLogout: () => Promise<void>;
};

const Navbar = ({
  address,
  shortAddress,
  balance,
  network,
  signIn,
  symbol,
  ethENS,
  handleLogout,
  disconnectWallet,
}: NavbarProps) => (
  <div className="py-4 text-right">
    <div className="flex items-center justify-end">
      {address ? (
        <Menu as="div" className="relative inline-block text-right mr-2">
          <div>
            <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-purple-800 rounded-md bg-opacity-90 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              {ethENS || shortAddress}
              <ChevronDownIcon
                className="w-5 h-5 ml-2 -mr-1 text-purple-200 hover:text-purple-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="z-10 absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <CopyToClipboard text={address} onCopy={() => toast.success('Copied to clipboard!')}>
                      <button
                        type="button"
                        className={`${
                          active ? 'bg-purple-500 text-white' : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <ClipboardCopyIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                        Copy address
                      </button>
                    </CopyToClipboard>
                  )}
                </Menu.Item>
                {balance && (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        className={`${
                          active ? 'bg-purple-500 text-white' : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        <CashIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                        Balance: {balance} {symbol}
                      </button>
                    )}
                  </Menu.Item>
                )}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`${
                        active ? 'bg-purple-500 text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                    >
                      <GlobeAltIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                      Network: {network}
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      className={`${
                        active ? 'bg-purple-500 text-white' : 'text-gray-900'
                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      onClick={disconnectWallet}
                    >
                      <LockClosedIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                      Disconnect
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          type="button"
          onClick={signIn}
        >
          Connect Wallet
        </button>
      )}
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
