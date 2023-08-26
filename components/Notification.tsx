import { useActions } from "@/hooks/redux";
import { Notification } from "@/types/notification.type";
import { useEffect } from "react";

const Notification = (props: Notification) => {
	const { id, text, type } = props;
	const { removeNotification } = useActions();
	const startTimeout = () => {
		setTimeout(() => {
			removeNotification({ id });
		}, 3000);
	};
	useEffect(() => {
		startTimeout();
	});
	return (
		<div className="notification__item">
			<div className="notification__item-text">{text}</div>
		</div>
	);
};

export default Notification;
