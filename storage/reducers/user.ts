import { User, UserState } from "@/types/user.type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const defaultState: UserState = {
	user: null,
};

const userSlice = createSlice({
	name: "user",
	initialState: defaultState,
	reducers: {
		setUser: (state: UserState, action: PayloadAction<User>) => {
			state.user = action.payload;
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
