import Notifications from "@/components/Notifications";
import { store } from "@/storage";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/style.scss";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Notifications />
			<Component {...pageProps} />
		</Provider>
	);
}
