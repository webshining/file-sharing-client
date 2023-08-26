import { configureStore } from "@reduxjs/toolkit";
import notificationsReducer from "./reducers/notifications";
import userReducer from "./reducers/user";

export const store = configureStore({
	reducer: {
		user: userReducer,
		notifications: notificationsReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
