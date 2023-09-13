"use client";

import { useAppSelector } from "@/actions/hooks/redux";
import AuthContent from "@/components/AuthCotent";
import LinksContent from "@/components/LinksContent";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
	const { push } = useRouter();
	const { user, isLoading } = useAppSelector((state) => state.user);
	useEffect(() => {
		if (!isLoading && !user) push("/auth");
	}, [user, isLoading]);
	return isLoading ? <></> : user ? <LinksContent /> : <AuthContent />;
};

export default Home;
