"use client";

import { isTokenExpired } from "@/actions/fetch";
import { useActions } from "@/actions/hooks/redux";
import { getUser } from "@/storage/reducers/user";
import { ReactNode, useEffect } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { refreshUser, setUser } = useActions();
	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			if (isTokenExpired(token)) refreshUser();
			else setUser(getUser(token));
		} else {
			setUser(null);
		}
	}, []);
	return children;
};

export default AuthProvider;
