"use client";

import { Card } from "@/components/ui/card";
import UserPost from "./user-post";
import { BlogsWithUser } from "@/types";
import { useOptimistic } from "react";
import { deleteBlog } from "@/actions/blog/delete";
import { toast } from "sonner";

type BlogType = BlogsWithUser;

export default function UserPostList({ blogs }: { blogs: BlogType[] }) {
	const [posts, action] = useOptimistic(blogs);

	return (
		<Card className="border-none shadow-none">
			{posts && posts.length === 0 ? (
				<span>You don&apos;t have any post yet.</span>
			) : (
				posts?.map((blog) => (
					<UserPost
						key={blog.id}
						blog={{
							id: blog.id,
							category: blog.category,
							slug: blog.slug,
							title: blog.title,
						}}
						deleteBlog={() => {
							deleteBlog(blog.id)
								.then((data) => {
									if (data && data.error) {
										toast.error(data.error, {
											description:
												data.error === "Not authenticated"
													? "Please login to continue"
													: data.error === "Unauthorized"
													? "You don't have permission for this action"
													: "An error occurred",
										});
									}
								})
								.catch((err) => {
									toast.error("Error occurred", {
										description: "Something went wrong",
									});
								});

							action((prev) => {
								return prev.filter((post) => post.id !== blog.id);
							});
						}}
					/>
				))
			)}
		</Card>
	);
}
