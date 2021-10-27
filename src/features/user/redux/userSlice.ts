import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ethers } from "ethers";

type UserData = {
	address: string;
	network: string;
	shortAddress: string | null | undefined;
	signature: ethers.providers.JsonRpcSigner | null;
};

export interface UserState {
	isLoggedIn: boolean;
	isLoading: boolean;
	data: UserData | null;
}

const initialState: UserState = {
	isLoggedIn: false,
	isLoading: true,
	data: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		save: (state, action: PayloadAction<UserData>) => {
			state.data = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		clear: (state) => {
			state.data = null;
		},
	},
});

export const { save, setLoading, clear } = userSlice.actions;

export default userSlice.reducer;
