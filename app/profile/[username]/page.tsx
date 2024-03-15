import { auth } from "@/auth";
import FollowButton from "@/components/follow-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getPostsUserId } from "@/lib/queries/post";
import { getUserByUsername } from "@/lib/queries/user";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { useSearchParams, useRouter, notFound } from "next/navigation";

interface PostsPageProp {
	params: {
		username: string;
	};
}

export default async function UserProfilepage({ params }: PostsPageProp) {
	const user = await getUserByUsername(params.username);
    const session = await auth();

	if (!user) {
		notFound();
	}

	const posts = await getPostsUserId(user.id);

	return (
		<div className="w-[40rem] mx-auto md:w-auto">
			<Card className="flex flex-col gap-4 border-0 border-b shadow-none py-2 rounded-none">
				<Avatar className="w-[5rem] h-[5rem]">
					<AvatarImage src="" alt="" />
					<AvatarFallback>U</AvatarFallback>
				</Avatar>
				<div className="flex items-end gap-4 justify-between text-slate-500 ml-2">
					<div className="flex flex-col gap-2 justify-end">
						<span className="text-slate-700 font-semibold">
							{user.name?.toUpperCase()}
						</span>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Fugit molestiae dolor odit necessitatibus
							optio. Fuga?
						</p>
						<div className="flex gap-2">
							<span>
								<b>{user.followings.length}</b> following
							</span>
							<span>
								<b>{user.followers.length}</b> followers
							</span>
						</div>
					</div>
					<FollowButton content="Follow" isFollowing={new Set(user.followers).has(session ? session.user.id! : "")} />
				</div>
			</Card>
			<Card className="border-none">
				<div className="flex justify-between items-center p-4 border-0 border-b">
					<div className="flex flex-col gap-3">
						<CardTitle>Lorem ipsum dolor sit.</CardTitle>
						<CardContent className="flex gap-2 items-center">
							<Badge className="font-normal">Design</Badge>
							<span className="flex items-center gap-1 text-slate-500 text-sm">
								<ThumbsUp size={16} /> 0
							</span>
							<span className="flex items-center gap-1 text-slate-500 text-sm">
								<MessageCircle size={16} /> 0
							</span>
						</CardContent>
					</div>
					<div
						className="w-[7rem] h-[7rem] md:w-[5rem] md:h-[5rem]"
						style={{
							backgroundImage: `url("/header-image.jpg")`,
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					/>
				</div>
			</Card>
		</div>
	);
}
