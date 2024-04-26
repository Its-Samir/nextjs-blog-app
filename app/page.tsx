import CategoryTabs from "@/components/blog/category-tabs";
import Header from "@/components/header/header";
import TopBlog from "@/components/blog/top-blog";
import SearchBar from "@/components/blog/search-bar";
import RecentBlogsList from "@/components/blog/recent-blogs-list";
import BlogsList from "@/components/blog/blogs-list";
import { getAllBlogs, getFollowersBlogs } from "@/lib/queries/blog";
import { Button } from "@/components/ui/button";
import { Forward } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { BeatLoader } from "react-spinners";
import RightBar from "@/components/blog/right-bar";
import { getTrendingBlogs } from "@/lib/queries/blog";
import { auth } from "@/auth";
import Blog from "@/components/blog/blog";
import { getUserById } from "@/lib/queries/user";

export default async function Home() {
	const session = await auth();

	let followersBlogContent: React.ReactNode = null;

	if (session && session.user) {
		const blogs = await getFollowersBlogs(session.user.id!);

		const user = await getUserById(session.user.id!);

		if (user && user.followings.length > 0) {
			followersBlogContent = (
				<div className="flex flex-col gap-2 my-4">
					<div className="text-neutral-800 font-bold font-sans text-2xl sm:text-xl">
						From authors you followed
					</div>
					<div className="flex flex-wrap gap-2">
						{blogs.map((blog) => (
							<Blog
								key={blog.id}
								{...blog}
								includeContent={false}
								includeImg={false}
								className="lg:w-auto"
							/>
						))}
					</div>
				</div>
			);
		}
	}

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
				{followersBlogContent}
			</Suspense>

			<Suspense fallback={<BeatLoader color="#00a5cb" />}>
				<div className="flex md:flex-wrap-reverse mt-4">
					<div className="flex flex-[3] lg:flex-0 flex-wrap">
						<BlogsList getBlogs={() => getAllBlogs(1)} />
					</div>
					<RightBar getBlogs={getTrendingBlogs} heading="Trending" />
				</div>
			</Suspense>
			<Link href={"/blogs"} className="w-max">
				<Button className="flex items-center gap-1 rounded-full my-4">
					See more <Forward />
				</Button>
			</Link>
		</>
	);
}
