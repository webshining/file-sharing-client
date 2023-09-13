import { configureStore } from "@reduxjs/toolkit";
import { linksApi } from "./reducers/links";
import notificationsReducer from "./reducers/notifications";
import userReducer from "./reducers/user";

export const store = configureStore({
	reducer: {
		user: userReducer,
		notifications: notificationsReducer,
		[linksApi.reducerPath]: linksApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(linksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
