import { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import NavBar from "@/components/header/navbar";
import { Toaster } from "sonner";

const openSans = Open_Sans({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
	title: "Next.js Blog App",
	description: "Write and learn.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={openSans.className}>
				<Provider>
					<div className="px-[6rem] lg:px-2 w-[90rem] lg:w-auto mx-auto">
						<Toaster richColors className="z-50" />
						<NavBar />
						{children}
					</div>
				</Provider>
			</body>
		</html>
	);
}
