"use client";

import { useActions } from "@/actions/hooks/redux";
import { ReactNode, useEffect } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { refreshUser } = useActions();
	useEffect(() => {
		refreshUser();
	}, []);
	return children;
};

export default AuthProvider;
