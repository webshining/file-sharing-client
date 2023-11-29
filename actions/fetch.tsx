import axios from "axios";

export const host = axios.create({
	baseURL: process.env.API_URL,
	withCredentials: true,
});

export const authHost = axios.create({
	baseURL: process.env.API_URL,
	withCredentials: true,
});

authHost.interceptors.request.use(async (config) => {
	let token = typeof window !== "undefined" && localStorage.getItem("accessToken");
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

host.interceptors.response.use(
	(res) => {
		return res;
	},
	(err) => {
		return err.response;
	}
);

authHost.interceptors.response.use(
	(res) => {
		return res;
	},
	(err) => {
		return err.response;
	}
);
