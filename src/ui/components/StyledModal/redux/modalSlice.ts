import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalTypes = "metadata" | "contract";
export interface ModalState {
	isOpen: boolean;
	type?: ModalTypes;
}

const initialState: ModalState = {
	isOpen: false,
};

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		setModal: (
			state,
			action: PayloadAction<Pick<ModalState, "isOpen"> & { type: ModalTypes }>
		) => {
			state.type = action.payload.type;
			state.isOpen = action.payload.isOpen;
		},
		closeModal: (state) => {
			state.isOpen = false;
		},
	},
});

export const { setModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
