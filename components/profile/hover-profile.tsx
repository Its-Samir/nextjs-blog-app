import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import FollowButton from "../follow-button";
import { getUserByUsername } from "@/lib/queries/user";
import { auth } from "@/auth";
import { BeatLoader } from "react-spinners";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default async function HoverProfile({
	children,
	username,
}: {
	children: React.ReactNode;
	username: string;
}) {
	const user = await getUserByUsername(username);
	const session = await auth();

	let authContent: React.ReactNode = <BeatLoader />;

	if (user) {
		const isFollowing = new Set(user.followers).has(
			session ? session.user.id! : ""
		);

		authContent = (
			<>
				<div className="flex items-center justify-between gap-2">
					<Link href={`/profile/${username}`}>
						<div className="flex items-center gap-3">
							<Avatar className="rounded-full">
								<AvatarImage
									src={user.image || ""}
									alt="avatar-img"
									className="rounded-md"
								/>
								<AvatarFallback className="bg-slate-400 text-white rounded-md">
									{username?.slice(0, 1).toUpperCase()}
								</AvatarFallback>
							</Avatar>

							<div className="flex flex-col text-xs">
								<span>{user.name?.toUpperCase()}</span>
								<span className="text-slate-500">@{username}</span>
							</div>
						</div>
					</Link>
					<FollowButton
						userId={user.id}
						content="Follow"
						isFollowing={isFollowing}
					/>
				</div>

				<p className="text-slate-600 text-sm sm:text-xs">{user.bio}</p>
			</>
		);
	}

	return (
		<HoverCard openDelay={200}>
			<HoverCardTrigger asChild>{children}</HoverCardTrigger>
			<HoverCardContent className="flex flex-col gap-2">
				{authContent}
			</HoverCardContent>
		</HoverCard>
	);
}
