import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ethers } from "ethers";

export interface ContractState {
	contract: any | null;
	address: string | null;
}

const initialState: ContractState = {
	contract: null,
	address: null,
};

export const contractSlice = createSlice({
	name: "contract",
	initialState,
	reducers: {
		saveDeployedContract: (state, action: PayloadAction<ethers.Contract>) => {
			state.contract = action.payload;
		},
		saveContractAddress: (state, action: PayloadAction<string>) => {
			state.address = action.payload;
		},
	},
});

export const { saveContractAddress, saveDeployedContract } =
	contractSlice.actions;

export default contractSlice.reducer;
