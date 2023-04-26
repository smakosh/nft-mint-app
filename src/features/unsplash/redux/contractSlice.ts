import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

type NFTStatus = 'uploading to IPFS' | 'Minting the NFT' | 'Pending transaction' | 'Successfully minted!' | undefined;

export interface ContractState {
  contract: any | undefined;
  address: `0x${string}` | undefined;
  nftStatus: NFTStatus;
}

const initialState: ContractState = {
  contract: undefined,
  address: undefined,
  nftStatus: undefined,
};

export const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    saveDeployedContract: (state, action: PayloadAction<ethers.Contract>) => {
      state.contract = action.payload;
    },
    saveContractAddress: (state, action: PayloadAction<`0x${string}`>) => {
      state.address = action.payload;
    },
    updateNFTStatus: (state, action: PayloadAction<NFTStatus>) => {
      state.nftStatus = action.payload;
    },
  },
});

export const { saveContractAddress, saveDeployedContract, updateNFTStatus } = contractSlice.actions;

export default contractSlice.reducer;
