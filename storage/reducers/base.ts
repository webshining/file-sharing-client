import { authHost } from "@/actions/fetch";
import { BaseQueryFn } from "@reduxjs/toolkit/dist/query";

import { Mutex } from "async-mutex";
import { AxiosRequestConfig } from "axios";
import { userActions } from "./user";

const { logoutUser, refreshUser } = userActions;
const mutex = new Mutex();

export const axiosBaseQuery: BaseQueryFn<AxiosRequestConfig, unknown, unknown> = async (args, api) => {
	args.url = String(process.env.API_URL) + args.url;
	await mutex.waitForUnlock();
	let result = await authHost(args);
	if (result.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult: any = (await api.dispatch(refreshUser())).payload;
				if (refreshResult.user) result = await authHost(args);
				else api.dispatch(logoutUser());
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await authHost(args);
		}
	}
	return { data: result.data };
};
