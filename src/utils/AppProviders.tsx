import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { store } from 'utils/store';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.polygonMumbai, chain.rinkeby],
  [infuraProvider({ infuraId: process.env.NEXT_PUBLIC_INFURA_API_KEY }), publicProvider()],
);
const { connectors } = getDefaultWallets({
  appName: 'Mintify',
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const AppProviders: React.FC = ({ children }) => (
  <ThemeProvider attribute="class">
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Provider store={store}>{children}</Provider>
      </RainbowKitProvider>
    </WagmiConfig>
  </ThemeProvider>
);

export default AppProviders;
