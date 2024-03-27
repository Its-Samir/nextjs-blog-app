import React from "react";
import { getRecentPosts } from "@/lib/queries/post";
import Post from "./post";

export default async function RecentPostsList() {
	const posts = await getRecentPosts();

	return (
		<div className="flex flex-col flex-wrap gap-3">
			<h1 className="text-2xl text-slate-600 my-4">Recent posts</h1>
			<div className="flex flex-wrap gap-3">
				{posts.map((post) => (
					<Post
						key={post.id}
						{...post}
						includeImg={false}
						includeContent={false}
					/>
				))}
			</div>
		</div>
	);
}
