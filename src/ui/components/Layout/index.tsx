import { FC, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ethers } from 'ethers';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'utils/store';
import Navbar from 'ui/components/Navbar';
import Footer from 'ui/components/Footer';
import { requestAccount, disconnectWallet } from 'features/user/actions';

const Layout: FC = ({ children }) => {
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!user.data?.address) {
      requestAccount(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');

      provider.on('network', (_newNetwork, oldNetwork) => {
        if (oldNetwork) {
          window.location.reload();
        }
      });
    }
  }, []);

  const handleLogout = async () => {
    const { data } = await axios.get<{ message: string }>('/api/unsplash/logout');

    if ((data.message = 'Logout successful')) {
      disconnectWallet(dispatch);
      router.push('/signin');
    }
  };

  return (
    <div className="container mx-auto">
      {process.browser && hasMounted && !user.isLoading ? (
        <Navbar
          address={user.data?.address}
          balance={user.data?.balance}
          shortAddress={user.data?.shortAddress}
          network={user.data?.network}
          symbol={user.data?.symbol}
          ethENS={user.data?.ethENS}
          signIn={() => requestAccount(dispatch)}
          handleLogout={handleLogout}
          disconnectWallet={() => disconnectWallet(dispatch)}
        />
      ) : (
        <div className="flex items-center justify-end py-4 text-right">
          <div className="animate-pulse">
            <div className="inline-flex justify-end w-full px-4 py-2">
              <div className="w-36 bg-gray-300 h-9 rounded-md" />
            </div>
          </div>
          <div className="animate-pulse">
            <div className="inline-flex justify-end w-full px-4 py-2">
              <div className="w-28 bg-gray-300 h-9 rounded-md" />
            </div>
          </div>
        </div>
      )}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
