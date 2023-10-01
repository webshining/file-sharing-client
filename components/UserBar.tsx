"use client";

import { useActions, useAppSelector } from "@/actions/hooks/redux";
import { useEffect, useRef, useState } from "react";

const UserBar = () => {
	const userbarRef = useRef<any>(null);
	const [isActive, setIsActive] = useState<boolean>(false);
	const { user } = useAppSelector((state) => state.user);
	const { logoutUser, setUser } = useActions();
	useEffect(() => {
		setIsActive(false);
	}, [user]);
	const logout = () => {
		const userbar = document.querySelector(".userbar");
		const links = document.querySelector(".links");

		userbar!.classList.add("disappearance");
		links!.classList.add("disappearance");

		setTimeout(() => {
			setUser(null);
			localStorage.removeItem("accessToken");
			logoutUser();
		}, 800);
	};
	useEffect(() => {
		const onClick = (e: any) => userbarRef.current.contains(e.target) || setIsActive(false);
		document.addEventListener("click", onClick);
		return () => document.removeEventListener("click", onClick);
	}, []);
	return (
		<div className={`userbar ${isActive ? "active" : ""}`} ref={userbarRef}>
			{user && (
				<>
					<div className="userbar__name" onClick={() => setIsActive(!isActive)}>
						{user.name}
					</div>
					<ul className="userbar__menu">
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
