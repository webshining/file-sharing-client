import { AppDispatch, RootState } from "@/storage";
import { userActions } from "@/storage/reducers/user";
import { bindActionCreators } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { notificationsActions } from "./../../storage/reducers/notifications";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
	const dispatch = useAppDispatch();
	return bindActionCreators({ ...userActions, ...notificationsActions }, dispatch);
};
