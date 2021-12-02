import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ethers } from 'ethers';

export type UserData = {
  address: string | undefined;
  network: string | undefined;
  shortAddress: string | null | undefined;
  signature: ethers.providers.JsonRpcSigner | null;
  balance: string | undefined;
  symbol: string | undefined;
  ethENS?: string | undefined;
};

export interface UserState {
  isLoggedIn: boolean;
  isLoading: boolean;
  data: UserData | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  isLoading: false,
  data: null,
};

export const userSlice = createSlice({
  name: 'user',
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
