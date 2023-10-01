import { host } from "@/actions/fetch";
import { User, UserBody, UserPayload, UserState } from "@/types/user";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { decodeToken } from "react-jwt";

const defaultState: UserState = {
	user: null,
	isLoading: true,
	error: null,
};

export const getUser = (accessToken: string): User => {
	const decode: any = decodeToken(accessToken);
	return decode.user as User;
};

const refreshUser = createAsyncThunk("user/refresh", async (): Promise<UserPayload> => {
	const { data } = await host.get("/auth/refresh");
	if (data.error) {
		localStorage.removeItem("accessToken");
		return { user: null, error: null };
	}
	localStorage.setItem("accessToken", data.accessToken);
	return { user: getUser(data.accessToken), error: null };
});

const loginUser = createAsyncThunk("user/login", async (user: UserBody): Promise<UserPayload> => {
	const { data } = await host.post("/auth/login", user);
	if (data.accessToken) {
		localStorage.setItem("accessToken", data.accessToken);
		return { user: getUser(data.accessToken), error: null };
	}
	return { user: null, error: data.error };
});

const registerUser = createAsyncThunk("user/register", async (user: UserBody): Promise<UserPayload> => {
	const { data } = await host.post("/auth/register", user);
	if (data.accessToken) {
		localStorage.setItem("accessToken", data.accessToken);
		return { user: getUser(data.accessToken), error: null };
	}
	return { user: null, error: data.error };
});

const logoutUser = createAsyncThunk("user/logout", async (): Promise<UserPayload> => {
	await host.get("/auth/logout");
	localStorage.removeItem("accessToken");
	return { user: null, error: null };
});

export const userSlice = createSlice({
	name: "user",
	initialState: defaultState,
	reducers: {
		setUser: (state: UserState, action: PayloadAction<User | null>) => {
			state.user = action.payload;
			state.isLoading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(refreshUser.pending, (state: UserState) => {
				state.isLoading = true;
			})
			.addCase(refreshUser.fulfilled, (state: UserState, action: PayloadAction<UserPayload>) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.error = action.payload.error;
			})
			.addCase(loginUser.pending, (state: UserState) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state: UserState, action: PayloadAction<UserPayload>) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.error = action.payload.error;
			})
			.addCase(registerUser.pending, (state: UserState) => {
				state.isLoading = true;
			})
			.addCase(registerUser.fulfilled, (state: UserState, action: PayloadAction<UserPayload>) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.error = action.payload.error;
			})
			.addCase(logoutUser.pending, (state: UserState) => {
				state.isLoading = true;
			})
			.addCase(logoutUser.fulfilled, (state: UserState, action: PayloadAction<UserPayload>) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.error = action.payload.error;
			});
	},
});

export const userActions = { ...userSlice.actions, refreshUser, registerUser, loginUser, logoutUser };
export default userSlice.reducer;
