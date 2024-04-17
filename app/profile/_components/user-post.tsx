"use client";

import { deleteBlog } from "@/actions/blog/delete";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Blog } from "@prisma/client";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface UserPostProps {
	blog: Pick<Blog, "id" | "category" | "title" | "slug">;
}

export default function UserPost({
	blog: { id, category, slug, title },
}: UserPostProps) {
	function handleBlogDeletion() {
		deleteBlog(id)
			.then((data) => {
				if (data && data.error) {
					toast.error(data.error, {
						description:
							data.error === "Not authenticated"
								? "Please login to continue"
								: data.error === "Unauthorized"
								? "You don't have permission for this action"
								: "An error occurred",
					});
				}
			})
			.catch((err) => {
				toast.error("Error occurred", {
					description: "Something went wrong",
				});
			});
	}

	return (
		<div className="flex gap-2 items-center justify-between w-full p-2 bg-slate-50">
			<h1 className="text-2xl sm:text-lg font-sans font-bold">
				<Link href={`/blogs/${slug}`}>
					{title.substring(0, 15).trim()}...
				</Link>
			</h1>
			<div className="w-fit text-right ml-auto pr-2 sm:hidden">
				<Badge className="font-sans">
					{category.slice(0, 1).toUpperCase() + category.slice(1)}
				</Badge>
			</div>
			<div className="flex gap-3 items-center text-slate-500 sm:text-sm">
				<Button variant={"secondary"} size={"sm"}>
					<Link href={`/blogs/${slug}/edit`}>
						<Edit size={16} />
					</Link>
				</Button>
				<Button
					variant={"destructive"}
					size={"sm"}
					onClick={handleBlogDeletion}
				>
					<Trash2 size={16} />
				</Button>
			</div>
		</div>
	);
}
