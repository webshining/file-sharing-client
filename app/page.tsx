"use client";

import { useAppSelector } from "@/actions/hooks/redux";
import LinksContent from "@/components/LinksContent";
import usePush from "@/components/Push";
import UserBar from "@/components/UserBar";
import { useEffect } from "react";

const Home = () => {
	const push = usePush();
	const { user, isLoading } = useAppSelector((state) => state.user);
	useEffect(() => {
		if (!isLoading && !user) push("/auth");
	}, [isLoading, user]);
	return isLoading ? (
		<></>
	) : (
		user && (
			<>
				<UserBar />
				<LinksContent />
			</>
		)
	);
};

export default Home;
