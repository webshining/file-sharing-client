"use client";

import { useAppSelector } from "@/actions/hooks/redux";
import NotificationItem from "./NotificationItem";

const Notifications = () => {
	const { notifications } = useAppSelector((state) => state.notifications);
	return (
		<div className="notifications">
			{notifications.map((n) => (
				<NotificationItem key={n.id} {...n} />
			))}
		</div>
	);
};

export default Notifications;
