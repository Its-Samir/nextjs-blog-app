"use client";

import { useTransition } from "react";
import { Button } from "../ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateCommentFormSchema } from "@/lib/schemas/create-comment-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BeatLoader } from "react-spinners";
import { CreateComment } from "@/actions/comment/create-comment";
import { toast } from "sonner";

export default function CreateCommentForm({
	blogId,
	parentId,
}: {
	blogId: string;
	parentId?: string;
}) {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof CreateCommentFormSchema>>({
		resolver: zodResolver(CreateCommentFormSchema),
		defaultValues: {
			text: "",
		},
	});

	function onFormSubmit(values: z.infer<typeof CreateCommentFormSchema>) {
		startTransition(() => {
			CreateComment(values, blogId, parentId)
				.then((data) => {
					if (data && data.error) {
						toast.error(data.error, {
							description:
								data.error === "Unauthorized"
									? "Please login to continue"
									: data.error,
						});
					} else {
						toast.success("Comment created");
						form.reset();
					}
				})
				.catch((err) => {
					toast.error(err.message);
				});
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onFormSubmit)}
				className="flex flex-col gap-3 w-full"
			>
				<FormField
					name="text"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel></FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder={`Write here`}
									disabled={isPending}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className="w-max"
					disabled={isPending}
					type="submit"
					children={
						isPending ? <BeatLoader color="white" size={8} /> : "Done"
					}
					size={"sm"}
				/>
			</form>
		</Form>
	);
}
