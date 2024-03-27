import SinglePost from "@/components/post/single-post";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function PostPage({ params }: { params: { slug: string } }) {
    const post = await db.post.findUnique({
        where: { slug: params.slug },
        include: {
            user: {
                select: { name: true, username: true, image: true }
            },
            comments: true
        }
    });

    if (!post) {
        notFound();
    }

    return (
        <SinglePost {...post} />
    )
}
