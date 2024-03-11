import { Suspense } from "react";
import { cn } from "@/lib/utils";
import SideBarPost from "./sidebar-post";
import { type Post } from "@prisma/client";

interface RightBarProps {
    className?: string,
    heading: string,
    getPosts: () => Promise<Post[]>
}

export default async function RightBar({ className, heading, getPosts }: RightBarProps) {
    const posts = await getPosts();

    return (
        <div className={cn("flex-1 md:flex-auto md:w-full", className)}>
            <div className="sticky top-[100px]">
                <h1 className="text-lg">{heading}</h1>
                <Suspense fallback={<p>Loading...</p>}>
                    {posts.map(post => (
                        <SideBarPost
                            key={post.id}
                            title={post.title}
                            slug={post.slug}
                            category={post.category}
                            readingTime={post.readingTime}
                        />
                    ))}
                </Suspense>
            </div>
        </div>
    )
}
