"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getUserByUsername } from "@/lib/queries/user";
import { Blog } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function likes(username: string, blogId: string) {
	let blog: Pick<Blog, "id" | "likes" | "slug"> | null;

	try {
		const session = await auth();

		if (!session || !session.user) {
			return { error: "Not authorized" };
		}

		const user = await getUserByUsername(username);

		if (!user) {
			return { error: "No user found" };
		}

		blog = await db.blog.findUnique({
			where: { id: blogId },
			select: { id: true, slug: true, likes: true },
		});

		if (!blog) {
			return { error: "No blog found" };
		}

		const hasLiked = new Set(blog.likes).has(user.id);

		if (!hasLiked) {
			blog = await db.blog.update({
				where: { id: blog.id },
				data: {
					likes: { push: user.id },
				},
			});
		} else {
			blog = await db.blog.update({
				where: { id: blog.id },
				data: {
					likes: blog.likes.filter((id) => id !== user.id),
				},
			});
		}
	} catch (error) {
		return { error: "Something went wrong" };
	}

	revalidatePath(`/blogs/${blog!.slug}`);
	return { message: "Success" };
}
