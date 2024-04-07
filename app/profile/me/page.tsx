import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Edit, MessageCircle, ThumbsUp, Trash2 } from "lucide-react";
import AccountForm from "../_components/account-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Metadata } from "next";
import DeleteAccountButton from "../_components/delete-account-button";
import Link from "next/link";
import UserPost from "../_components/user-post";
import { getAllBlogs, getBlogsByUserId } from "@/lib/queries/blog";
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

	const blog = await getBlogsByUserId(session.user.id!);

	if (tab === Tabs.ACCOUNT) {
		return <AccountForm user={session.user} />;
	}

	if (tab === Tabs.SETTING) {
		return (
			<Card className="flex flex-col gap-3 border-none shadow-none">
				<label>Password</label>
				<Input defaultValue={"******"} disabled />
				<Button variant={"secondary"} className="w-max">
					<Link href={"/reset"}>Update Password</Link>
				</Button>
				<span>Accout deletion</span>
				<hr />
				<DeleteAccountButton userId={session.user.id!} />
			</Card>
		);
	}

	if (tab === Tabs.POSTS) {
		return (
			<Card className="border-none">
				{blog?.map((blog) => (
					<UserPost
						key={blog.id}
						blog={{
							id: blog.id,
							category: blog.category,
							slug: blog.slug,
							title: blog.title,
						}}
					/>
				))}
			</Card>
		);
	}

	return (
		<Card className="border-none flex flex-wrap gap-2">
			{blog?.map((blog) => (
				<Blog key={blog.id} {...blog} />
			))}
		</Card>
	);
}
