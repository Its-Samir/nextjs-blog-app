"use server";

import { z } from "zod";
import { createCommentFormSchema } from "@/lib/schemas/create-comment-schema";
import IActionsReturn from "@/types";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { Blog } from "@prisma/client";

export async function CreateComment(
	values: z.infer<typeof createCommentFormSchema>,
	blogId: string,
	parentId?: string
) {
	let blog: Blog | null;

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

	revalidatePath(`/blogs/${blog.slug}`);
}
