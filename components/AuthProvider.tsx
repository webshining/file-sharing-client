"use client";

import { useActions } from "@/actions/hooks/redux";
import { getUser } from "@/storage/reducers/user";
import { ReactNode, useEffect } from "react";
import { isExpired } from "react-jwt";

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { refreshUser, setUser } = useActions();
	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			if (isExpired(token)) refreshUser();
			else setUser(getUser(token));
		} else {
			setUser(null);
		}
	}, []);
	return children;
};

export default AuthProvider;
