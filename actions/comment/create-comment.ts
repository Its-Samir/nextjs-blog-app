"use server";

import { z } from "zod";
import { createCommentFormSchema } from "@/lib/schemas/create-comment-schema";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { Blog } from "@prisma/client";

export async function createComment(
	values: z.infer<typeof createCommentFormSchema>,
	blogId: string,
	parentId?: string
) {
	let blog: Pick<Blog, "id" | "slug"> | null;

	try {
		const validation = createCommentFormSchema.safeParse(values);

		if (!validation.success) {
			return { error: "Invalid inputs" };
		}

		const session = await auth();

		if (!session || !session.user) {
			return { error: "Unauthorized" };
		}

		const { text } = validation.data;

		blog = await db.blog.findUnique({
			where: { id: blogId },
			select: { id: true, slug: true },
		});

		if (!blog) {
			return { error: "No blog found" };
		}

		if (parentId) {
			const comment = await db.comment.findUnique({
				where: { id: parentId },
			});

			if (!comment) {
				return { error: "No comment found" };
			}

			await db.comment.create({
				data: {
					text,
					user: { connect: { id: session.user.id } },
					blog: { connect: { id: blog.id } },
					parent: { connect: { id: comment.id } },
				},
			});
		} else {
			await db.comment.create({
				data: {
					text,
					user: { connect: { id: session.user.id } },
					blog: { connect: { id: blog.id } },
				},
			});
		}
	} catch (error) {
		return { error: "Something went wrong" };
	}

	// revalidatePath(`/blogs/${blog!.slug}`);

	return { message: "Comment created" };
}
