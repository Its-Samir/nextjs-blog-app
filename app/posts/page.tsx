import CategoryTabs from "@/components/post/category-tabs";
import PostsList from "@/components/post/posts-list";
import SearchBar from "@/components/post/search-bar";
import { getAllPosts, getPostsByCategory, getPostsBySearchQuery } from "@/lib/queries/post";
import { PostsWithUser } from "@/types";
import { Suspense } from "react";

interface PostsPageProp {
    searchParams: {
        search: string;
        category: string;
    }
}

async function Posts({ searchParams }: PostsPageProp) {
    let posts: PostsWithUser[] = [];

    if (searchParams.category) {
        posts = await getPostsByCategory(searchParams.category);
    }

    else if (searchParams.search) {
        posts = await getPostsBySearchQuery(searchParams.search);
    }

    else {
        posts = await getAllPosts();
    }

    return posts.length > 0 ? <PostsList posts={posts} /> : <p>No post found</p>
}

export default async function PostsPage({ searchParams }: PostsPageProp) {
    return (
        <>
            <SearchBar />
            <CategoryTabs />
            <Suspense fallback={<p className="text-2xl text-slate-500 animate-pulse">loading...</p>}>
                <Posts searchParams={searchParams} />
            </Suspense>
        </>
    )
}
