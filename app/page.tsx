import CategoryTabs from "@/components/post/category-tabs";
import Header from "@/components/header/header";
import TopPost from "@/components/post/top-post";
import SearchBar from "@/components/post/search-bar";
import RecentPostsList from "@/components/post/recent-posts-list";
import PostsList from "@/components/post/posts-list";
import { getAllPosts } from "@/lib/queries/post";

export default function Home() {
    return (
        <>
            <Header />
            <SearchBar />
            <CategoryTabs />

            <TopPost />

            <RecentPostsList />

            <PostsList getPosts={getAllPosts} />
        </>
    )
}
