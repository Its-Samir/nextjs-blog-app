import { PostsWithUser } from "@/types";
import Post from "./post";

export default function PostsList({ posts }: { posts: PostsWithUser[] }) {
    return (
        <div className="flex flex-wrap gap-3">
            {posts.map((post) => (
                <Post key={post.id} {...post} />
            ))}
        </div>
    );
}
