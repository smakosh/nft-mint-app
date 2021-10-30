import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
	isOpen: boolean;
}

const initialState: ModalState = {
	isOpen: false,
};

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		setModal: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		},
	},
});

export const { setModal } = modalSlice.actions;

export default modalSlice.reducer;
