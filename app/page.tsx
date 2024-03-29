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

export default function Home({
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

			<RecentBlogsList />

			<Suspense fallback={<BeatLoader color="#00a5cb" />}>
				<BlogsList getBlogs={() => getAllBlogs(parseInt(page) || 1)} />
			</Suspense>
			<Link href={"/blogs"}>
				<Button className="flex items-center gap-1 rounded-full my-4">
					See more <Forward />
				</Button>
			</Link>
		</>
	);
}
