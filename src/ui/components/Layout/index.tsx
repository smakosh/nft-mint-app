import axios from 'axios';
import { useDisconnect } from 'wagmi';
import { useRouter } from 'next/router';
import Navbar from 'ui/components/Navbar';
import Footer from 'ui/components/Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { disconnect } = useDisconnect();

  const handleLogout = async () => {
    const { data } = await axios.get<{ message: string }>('/api/unsplash/logout');

    if ((data.message = 'Logout successful')) {
      disconnect();
      router.push('/signin');
    }
  };

  return (
    <div className="container mx-auto">
      <Navbar handleLogout={handleLogout} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
