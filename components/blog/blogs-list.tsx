import { BlogsWithUser } from "@/types";
import Blog from "./blog";

interface BlogsListProps {
	getBlogs: () => Promise<BlogsWithUser[]>;
}

export default async function BlogsList({ getBlogs }: BlogsListProps) {
	const blogs = await getBlogs();

	return (
		<div className="flex flex-[3] lg:flex-0 flex-wrap">
			{blogs.length === 0 ? <p>No blog found</p> : null}
			{blogs.map((blog) => (
				<Blog key={blog.id} {...blog} />
			))}
		</div>
	);
}
