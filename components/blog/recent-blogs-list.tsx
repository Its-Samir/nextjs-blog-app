import React from "react";
import { getRecentBlogs } from "@/lib/queries/blog";
import Blog from "./blog";

export default async function RecentBlogsList() {
	const blogs = await getRecentBlogs();

	return (
		<div className="flex flex-col flex-wrap gap-3">
			<h1 className="text-2xl text-slate-600 my-4">Recent Blogs</h1>
			<div className="flex flex-wrap gap-3">
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
