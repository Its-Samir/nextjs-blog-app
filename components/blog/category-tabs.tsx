"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CategoryTabs() {
	const searchParams = useSearchParams();
	const categoryParam = searchParams.get("category");

	const router = useRouter();

	const categories = [
		{ name: "Design" },
		{ name: "Accounting" },
		{ name: "Health" },
		{ name: "Development" },
	];

	function handleClick(searchTerm: string) {
		router.push(`/blogs?category=${searchTerm}`);
	}

	return (
		<div className="flex items-center flex-wrap p-2 rounded-full justify-center md:justify-normal gap-3">
			{categories.map((category) => (
				<Button
					key={category.name}
					size={"sm"}
					variant={`${
						categoryParam === category.name.toLowerCase()
							? "default"
							: "outline"
					}`}
					className="rounded-full px-5"
					onClick={() => handleClick(category.name.toLowerCase())}
				>
					{category.name}
				</Button>
			))}
		</div>
	);
}
