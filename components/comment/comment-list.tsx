import Comment from "@/components/comment/comment";
import { Suspense } from "react";
import { CommentWithUser, getCommentsByParentId } from "@/lib/queries/comment";

interface CommentListProps {
	getComments: () => Promise<CommentWithUser[]>;
}

export default async function CommentList({ getComments }: CommentListProps) {
	const comments = await getComments();

	const commentsWithChildren = await Promise.all(
		comments.map(async (comment) => {
			const childComments = await getCommentsByParentId(comment.id);
			return { ...comment, childComments };
		})
	);

	return (
		<Suspense>
			{commentsWithChildren.map((comment) => (
				<div key={comment.id}>
					<Comment key={comment.id} comment={comment} />
					{comment.childComments.map((childComment) => (
						<Comment
							key={childComment.id}
							comment={childComment}
							childComment
						/>
					))}
				</div>
			))}
		</Suspense>
	);
}
