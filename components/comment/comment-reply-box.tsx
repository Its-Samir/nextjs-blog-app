"use client";

import { useState } from "react";
import CreateCommentForm from "./create-comment-form";
import { Reply } from "lucide-react";
import { useSession } from "next-auth/react";
import AuthModal from "../auth/auth-modal";

export default function CommentReplyBox({
	blogId,
	parentId,
}: {
	blogId: string;
	parentId: string;
}) {
	const [openBox, setOpenBox] = useState(false);
	const session = useSession();

	let authContent: React.ReactNode = null;

	if (!session || !session.data) {
		authContent = (
			<AuthModal>
				<span className="text-sm cursor-pointer flex items-center gap-1">
					<Reply size={12} />
					<span>Reply</span>
				</span>
			</AuthModal>
		);
	} else if (session && session.data.user) {
		authContent = (
			<span
				className="text-sm cursor-pointer flex items-center gap-1"
				onClick={() => setOpenBox((p) => !p)}
			>
				<Reply size={12} />
				<span>Reply</span>
			</span>
		);
	}

	return (
		<div className="flex flex-col gap-2">
			{authContent}
			{openBox ? (
				<CreateCommentForm blogId={blogId} parentId={parentId} />
			) : null}
		</div>
	);
}
