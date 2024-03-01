import CategoryTabs from "@/components/post/category-tabs";
import Header from "@/components/header/header";
import TopPost from "@/components/post/top-post";
import SearchBar from "@/components/post/search-bar";
import RecentPost from "@/components/post/recent-post";

export default async function Home() {
    return (
        <>
            <Header />
            <SearchBar />
            <CategoryTabs />

            <h1 className="text-4xl text-slate-600 my-4 md:text-2xl">Top post</h1>
            <TopPost />

            <h1 className="text-4xl text-slate-600 my-4 md:text-2xl">Recent posts</h1>
            <div className="flex flex-wrap gap-3">
                <RecentPost />
            </div>
        </>
    )
}
