import toast from 'react-hot-toast';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import axios from 'axios';
import { Dispatch } from 'redux';
import { ethers } from 'ethers';
import { ContractState, saveDeployedContract, updateNFTStatus } from 'features/unsplash/redux/contractSlice';
import NFTFactory from '../../../artifacts/contracts/NFTFactory.sol/NFTFactory.json';

export type ContractValues = {
  name: string;
  symbol: string;
};

type DeployContractArgs = {
  signer: any; // FetchSignerResult | undefined
  values: ContractValues;
  dispatch: Dispatch<any>;
};

export const deployContract = async ({ signer, values, dispatch }: DeployContractArgs) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();

  // Prepare contract facotry
  const factory = new ethers.ContractFactory(NFTFactory.abi, NFTFactory.bytecode, signer);

  // Deploy the smart contract (ERC 721)
  const deployedContract = await factory.deploy(values.name, values.symbol);

  await deployedContract.deployed();

  dispatch(saveDeployedContract(deployedContract));
};

export type MetadataNFT = {
  description: string;
  external_url: string;
  image: string;
  name: string;
};

type CreateNFTArgs = {
  signer: any; // FetchSignerResult | undefined
  savedContract: ContractState;
  values: MetadataNFT;
  dispatch: Dispatch<any>;
};

export const createNFT = async ({ signer, savedContract, values, dispatch }: CreateNFTArgs) => {
  if (!savedContract.address && !savedContract.contract) {
    toast.error('No contract is attached');
    return null;
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
    contract = new ethers.Contract(savedContract.address, NFTFactory.abi, signer);
  } else {
    contract = new ethers.Contract(savedContract.contract.address, NFTFactory.abi, signer);
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
};
