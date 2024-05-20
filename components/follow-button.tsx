"use client";

import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import AuthModal from "./auth/auth-modal";
import { useTransition } from "react";
import { follow } from "@/actions/user/follow";
import { BeatLoader } from "react-spinners";
import { useOptimistic } from "react";

export default function FollowButton({
	content,
	isFollowing,
	userId,
}: {
	content: string;
	isFollowing: boolean;
	userId: string;
}) {
	const session = useSession();
	const [isPending, startTransition] = useTransition();
	const [followed, action] = useOptimistic(isFollowing);

	const handleClick = () => {
		startTransition(() => {
			if (session.data && session.data.user) {
				follow(userId, session.data.user.id!)
					.then(() => {})
					.catch((err) => {});
			}
		});
	};

	let buttonContent: React.ReactNode;

	if (session.status === "loading") buttonContent = <BeatLoader size={8} />;
	else if (!session || !session.data) {
		buttonContent = (
			<AuthModal>
				<Button size={"sm"} className="rounded-full">
					{content}
				</Button>
			</AuthModal>
		);
	} else if (session && session.data && session.data.user.id !== userId) {
		buttonContent = (
			<Button
				size={"sm"}
				variant={followed ? "outline" : "default"}
				className={`rounded-full ${
					isFollowing ? "hover:bg-red-400 hover:text-white" : ""
				}`}
				onClick={() => {
					handleClick();
					action((prev) => {
						return !prev;
					});
				}}
			>
				{followed ? "Unfollow" : content}
			</Button>
		);
	}

	return buttonContent;
}
