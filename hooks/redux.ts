import { bindActionCreators } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../storage";
import { userActions } from "../storage/reducers/user";
import { notificationsActions } from "./../storage/reducers/notifications";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useActions = () => {
	const dispatch = useAppDispatch();
	return bindActionCreators({ ...userActions, ...notificationsActions }, dispatch);
};
