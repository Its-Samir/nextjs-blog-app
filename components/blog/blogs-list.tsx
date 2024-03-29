import { BlogsWithUser } from "@/types";
import Blog from "./blog";
import RightBar from "./right-bar";
import { getTrendingBlogs } from "@/lib/queries/blog";

interface BlogsListProps {
	getBlogs: () => Promise<BlogsWithUser[]>;
}

export default async function BlogsList({ getBlogs }: BlogsListProps) {
	const blogs = await getBlogs();

	return (
		<div className="flex md:flex-wrap-reverse mt-4">
			<div className="flex flex-[3] lg:flex-0 flex-wrap">
				{blogs.length === 0 ? <p>No blog found</p> : null}
				{blogs.map((blog) => (
					<Blog key={blog.id} {...blog} />
				))}
			</div>
			<RightBar getBlogs={getTrendingBlogs} heading="Trending" />
		</div>
	);
}
