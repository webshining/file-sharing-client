export interface Notification {
	id: string;
	text: string;
	type: "ERROR" | "SUCCESS" | "INFO";
}

export interface NotificationsState {
	notifications: Notification[];
}

export interface NotificationPayload {
	text: string;
	type: "ERROR" | "SUCCESS" | "INFO";
}
