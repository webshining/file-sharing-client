import { NotificationPayload, NotificationsState } from "@/types/notification";
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
			state.notifications = [
				{ id: v4(), ...action.payload },
				...(state.notifications.length >= 3 ? state.notifications.slice(0, 2) : state.notifications),
			];
		},
		removeNotification: (state: NotificationsState, action: PayloadAction<{ id: string }>) => {
			state.notifications = state.notifications.filter((n) => n.id !== action.payload.id);
		},
	},
});

export const notificationsActions = notificationsSlice.actions;
export default notificationsSlice.reducer;
