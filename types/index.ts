import type { Comment, Blog } from "@prisma/client";

export default interface IActionsReturn {
	error?: string;
	success?: string;
}

export type BlogsWithUser = Blog & {
	user: {
		username: string | null;
		name: string | null;
		image: string | null;
	};
	_count?: { comments: number };
};

export type BlogsWithUserAndComments = Blog & {
	user: {
		username: string | null;
		name: string | null;
		image: string | null;
	};
	comments: Comment[];
};
