"use client";

import { store } from "@/storage";
import { Provider } from "react-redux";
import AuthProvider from "./AuthProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={store}>
			<AuthProvider>{children}</AuthProvider>
		</Provider>
	);
};

export default Providers;
