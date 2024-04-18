import Image from "next/image";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle,
} from "@/components/ui/card";
import { Calendar, Dot, Lightbulb } from "lucide-react";
import { getTopBlog } from "@/lib/queries/blog";
import User from "@/components/profile/user";
import Link from "next/link";
import removeMarkdownTags from "@/lib/remove-markdown-tags";

export default async function TopBlog() {
	const [topBlog] = await getTopBlog();

	return (
		<>
			<h1 className="text-2xl text-neutral-800 font-sans font-bold my-4">Top blog</h1>

			<Card className="rounded-none border-0 border-b shadow-none flex gap-4 p-3 md:flex-col">
				<div className="w-[22rem] flex-1 md:w-[12rem]">
					<Image
						src={topBlog.image as string}
						alt="img"
						width={500}
						height={100}
						style={{ width: "auto", height: "auto" }}
						priority
					/>
				</div>
				<div className="flex flex-[3] flex-col gap-3 md:gap-2">
					<div className="flex gap-1 items-center text-sm text-slate-500">
						<Lightbulb size={12} absoluteStrokeWidth />
						<span className="text-slate-500 font-sans font-bold">
							{topBlog.category.slice(0, 1).toUpperCase() +
								topBlog.category.slice(1)}
						</span>
						<Dot size={18} />
						<span>{topBlog.readingTime}</span>
					</div>
					<CardTitle className="text-3xl md:text-xl w-[75%] md:w-auto font-sans font-bold">
						<Link href={`/blogs/${topBlog.slug}`}>
							{topBlog.title.substring(0, 50).trim()}...
						</Link>
					</CardTitle>
					<CardContent>
						<CardDescription className="w-[65%] md:w-auto">
							<Link href={`/blogs/${topBlog.slug}`}>
								{removeMarkdownTags(topBlog.content)
									.substring(0, 100)
									.trim()}
								...
							</Link>
						</CardDescription>
					</CardContent>
					<CardFooter className="p-0 flex-wrap gap-2 text-slate-600 text-sm">
						<User
							username={topBlog.user.username as string}
							name={topBlog.user.name as string}
							image={topBlog.user.image as string}
						/>
						<div className="flex items-center gap-2 sm:hidden">
							<Calendar size={12} absoluteStrokeWidth />
							<span>Nov 7, 2023</span>
						</div>
					</CardFooter>
				</div>
			</Card>
		</>
	);
}
