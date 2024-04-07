"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export default function TabHandlerButtons() {
	const searchParams = useSearchParams();
	const tab = searchParams.get("tab");
	const router = useRouter();

	const tabs: { name: string; path: string }[] = [
		{ name: "Account", path: "account" },
		{ name: "Posts", path: "posts" },
		{ name: "Settings", path: "settings" },
	];

	function handleTabNavigation(path: string) {
		if (path === tab) {
			router.push(`/profile/me`);
		} else {
			router.push(`?tab=${path}`);
		}
	}

	return tabs.map((t) => (
		<Button
			key={t.path}
			onClick={() => handleTabNavigation(t.path)}
			variant={t.path === tab ? "default" : "outline"}
			size={"sm"}
		>
			{t.name}
		</Button>
	));
}
