import { formatTime } from "@/lib/time";
import { Dot, MoreHorizontal } from "lucide-react";
import User from "../profile/user";
import { Card } from "../ui/card";
import { CommentWithUser } from "@/lib/queries/comment";
import CommentReplyBox from "./comment-reply-box";

export default async function Comment({
	comment,
	childComment,
}: {
	comment: CommentWithUser;
	childComment?: boolean;
}) {
	return (
		<Card
			className={`flex flex-col gap-3 border-0 border-l border-b rounded-none p-4 w-[45rem] md:w-auto sm:text-sm ${
				childComment && "border-l-black ml-5"
			}`}
		>
			<div className="flex justify-between items-center">
				<div className="flex justify-between gap-1 items-center">
					<User
						username={comment.user.username as string}
						name={comment.user.name as string}
					/>
					<Dot size={12} />
					<span className="text-slate-600 text-sm">
						{formatTime(comment.createdAt)}
					</span>
				</div>
				<MoreHorizontal size={16} />
			</div>
			<p className="text-sm text-slate-600 ml-[2rem] p-2">{comment.text}</p>
			{!childComment ? (
				<CommentReplyBox blogId={comment.blogId} parentId={comment.id} />
			) : null}
		</Card>
	);
}
