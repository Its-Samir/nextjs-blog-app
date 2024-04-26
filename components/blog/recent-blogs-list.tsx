import React from "react";
import { getRecentBlogs } from "@/lib/queries/blog";
import Blog from "./blog";

export default async function RecentBlogsList() {
	const blogs = await getRecentBlogs();

	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-2xl sm:text-xl text-neutral-800 font-sans font-bold mt-2">
				Recent Blogs
			</h1>
			<div className="flex flex-wrap gap-6">
				{blogs.map((blog) => (
					<Blog
						key={blog.id}
						{...blog}
						includeImg={false}
						includeContent={false}
						className="lg:w-auto"
					/>
				))}
			</div>
		</div>
	);
}
