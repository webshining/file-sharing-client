import axios from "axios";
import { isExpired } from "react-jwt";

const host = axios.create({
	baseURL: process.env.API_URL,
	withCredentials: true,
});

const authHost = axios.create({
	baseURL: process.env.API_URL,
	withCredentials: true,
});

authHost.interceptors.request.use(async (config) => {
	let accessToken = typeof window !== "undefined" && localStorage.getItem("accessToken");
	if (!accessToken || isExpired(accessToken)) {
		const { data } = await host.get("/auth/refresh");
		if (data.accessToken) {
			accessToken = data.accessToken;
			localStorage.setItem("accessToken", data.accessToken);
		} else {
			localStorage.removeItem("accessToken");
		}
	}
	config.headers.Authorization = `Bearer ${accessToken}`;
	return config;
});

export { authHost, host };
