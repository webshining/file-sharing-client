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
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
					/>
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
