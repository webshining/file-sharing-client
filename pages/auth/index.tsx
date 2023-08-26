import { useRouter } from "next/router";
import { useEffect } from "react";

const Auth = () => {
	const { push } = useRouter();
	useEffect(() => {
		push("/auth/login");
	}, []);
	return null;
};

export default Auth;
