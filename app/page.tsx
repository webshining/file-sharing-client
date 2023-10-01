"use client";

import { useAppSelector } from "@/actions/hooks/redux";
import LinksContent from "@/components/LinksContent";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
	const { push } = useRouter();
	const { user, isLoading } = useAppSelector((state) => state.user);
	useEffect(() => {
		if (!isLoading && !user) push("/auth");
	}, [isLoading, user]);
	return isLoading ? <></> : user && <LinksContent />;
};

export default Home;
