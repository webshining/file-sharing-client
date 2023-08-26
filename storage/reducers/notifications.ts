import { NotificationPayload, NotificationsState } from "@/types/notification.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

const defaultState: NotificationsState = {
	notifications: [],
};

const notificationsSlice = createSlice({
	name: "notifications",
	initialState: defaultState,
	reducers: {
		addNotification: (state: NotificationsState, action: PayloadAction<NotificationPayload>) => {
			state.notifications = [{ ...action.payload, id: v4() }, ...state.notifications];
		},
		removeNotification: (state: NotificationsState, action: PayloadAction<{id: string}>) => {
			state.notifications = state.notifications.filter(notification => notification.id !== action.payload.id)
		}
	},
});

export const notificationsActions = notificationsSlice.actions;
export default notificationsSlice.reducer;
