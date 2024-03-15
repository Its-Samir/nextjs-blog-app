import CategoryTabs from "@/components/post/category-tabs";
import Header from "@/components/header/header";
import TopPost from "@/components/post/top-post";
import SearchBar from "@/components/post/search-bar";
import RecentPostsList from "@/components/post/recent-posts-list";
import PostsList from "@/components/post/posts-list";
import { getAllPosts } from "@/lib/queries/post";
import { Button } from "@/components/ui/button";
import { Forward } from "lucide-react";
import Link from "next/link";

export default function Home({ searchParams: { page } }: { searchParams: { page: string } }) {
    return (
        <>
            <Header />
            <SearchBar />
            <CategoryTabs />

            <TopPost />

            <RecentPostsList />

            <PostsList getPosts={() => getAllPosts(+page || 1)} />
            <Link href={"/posts"}>
                <Button
                    className="flex items-center gap-1 rounded-full my-4"
                >
                    See more{" "}
                    <Forward />
                </Button>
            </Link>
        </>
    )
}
