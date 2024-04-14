import { auth } from "@/auth";
import { Card } from "@/components/ui/card";
import AccountForm from "../_components/account-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Metadata } from "next";
import DeleteAccountButton from "../_components/delete-account-button";
import Link from "next/link";
import UserPost from "../_components/user-post";
import { getBlogsByUserId } from "@/lib/queries/blog";
import Blog from "@/components/blog/blog";

export const metadata: Metadata = {
	title: "User Profile",
};

enum Tabs {
	ACCOUNT = "account",
	POSTS = "posts",
	SETTING = "settings",
}

interface DashboardPageProps {
	searchParams: {
		tab: Tabs;
	};
}

export default async function DashboardPage({
	searchParams: { tab },
}: DashboardPageProps) {
	const session = await auth();

	if (!session || !session.user) {
		return null;
	}

	if (tab === Tabs.ACCOUNT) {
		return <AccountForm user={session.user} />;
	}

	if (tab === Tabs.SETTING) {
		return (
			<Card className="flex flex-col gap-3 border-none shadow-none pb-4">
				<label>Password</label>
				<Input defaultValue={"******"} disabled />
				{session.user.type === "oauth" ? (
					<span children="You have logged in with oauth provider, you cannot change password from here" />
				) : null}
				<Button
					variant={"secondary"}
					className="w-max"
					disabled={session.user.type === "oauth"}
				>
					<Link href={"/reset"}>Update Password</Link>
				</Button>
				<span>Account deletion</span>
				<hr />
				<DeleteAccountButton userId={session.user.id!} />
			</Card>
		);
	}

	const blogs = await getBlogsByUserId(session.user.id!);

	if (tab === Tabs.POSTS) {
		return (
			<Card className="border-none shadow-none">
				{blogs && blogs.length === 0 ? (
					<span>You don't have any post yet.</span>
				) : (
					blogs?.map((blog) => (
						<UserPost
							key={blog.id}
							blog={{
								id: blog.id,
								category: blog.category,
								slug: blog.slug,
								title: blog.title,
							}}
						/>
					))
				)}
			</Card>
		);
	}

	return (
		<Card className="border-none shadow-none flex flex-wrap gap-2">
			{blogs && blogs.length === 0 ? (
				<span>You haven't written anything yet.</span>
			) : (
				blogs?.map((blog) => <Blog key={blog.id} {...blog} />)
			)}
		</Card>
	);
}
