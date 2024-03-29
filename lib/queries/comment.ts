import { Comment } from "@prisma/client";
import { db } from "@/lib/db";
import { cache } from "react";

export type CommentWithUser = Comment & {
	user: {
		username: string | null;
		name: string | null;
		image: string | null;
	};
};

export const getCommentsByBlogId = cache(
	(blogId: string): Promise<CommentWithUser[]> => {
		return db.comment.findMany({
			where: { blogId, parentId: null },
			include: {
				user: {
					select: {
						username: true,
						name: true,
						image: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	}
);

export const getCommentsByParentId = cache(
	(parentId: string): Promise<CommentWithUser[]> => {
		return db.comment.findMany({
			where: { parentId },
			include: {
				user: {
					select: {
						username: true,
						name: true,
						image: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	}
);
