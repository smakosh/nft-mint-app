import toast from 'react-hot-toast';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import axios from 'axios';
import { Dispatch } from 'redux';
import { ethers } from 'ethers';
import { UserState } from 'features/user/redux/userSlice';
import { ContractState, saveDeployedContract, updateNFTStatus } from 'features/unsplash/redux/contractSlice';
import NFTFactory from '../../../artifacts/contracts/NFTFactory.sol/NFTFactory.json';

export type ContractValues = {
  name: string;
  symbol: string;
};

export const deployContract = async (user: UserState, values: ContractValues, dispatch: Dispatch<any>) => {
  if (typeof window.ethereum !== 'undefined' && user.data?.address) {
    let signer;

    // Get the user signature if it's not saved on memory
    if (!user.data.signature) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
    }

    // Prepare contract facotry
    const factory = new ethers.ContractFactory(NFTFactory.abi, NFTFactory.bytecode, user.data.signature || signer);

    // Deploy the smart contract (ERC 721)
    const deployedContract = await factory.deploy(values.name, values.symbol);

    await deployedContract.deployed();

    dispatch(saveDeployedContract(deployedContract));
  }
};

export type MetadataNFT = {
  description: string;
  external_url: string;
  image: string;
  name: string;
};

export const createNFT = async (
  user: UserState,
  savedContract: ContractState,
  values: MetadataNFT,
  dispatch: Dispatch<any>,
) => {
  if (!savedContract.address && !savedContract.contract) {
    toast.error('No contract is attached');
    return null;
  }

  if (typeof window.ethereum !== 'undefined' && user.data?.address) {
    let signer;

    // Get the user signature if it's not saved on memory
    if (!user.data.signature) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
    }

    dispatch(updateNFTStatus('uploading to IPFS'));

    // Upload to IPFS
    const res: any = await axios.post('/api/ipfs/upload');

    const client = ipfsHttpClient({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: res.data.auth,
      },
    });

    // upload image to IPFS
    const blob = await fetch(values.image).then((r) => r.blob());

    const image = await client.add(blob);

    // upload the rest to IPFS
    const data = JSON.stringify({
      attributes: [],
      ...values,
      image: `https://ipfs.infura.io/ipfs/${image.path}`,
    });

    // Upload to IPFS (Look up for alternatives as data is not stored forever)
    const added = await client.add(data);
    const metadataUrl = `https://ipfs.infura.io/ipfs/${added.path}`;

    let contract: ethers.Contract;

    dispatch(updateNFTStatus('Minting the NFT'));
    // Mint the NFT using the deployed smart contract
    if (savedContract.address) {
      contract = new ethers.Contract(savedContract.address, NFTFactory.abi, user.data.signature || signer);
    } else {
      contract = new ethers.Contract(savedContract.contract.address, NFTFactory.abi, user.data.signature || signer);
    }

    dispatch(updateNFTStatus('Pending transaction'));
    // Token gets created
    const transaction = await contract.createToken(metadataUrl);
    await transaction.wait();

    dispatch(updateNFTStatus('Successfully minted!'));

    setTimeout(() => {
      dispatch(updateNFTStatus(null));
    }, 2000);

    toast.success('NFT created successfully');
  }
};
