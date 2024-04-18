import CategoryTabs from "@/components/blog/category-tabs";
import Header from "@/components/header/header";
import TopBlog from "@/components/blog/top-blog";
import SearchBar from "@/components/blog/search-bar";
import RecentBlogsList from "@/components/blog/recent-blogs-list";
import BlogsList from "@/components/blog/blogs-list";
import { getAllBlogs } from "@/lib/queries/blog";
import { Button } from "@/components/ui/button";
import { Forward } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { BeatLoader } from "react-spinners";
import RightBar from "@/components/blog/right-bar";
import { getTrendingBlogs } from "@/lib/queries/blog";

export default async function Home({
	searchParams: { page },
}: {
	searchParams: { page: string };
}) {
	return (
		<>
			<Header />
			<SearchBar />
			<CategoryTabs />

			<TopBlog />

			<Suspense fallback={<BeatLoader color="#00a5cb" />}>
				<RecentBlogsList />
			</Suspense>

			<Suspense fallback={<BeatLoader color="#00a5cb" />}>
				<div className="flex md:flex-wrap-reverse mt-4">
					<div className="flex flex-[3] lg:flex-0 flex-wrap">
						<BlogsList
							getBlogs={() => getAllBlogs(parseInt(page) || 1)}
						/>
					</div>
					<RightBar getBlogs={getTrendingBlogs} heading="Trending" />
				</div>
			</Suspense>
			<Link href={"/blogs"}>
				<Button className="flex items-center gap-1 rounded-full my-4">
					See more <Forward />
				</Button>
			</Link>
		</>
	);
}
