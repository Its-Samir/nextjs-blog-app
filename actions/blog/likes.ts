"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getUserByUsername } from "@/lib/queries/user";
import { Blog } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function likes(username: string, blogId: string) {
	let blog: Blog | null;

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
		});

		if (!blog) {
			return { error: "No blog found" };
		}

		const hasLiked = new Set(blog.likes).has(user.username!);

		if (!hasLiked) {
			blog = await db.blog.update({
				where: { id: blog.id },
				data: {
					likes: { push: user.username! },
				},
			});
		} else {
			blog = await db.blog.update({
				where: { id: blog.id },
				data: {
					likes: blog.likes.filter((id) => id !== user.username),
				},
			});
		}

	} catch (error) {
		return { error: "Something went wrong" };
	}

	revalidatePath(`/blogs/${blog.slug}`);
}
