import type { Comment, Post } from "@prisma/client";

export default interface IActionsReturn {
    error?: string;
    success?: string;
}

export type TabDetailsType = {
    name: string;
    path: string;
    icon: React.ReactNode;
}

export type PostsWithUser = Post & {
    user: { username: string | null, image: string | null }
}

export type PostsWithUserAndComments = Post & {
    user: { username: string | null, image: string | null },
    comments: Comment[]
}