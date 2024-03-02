import CategoryTabs from "@/components/post/category-tabs";
import Header from "@/components/header/header";
import TopPost from "@/components/post/top-post";
import SearchBar from "@/components/post/search-bar";
import RecentPostsList from "@/components/post/recent-posts-list";
import PostsList from "@/components/post/posts-list";
import { getAllPosts } from "@/lib/queries/post";

export default async function Home() {
    const posts = await getAllPosts();

    return (
        <>
            <Header />
            <SearchBar />
            <CategoryTabs />

            <TopPost />

            <RecentPostsList />
            <h1 className="text-2xl text-slate-600 my-4">Popular</h1>
            <PostsList posts={posts} />
        </>
    )
}
