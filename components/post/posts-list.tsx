import { PostsWithUser } from "@/types";
import Post from "./post";
import RightBar from "./right-bar";
import { getTrendingPosts } from "@/lib/queries/post";

interface PostsListProps {
	getPosts: () => Promise<PostsWithUser[]>;
}

export default async function PostsList({ getPosts }: PostsListProps) {
	const posts = await getPosts();

	return (
		<div className="flex md:flex-wrap-reverse mt-4">
			<div className="flex flex-[3] lg:flex-0 flex-wrap">
				{posts.length === 0 ? <p>No post found</p> : null}
				{posts.map((post) => (
					<Post key={post.id} {...post} />
				))}
			</div>
			<RightBar getPosts={getTrendingPosts} heading="Trending" />
		</div>
	);
}
