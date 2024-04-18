import Pagination from "@/components/pagination";
import CategoryTabs from "@/components/blog/category-tabs";
import BlogsList from "@/components/blog/blogs-list";
import SearchBar from "@/components/blog/search-bar";
import { db } from "@/lib/db";
import {
	getAllBlogs,
	getBlogsByCategory,
	getBlogsBySearchQuery,
} from "@/lib/queries/blog";
import { BlogsWithUser } from "@/types";
import { Suspense } from "react";
import { BarLoader } from "react-spinners";
import { Metadata } from "next";
import RightBar from "@/components/blog/right-bar";
import { getTrendingBlogs } from "@/lib/queries/blog";

export const metadata: Metadata = {
	title: "Get latest blogs",
	description: "Find blogs that you want",
};

interface BlogsPageProp {
	searchParams: {
		page: string;
		search: string;
		category: string;
	};
}

async function Blogs({ searchParams }: BlogsPageProp) {
	let getBlogs: () => Promise<BlogsWithUser[]>;

	if (searchParams.category) {
		getBlogs = () => getBlogsByCategory(searchParams.category);
	} else if (searchParams.search) {
		getBlogs = () => getBlogsBySearchQuery(searchParams.search);
	} else {
		getBlogs = () => getAllBlogs(parseInt(searchParams.page) || 1);
	}

	return <BlogsList getBlogs={getBlogs} />;
}

export default async function BlogsPage({ searchParams }: BlogsPageProp) {
	const blogCount = await db.blog.count();

	return (
		<>
			<SearchBar />
			<CategoryTabs />

			<Suspense fallback={<BarLoader className="mx-auto" color="#00a5cb" />}>
				<div className="flex md:flex-wrap mt-4">
					<div className="flex flex-col flex-[3]">
						<Blogs searchParams={searchParams} />
						{!searchParams.category && !searchParams.search ? (
							<Pagination
								totalBlog={blogCount}
								page={parseInt(searchParams.page) || 1}
							/>
						) : null}
					</div>
					<RightBar getBlogs={getTrendingBlogs} heading="Trending" />
				</div>
			</Suspense>
		</>
	);
}
