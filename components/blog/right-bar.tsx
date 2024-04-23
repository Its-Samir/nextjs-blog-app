import { Suspense } from "react";
import { cn } from "@/lib/utils";
import SideBarBlog from "./sidebar-blog";
import { Blog } from "@prisma/client";
import { getTrendingBlogs } from "@/lib/queries/blog";

interface RightBarProps {
	className?: string;
	heading: string;
	getBlogs: () => Promise<(Blog & { _count: { comments: number } })[]>;
}

export default async function RightBar({
	className,
	heading,
	getBlogs,
}: RightBarProps) {
	let blogs: Awaited<ReturnType<typeof getBlogs>> = await getBlogs();
	let headingContent: string = heading;

	if (blogs.length === 0) {
		blogs = await getTrendingBlogs();
		headingContent = "Trending";
	}

	return (
		<div className={cn("flex-1 md:flex-auto md:w-full", className)}>
			<div className="sticky top-[100px]">
				<h1 className="text-lg">{headingContent}</h1>
				<Suspense fallback={<p>Loading...</p>}>
					{blogs.map((blog) => (
						<SideBarBlog
							key={blog.id}
							{...blog}
							comments={blog._count.comments}
						/>
					))}
				</Suspense>
			</div>
		</div>
	);
}
