"use client";

import { useActions, useAppSelector } from "@/actions/hooks/redux";
import { useEffect, useState } from "react";

const UserBar = () => {
	const [isActive, setIsActive] = useState<boolean>(false);
	const { user } = useAppSelector((state) => state.user);
	const { logoutUser, setUser } = useActions();
	useEffect(() => {
		setIsActive(false);
	}, [user]);
	const logout = () => {
		setUser(null);
		localStorage.removeItem("accessToken");
		logoutUser();
	};
	return (
		<div className="userbar">
			{user && (
				<>
					<div className="userbar__name" onClick={() => setIsActive(!isActive)}>
						{user.name}
					</div>
					<ul className={`userbar__menu${isActive ? " active" : ""}`}>
						<li className="userbar__menu_item" onClick={logout}>
							Logout
						</li>
					</ul>
				</>
			)}
		</div>
	);
};

export default UserBar;
