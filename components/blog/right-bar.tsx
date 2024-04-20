import { Suspense } from "react";
import { cn } from "@/lib/utils";
import SideBarBlog from "./sidebar-blog";
import { Blog } from "@prisma/client";

interface RightBarProps {
	className?: string;
	heading: string;
	getBlogs: () => Promise<Blog[]>;
}

export default async function RightBar({
	className,
	heading,
	getBlogs,
}: RightBarProps) {
	const blogs = await getBlogs();

	return (
		<div className={cn("flex-1 md:flex-auto md:w-full", className)}>
			<div className="sticky top-[100px]">
				{blogs.length === 0 ? null : (
					<>
						<h1 className="text-lg">{heading}</h1>
						<Suspense fallback={<p>Loading...</p>}>
							{blogs.map((blog) => (
								<SideBarBlog key={blog.id} {...blog} />
							))}
						</Suspense>
					</>
				)}
			</div>
		</div>
	);
}
