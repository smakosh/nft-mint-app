import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userSlice from "features/user/redux/userSlice";
import modalSlice from "ui/components/StyledModal/redux/modalSlice";

export const store = configureStore({
	reducer: {
		user: userSlice,
		modal: modalSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
