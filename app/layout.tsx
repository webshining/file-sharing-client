import Notifications from "@/components/Notifications";
import Providers from "@/components/Providers";
import "@/styles/style.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "FileSharing",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<Providers>
			<html lang="en">
				<head>
					<title>FileSharing</title>
				</head>
				<body>
					<Notifications />
					<div className="content">{children}</div>
				</body>
			</html>
		</Providers>
	);
}
