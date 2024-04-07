import { BlogsWithUser } from "@/types";
import { db } from "@/lib/db";
import { Blog } from "@prisma/client";

export async function getAllBlogs(page: number): Promise<BlogsWithUser[]> {
	const limit = 6;
	const skip = limit * page - limit;

	return db.blog.findMany({
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
		take: limit,
	});
}

export async function getBlogsByCategory(
	category: string
): Promise<BlogsWithUser[]> {
	return db.blog.findMany({
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

export async function getBlogsBySearchQuery(
	query: string
): Promise<BlogsWithUser[]> {
	return db.blog.findMany({
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

export async function getTopBlog(): Promise<BlogsWithUser[]> {
	return db.blog.findMany({
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

export async function getRecentBlogs(): Promise<BlogsWithUser[]> {
	return db.blog.findMany({
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

export async function getTrendingBlogs(): Promise<BlogsWithUser[]> {
	return db.blog.findMany({
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

export async function getRelatedBlogs(
	currblogId: string,
	category: string
): Promise<Blog[]> {
	return db.blog.findMany({
		where: {
			category,
			NOT: [{ id: currblogId }],
		},
		take: 3,
	});
}

export async function getBlogsByUserId(userId: string) {
	return db.user
		.findUnique({
			where: {
				id: userId,
			},
		})
		.blogs({
			orderBy: {
				createdAt: "desc",
			},
			include: { user: true },
		});
}
