import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { INFURA_API_KEY } from 'config';

export const getWeb3Modal = () => {
  const web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: false,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: INFURA_API_KEY,
        },
      },
    },
  });

  return web3Modal;
};

const connectWallet = async () => {
  const web3Modal = getWeb3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const accounts = await provider.listAccounts();

  return {
    account: accounts[0],
    provider,
  };
};

export default connectWallet;
