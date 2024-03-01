import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import NavBar from "@/components/header/navbar";

const openSans = Open_Sans({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <div className="px-[6rem] md:px-2 w-[90rem] lg:w-auto mx-auto">
            <NavBar />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
