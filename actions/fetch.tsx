import axios from "axios";
import jwt from "jsonwebtoken";

const isTokenExpired = (token: string) => {
	const decode: any = jwt.decode(token);
	const dateNow = new Date();
	return decode.exp * 1000 < dateNow.getTime();
};

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
	if (!accessToken || isTokenExpired(accessToken)) {
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

export { authHost, host, isTokenExpired };
