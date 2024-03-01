import type { Post } from "@prisma/client";

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