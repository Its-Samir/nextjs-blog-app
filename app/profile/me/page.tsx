import { auth } from "@/auth";
import { Card } from "@/components/ui/card";
import AccountForm from "../_components/account-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DeleteAccountButton from "../_components/delete-account-button";
import Link from "next/link";
import { getBlogsByUserId } from "@/lib/queries/blog";
import Blog from "@/components/blog/blog";
import UserPostList from "../_components/user-post-list";

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
				<Input defaultValue={"▪▪▪▪▪▪"} disabled />
				{session.user.type === "oauth" ? (
					<span>
						You have logged in with oauth provider, you cannot change
						password from here
					</span>
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
		return <UserPostList blogs={blogs || []} />;
	}

	return (
		<Card className="border-none shadow-none flex flex-wrap gap-2">
			{blogs && blogs.length === 0 ? (
				<span>You haven&apos;t written anything yet.</span>
			) : (
				blogs?.map((blog) => <Blog key={blog.id} {...blog} />)
			)}
		</Card>
	);
}
