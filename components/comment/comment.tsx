import { formatTime } from "@/lib/time";
import { Code2Icon, Dot, MoreHorizontal, Trash2 } from "lucide-react";
import User from "../profile/user";
import { Card } from "../ui/card";
import { CommentWithUser } from "@/lib/queries/comment";
import CommentReplyBox from "./comment-reply-box";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { deleteComment } from "@/actions/comment/delete";

export default async function Comment({
	comment,
	childComment,
}: {
	comment: CommentWithUser;
	childComment?: boolean;
}) {
	const session = await auth();

	const blog = await db.blog.findUnique({
		where: { id: comment.blogId },
		select: { id: true, userId: true },
	});

	if (!blog) {
		redirect("/");
	}

	return (
		<Card
			className={`flex flex-col gap-2 border-0 border-l border-b rounded-none p-4 w-[45rem] md:w-auto sm:text-sm ${
				childComment && "border-l-black ml-5"
			}`}
		>
			<div className="flex justify-between items-center">
				<div className="flex justify-between gap-1 items-center">
					<User
						username={comment.user.username as string}
						name={comment.user.name as string}
						image={comment.user.image as string}
					/>
					<Dot size={12} />
					<span className="text-slate-600 text-sm">
						{formatTime(comment.createdAt)}
					</span>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<MoreHorizontal size={16} />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							<Code2Icon size={16} className="mr-2" />
							<span>Report</span>
						</DropdownMenuItem>
						{comment.userId === session?.user.id ||
						blog.userId === session?.user.id ? (
							<DropdownMenuItem className="focus:text-white focus:bg-destructive">
								<form action={deleteComment.bind(null, comment.id)} className="w-full">
									<button className="w-full flex items-center" type="submit">
										<Trash2 size={16} className="mr-2" />
										<span>Delete</span>
									</button>
								</form>
							</DropdownMenuItem>
						) : null}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<p className="text-sm text-slate-600 ml-[2rem] p-2">{comment.text}</p>
			{!childComment ? (
				<CommentReplyBox blogId={comment.blogId} parentId={comment.id} />
			) : null}
		</Card>
	);
}
