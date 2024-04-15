import { auth } from "@/auth";
import Blog from "@/components/blog/blog";
import FollowButton from "@/components/follow-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { db } from "@/lib/db";
import { getBlogsByUserId } from "@/lib/queries/blog";
import { getUserByUsername } from "@/lib/queries/user";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
	const users = await db.user.findMany({ select: { username: true } });

	return users.map((user) => ({ username: user.username }));
}

export async function generateMetadata({
	params,
}: {
	params: { username: string };
}): Promise<Metadata> {
	const user = await getUserByUsername(params.username);

	if (!user) {
		notFound();
	}

	return {
		title: `@${user.username}`,
	};
}

interface UserProfilePageProp {
	params: {
		username: string;
	};
}

export default async function UserProfilePage({ params }: UserProfilePageProp) {
	const user = await getUserByUsername(params.username);
	const session = await auth();

	if (!user) {
		notFound();
	}

	const blogs = await getBlogsByUserId(user.id);

	return (
		<div className="w-[40rem] mx-auto md:w-auto">
			<Card className="flex flex-col gap-4 border-0 border-b shadow-none py-2 rounded-none">
				<Avatar className="w-[5rem] h-[5rem]">
					<AvatarImage src={user.image || ""} alt="user-img" />
					<AvatarFallback>U</AvatarFallback>
				</Avatar>
				<div className="flex items-end gap-4 justify-between text-slate-500 ml-2">
					<div className="flex flex-col gap-2 justify-end">
						<span className="text-slate-700 font-semibold">
							{user.name?.toUpperCase()}
						</span>
						<p>{user.bio}</p>
						<div className="flex gap-2">
							<span>
								<b>{user.followers.length}</b> followers
							</span>
						</div>
					</div>
					<FollowButton
						userId={user.id}
						content="Follow"
						isFollowing={new Set(user.followers).has(
							session ? session.user.id! : ""
						)}
					/>
				</div>
			</Card>
			<Card className="border-none shadow-none flex flex-wrap gap-2">
				{blogs && blogs.length === 0 ? (
					<span>This user has not written anything yet</span>
				) : (
					blogs?.map((blog) => <Blog key={blog.id} {...blog} />)
				)}
			</Card>
		</div>
	);
}
