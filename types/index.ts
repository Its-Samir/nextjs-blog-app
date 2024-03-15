import type { Comment, Post } from "@prisma/client";

export default interface IActionsReturn {
	error?: string;
	success?: string;
}

export type PostsWithUser = Post & {
	user: { username: string | null; image: string | null };
	_count?: { comments: number };
};

export type PostsWithUserAndComments = Post & {
	user: { username: string | null; image: string | null };
	comments: Comment[];
};
