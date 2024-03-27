import Comment from "@/components/comment/comment";
import { Suspense } from "react";
import { CommentWithUser, getCommentsByParentId } from "@/lib/queries/comment";

interface CommentListProps {
	getComments: () => Promise<CommentWithUser[]>;
}

export default async function CommentList({ getComments }: CommentListProps) {
	const comments = await getComments();

	return comments.map(async (comment) => {
		const childComments = await getCommentsByParentId(comment.id);

		return (
			<>
				<Suspense>
					<Comment key={comment.id} comment={comment} />
					{childComments.map(async (c) => {
						return <Comment key={c.id} comment={c} childComment />;
					})}
				</Suspense>
			</>
		);
	});
}
