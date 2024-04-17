"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Blog } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function deleteComment(commentId: string) {
	let blog: Pick<Blog, "slug"> | null;

	try {
		const session = await auth();

		if (!session || !session.user) {
			return { error: "Not authenticated" };
		}

		const comment = await db.comment.findUnique({
			where: { id: commentId },
			select: { id: true, blogId: true },
		});

		if (!comment) {
			return { error: "No comment found" };
		}

		blog = await db.blog.findUnique({
			where: { id: comment.blogId },
			select: { slug: true },
		});

		await db.comment.delete({ where: { id: comment.id } });

	} catch (error) {
		return { error: "Something went wrong" };
	}

	revalidatePath(`/blogs/${blog!.slug}`);
}
