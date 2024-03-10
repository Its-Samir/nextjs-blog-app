import { PostsWithUser } from "@/types";
import Post from "./post";
import RelatedPost from "./sidebar-post";
import RightBar from "./right-bar";

interface PostsListProps {
    getPosts: () => Promise<PostsWithUser[]>
}

export default async function PostsList({ getPosts }: PostsListProps) {
    const posts = await getPosts();

    return (
        <div className="flex md:flex-wrap-reverse mt-4">
            <div className="flex flex-[3] md:flex-auto flex-wrap gap-2">
                {posts.length === 0 ? <p>No post found</p> : null}
                {posts.map((post) => (
                    <Post key={post.id} {...post} />
                ))}
            </div>
            <RightBar heading="Trending" />
        </div>
    );
}
