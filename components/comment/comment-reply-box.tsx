"use client";

import { useState } from "react";
import CreateCommentForm from "./create-comment-form";
import { Reply } from "lucide-react";

export default function CommentReplyBox({
	blogId,
	parentId,
}: {
	blogId: string;
	parentId: string;
}) {
	const [openBox, setOpenBox] = useState(false);

	return (
		<div className="flex flex-col gap-2">
			<span
				className="text-sm cursor-pointer flex items-center gap-1"
				onClick={() => setOpenBox((p) => !p)}
			>
				<Reply size={12} />
				<span>Reply </span>
			</span>
			{openBox ? (
				<CreateCommentForm blogId={blogId} parentId={parentId} />
			) : null}
		</div>
	);
}
