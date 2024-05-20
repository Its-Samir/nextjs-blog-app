"use client";

import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import AuthModal from "../auth/auth-modal";
import { likes as likeHandler } from "@/actions/blog/likes";
import { useOptimistic } from "react";

export default function Like({
	blogId,
	likes,
}: {
	blogId: string;
	likes: string[];
}) {
	const session = useSession();
	let likeButtonContent: React.ReactNode;
	const [hearts, action] = useOptimistic(likes);

	if (!session || !session.data) {
		likeButtonContent = (
			<AuthModal>
				<button type="submit">
					<Heart size={18} fill={"white"} color="rgb(255, 15, 150)" />
				</button>
			</AuthModal>
		);
	} else if (session && session.data) {
		likeButtonContent = (
			<form
				action={likeHandler.bind(
					null,
					session.data.user.username || "",
					blogId
				)}
				className="flex items-center"
				onClick={() => {
					action((prev) =>
						new Set(hearts).has(session?.data.user.id || "")
							? prev.filter((id) => id !== session.data.user.id!)
							: [...prev, session.data.user.id!]
					);
				}}
			>
				<button type="submit">
					<Heart
						size={18}
						fill={
							new Set(hearts).has(session?.data.user.id || "")
								? "rgb(255, 15, 150)"
								: "white"
						}
						color="rgb(255, 15, 150)"
					/>
				</button>
			</form>
		);
	}

	return (
		<div className="flex gap-1 items-center">
			{likeButtonContent}
			{hearts.length}
		</div>
	);
}
