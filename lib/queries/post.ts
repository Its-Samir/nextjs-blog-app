import { PostsWithUser } from "@/types";
import { db } from "@/lib/db";
import { type Post } from "@prisma/client";

export async function getAllPosts(page?: number): Promise<PostsWithUser[]> {
	const skip = (6 * page! || 1) - 6;

	return db.post.findMany({
		include: {
			user: {
				select: { username: true, name: true, image: true },
			},
		},
		orderBy: {
			comments: {
				_count: "desc",
			},
		},
		skip: skip,
		take: 6,
	});
}

export async function getPostsByCategory(
	category: string
): Promise<PostsWithUser[]> {
	return db.post.findMany({
		where: {
			category: category,
		},
		include: {
			user: {
				select: { username: true, name: true, image: true },
			},
		},
	});
}

export async function getPostsBySearchQuery(
	query: string
): Promise<PostsWithUser[]> {
	return db.post.findMany({
		where: {
			OR: [
				{ title: { contains: query } },
				{ content: { contains: query } },
				{ category: { contains: query } },
			],
		},
		include: {
			user: {
				select: { username: true, name: true, image: true },
			},
		},
	});
}

export async function getTopPost(): Promise<PostsWithUser[]> {
	return db.post.findMany({
		orderBy: {
			comments: {
				_count: "desc",
			},
		},
		include: {
			user: {
				select: { username: true, name: true, image: true },
			},
		},
		take: 1,
	});
}

export async function getRecentPosts(): Promise<PostsWithUser[]> {
	return db.post.findMany({
		orderBy: {
			createdAt: "desc",
		},
		include: {
			user: {
				select: { username: true, name: true, image: true },
			},
		},
		take: 6,
	});
}

export async function getTrendingPosts(): Promise<PostsWithUser[]> {
	return db.post.findMany({
		orderBy: {
			likes: "desc",
		},
		include: {
			user: {
				select: { username: true, name: true, image: true },
			},
		},
		take: 3,
	});
}

export async function getRelatedPosts(
	currPostId: string,
	category: string
): Promise<Post[]> {
	return db.post.findMany({
		where: {
			category,
			NOT: [{ id: currPostId }],
		},
		take: 3,
	});
}

export async function getPostsUserId(userId: string) {
	return db.user
		.findUnique({
			where: {
				id: userId,
			},
		})
		.posts({
			orderBy: {
				createdAt: "desc",
			},
		});
}
