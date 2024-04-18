import { BlogsWithUser } from "@/types";
import { db } from "@/lib/db";
import { Blog } from "@prisma/client";
import { cache } from "react";

export function getAllBlogs(page: number): Promise<BlogsWithUser[]> {
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

export function getBlogsByCategory(category: string): Promise<BlogsWithUser[]> {
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

export function getBlogsBySearchQuery(query: string): Promise<BlogsWithUser[]> {
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

export function getTopBlog(): Promise<BlogsWithUser[]> {
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

export function getRecentBlogs(): Promise<BlogsWithUser[]> {
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

export function getTrendingBlogs() {
	return db.blog.findMany({
		orderBy: {
			likes: "desc",
		},
		take: 3,
	});
}

export const getRelatedBlogs = cache(
	(currblogId: string, category: string): Promise<Blog[]> => {
		return db.blog.findMany({
			where: {
				category,
				NOT: [{ id: currblogId }],
			},
			take: 3,
		});
	}
);

export const getBlogsByUserId = cache((userId: string) => {
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
});

export const getFollowersBlogs = async (userId: string) => {
	const user = await db.user.findUnique({
		where: { id: userId },
		select: { followers: true },
	});

	return db.blog.findMany({
		where: {
			userId: { in: user?.followers },
		},
	});
};
