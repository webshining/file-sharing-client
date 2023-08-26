import { useActions } from "@/hooks/redux";
import axios from "axios";
import { useEffect } from "react";

export default function Home() {
	const { setUser } = useActions();
	useEffect(() => {
		axios
			.get("https://webshining.server.com/api/auth/refresh", { withCredentials: true })
			.then(({ data }) => {
				setUser(data.user);
				localStorage.setItem("accessToken", data.accessToken);
			})
			.catch(({ response }) => {
				console.log(response.data);
			});
	});
	return <div>A</div>;
}
