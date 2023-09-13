"use client";

import { useActions } from "@/actions/hooks/redux";
import { Notification } from "@/types/notification";
import { useEffect, useState } from "react";

const NotificationItem = (props: Notification) => {
	const [exit, setExit] = useState<boolean>(false);
	const { removeNotification } = useActions();
	useEffect(() => {
		setTimeout(() => {
			setExit(true);
		}, 5000);
		setTimeout(() => {
			removeNotification({ id: props.id });
		}, 5800);
	}, []);
	return <div className={`notifications__item ${exit ? "exit" : ""}`}>{props.text}</div>;
};

export default NotificationItem;
