"use client";

import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchBlog } from "@/actions/blog/search";
import { useFormState, useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

function FormButton() {
	const { pending } = useFormStatus();

	return (
		<Button size={"sm"} disabled={pending}>
			{pending ? <Loader2 className="animate-spin" /> : "Search"}
		</Button>
	);
}

export default function SearchBar() {
	const [state, action] = useFormState(searchBlog, { error: "" });
	const searchParams = useSearchParams();
	const query = searchParams.get("search");

	return (
		<form action={action}>
			<div className="my-4 flex items-center justify-center border p-2 rounded-md text-slate-500">
				<Search />
				<Input
					name="query"
					defaultValue={query || ""}
					placeholder="Search blogs"
					className="border-none focus-visible:ring-offset-0 focus:ring-0 focus-visible:ring-0"
				/>
				<FormButton />
			</div>
		</form>
	);
}
