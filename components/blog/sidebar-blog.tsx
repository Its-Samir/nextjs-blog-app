import { Blog } from "@prisma/client";
import { Card, CardFooter, CardTitle } from "../ui/card";
import { Lightbulb, ThumbsUp } from "lucide-react";
import Link from "next/link";

type BlogData = Pick<Blog, "category" | "slug" | "title" | "readingTime" | "likes">;

export default function SideBarBlog({
	title,
	slug,
	category,
	readingTime,
	likes
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
			<CardFooter className="p-0 gap-1 text-sm sm:text-xs">
				<ThumbsUp size={12} absoluteStrokeWidth />
				<span>{likes.length}</span>
			</CardFooter>
		</Card>
	);
}
