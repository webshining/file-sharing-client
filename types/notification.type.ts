export interface Notification {
	id: string;
	text: string;
	type: "ERROR" | "SUCCESS";
}

export interface NotificationsState {
	notifications: Notification[];
}

export interface NotificationPayload {
	text: string;
	type: "ERROR" | "SUCCESS";
}
