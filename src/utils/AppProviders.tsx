'use client';

import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import NextNProgress from 'nextjs-progressbar';
import { store } from 'utils/store';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, polygonMumbai, polygonZkEvmTestnet, goerli } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [mainnet, polygon, polygonMumbai, goerli, polygonZkEvmTestnet],
  [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY as string }), publicProvider()],
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

const AppProviders = ({ children }: { children: ReactNode }) => (
  <ThemeProvider attribute="class">
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <NextNProgress />
        <Provider store={store}>{children}</Provider>
        <Toaster position="top-center" reverseOrder={false} />
      </RainbowKitProvider>
    </WagmiConfig>
  </ThemeProvider>
);

export default AppProviders;
