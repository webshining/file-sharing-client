import { useAppSelector } from "@/hooks/redux";
import Notification from "./Notification";

const Notifications = () => {
	const { notifications } = useAppSelector((state) => state.notifications);
	return (
		<div className="notifications">
			{notifications.map((notification) => (
				<Notification key={notification.id} {...notification} />
			))}
		</div>
	);
};

export default Notifications;
