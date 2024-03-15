"use client";

import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import AuthModal from "./auth/auth-modal";

export default function FollowButton({
	content,
	isFollowing,
}: {
	content: string;
	isFollowing: boolean;
}) {
	const session = useSession();

	const handleClick = () => {
		console.log("followed");
	};

	let buttonContent: React.ReactNode;

	if (!session || !session.data) {
		buttonContent = (
			<AuthModal>
				<Button size={"sm"} className="rounded-full">
					{content}
				</Button>
			</AuthModal>
		);
	}

	else if (session && session.data) {
		buttonContent = (
			<Button size={"sm"} className="rounded-full" onClick={handleClick}>
				{isFollowing ? "Unfollow" : content}
			</Button>
		);
	}

	return buttonContent;
}
