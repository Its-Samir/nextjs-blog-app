import { Blog } from "@prisma/client";
import { Card, CardFooter, CardTitle } from "../ui/card";
import { Lightbulb } from "lucide-react";
import Link from "next/link";

type BlogData = Pick<Blog, "category" | "slug" | "title" | "likes"> & {
	comments: number;
};

export default function SideBarBlog({
	title,
	slug,
	category,
	likes,
	comments,
}: BlogData) {
	return (
		<Card className="w-full shadow-none text-slate-700 p-3 flex flex-col gap-2 rounded-none border-0 border-l-blue-500 border-l border-b my-2">
			<div className="flex gap-1 items-center">
				<Lightbulb size={12} absoluteStrokeWidth />
				<span className="text-sm sm:text-xs text-slate-500 font-sans font-bold">
					{category.slice(0, 1).toUpperCase() + category.slice(1)}
				</span>
			</div>
			<CardTitle className="text-neutral-600 text-lg sm:text-base font-sans font-bold">
				<Link href={`/blogs/${slug}`}>{title}</Link>
			</CardTitle>
			<CardFooter className="p-0 gap-1 text-neutral-800 font-sans text-sm sm:text-xs">
				<span className="px-2 bg-slate-200 rounded-sm">Likes</span>
				<span>{likes.length}</span>
				<span className="px-2 bg-slate-200 rounded-sm">Comments</span>
				<span>{comments}</span>
			</CardFooter>
		</Card>
	);
}
