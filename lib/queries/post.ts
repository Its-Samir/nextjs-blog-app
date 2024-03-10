import { PostsWithUser } from "@/types";
import { db } from "@/lib/db";

export async function getAllPosts(): Promise<PostsWithUser[]> {
    return db.post.findMany({
        include: {
            user: {
                select: { username: true, image: true }
            }
        }
    });
}

export async function getPostsByCategory(category: string): Promise<PostsWithUser[]> {
    return db.post.findMany({
        where: {
            category: category,
        },
        include: {
            user: {
                select: { username: true, image: true }
            }
        }
    });
}

export async function getPostsBySearchQuery(query: string): Promise<PostsWithUser[]> {
    return db.post.findMany({
        where: {
            OR: [
                { title: { contains: query } },
                { content: { contains: query } },
                { category: { contains: query } },
            ]
        },
        include: {
            user: {
                select: { username: true, image: true }
            }
        }
    });
}

export async function getTopPost(): Promise<PostsWithUser[]> {
    return db.post.findMany({
        orderBy: {
            comments: {
                _count: "desc"
            }
        },
        include: {
            user: {
                select: { username: true, image: true }
            }
        },
        take: 1,
    });
}

export async function getRecentPosts(): Promise<PostsWithUser[]> {
    return db.post.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            user: {
                select: { username: true, image: true }
            }
        },
        take: 6,
    });
}