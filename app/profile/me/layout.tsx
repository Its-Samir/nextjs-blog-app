"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import TabHandlerButtons from "../_components/tab-handler-buttons";

export default function DashboardLayout({
	children,
	account,
	settings,
}: {
	children: React.ReactNode;
	account: React.ReactNode;
	settings: React.ReactNode;
}) {
	const searchParams = useSearchParams();
	const tab = searchParams.get("tab");

	return (
		<div className="w-[40rem] mx-auto md:w-auto">
			<Card className="flex flex-col gap-4 border-0 border-b shadow-none py-2 rounded-none">
				<Avatar className="w-[5rem] h-[5rem]">
					<AvatarImage src="" alt="" />
					<AvatarFallback>U</AvatarFallback>
				</Avatar>
				<div className="flex items-end gap-4 justify-between text-slate-500">
					<div className="flex flex-col gap-2 justify-end">
						<span className="text-slate-700 font-semibold">Username</span>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Fugit molestiae dolor odit necessitatibus optio. Fuga?
						</p>
						<div className="flex gap-2">
							<span>
								<b>0</b> following
							</span>
							<span>
								<b>0</b> followers
							</span>
						</div>
					</div>
					<Button size={"sm"} className="rounded-full">
						Follow
					</Button>
				</div>
			</Card>
			<div className="flex items-center gap-2 border-0 border-b my-2 py-2 rounded-none">
				<TabHandlerButtons />
			</div>
			{!tab && children}
			{tab === "account" && account}
			{tab === "settings" && settings}
		</div>
	);
}
