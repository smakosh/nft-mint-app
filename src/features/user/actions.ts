import toast from 'react-hot-toast';
import { ethers } from 'ethers';
import { Dispatch } from 'redux';
import { clear, save, setLoading } from 'features/user/redux/userSlice';
import getShortAddress from 'helpers/getShortAddress';
import connectWallet, { getWeb3Modal } from 'utils/connectWallet';

export const requestAccount = async (dispatch: Dispatch<any>) => {
  if (window.ethereum) {
    try {
      dispatch(setLoading(true));
      const { provider } = await connectWallet();

      const { name } = await provider.getNetwork();

      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);

      let ethENS = undefined;

      try {
        ethENS = await provider?.lookupAddress(address);
      } catch (error) {
        ethENS = undefined;
      }

      dispatch(
        save({
          address,
          shortAddress: getShortAddress(address),
          ethENS,
          network: name,
          signature: signer,
          balance: Number(ethers.utils.formatEther(balance)).toFixed(4),
          symbol: name === 'matic' ? 'MATIC' : ethers.constants.EtherSymbol,
        }),
      );

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  } else {
    toast.error('Please Install MetaMask');
    dispatch(setLoading(false));
  }
};

export const disconnectWallet = async (dispatch: Dispatch<any>) => {
  const web3Modal = getWeb3Modal();

  web3Modal.clearCachedProvider();
  dispatch(clear());
};
