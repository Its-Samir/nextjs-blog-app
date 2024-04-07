import { Blog } from "@prisma/client";
import { Card, CardFooter, CardTitle } from "../ui/card";
import { Lightbulb, ThumbsUp } from "lucide-react";
import Link from "next/link";

type BlogData = Pick<Blog, "category" | "slug" | "title" | "readingTime">;

export default function SideBarBlog({
	title,
	slug,
	category,
	readingTime,
}: BlogData) {
	return (
		<Card className="w-full shadow-none p-3 flex flex-col gap-2 rounded-none border-0 border-l-blue-500 border-l border-b my-2">
			<div className="flex gap-2 items-center">
				<Lightbulb size={12} />
				<span className="text-sm sm:text-xs">
					{category.slice(0, 1).toUpperCase() + category.slice(1)}
				</span>
			</div>
			<CardTitle className="text-slate-600 text-lg sm:text-base">
				<Link href={`/blogs/${slug}`}>{title}</Link>
			</CardTitle>
			<CardFooter className="p-0 gap-2 text-slate-500 text-sm sm:text-xs">
				<ThumbsUp size={12} />
				<span>{0} likes</span>
			</CardFooter>
		</Card>
	);
}