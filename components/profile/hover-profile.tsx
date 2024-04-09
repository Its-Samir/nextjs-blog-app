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
							<div className="rounded-full h-8 w-8 bg-slate-400 text-white flex items-center justify-center">
								{user.image ? (
									<img
										src={user.image}
										alt="user-img"
										className="w-full h-full rounded-full"
									/>
								) : (
									<span>
										{user.username?.slice(0, 1).toUpperCase()}
									</span>
								)}
							</div>
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

				<p className="text-slate-600 text-sm sm:text-xs">
					{user.bio}
				</p>
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
