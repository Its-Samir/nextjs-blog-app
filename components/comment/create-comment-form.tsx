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
import { createCommentFormSchema } from "@/lib/schemas/create-comment-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BeatLoader } from "react-spinners";
import { createComment } from "@/actions/comment/create-comment";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateCommentForm({
	blogId,
	parentId,
	disabled = false,
}: {
	blogId: string;
	parentId?: string;
	disabled?: boolean;
}) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<z.infer<typeof createCommentFormSchema>>({
		resolver: zodResolver(createCommentFormSchema),
		defaultValues: {
			text: "",
		},
	});

	function onFormSubmit(values: z.infer<typeof createCommentFormSchema>) {
		startTransition(() => {
			createComment(values, blogId, parentId)
				.then((data) => {
					if (data && data.error) {
						toast.error(data.error, {
							description:
								data.error === "Unauthorized"
									? "Please login to continue"
									: data.error,
						});
					} else {
						router.refresh();
						form.reset();
						toast.success(data.message);
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
				className="flex flex-col gap-3 w-[30rem] md:w-full"
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
									disabled={isPending || disabled}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className="w-max"
					disabled={isPending || disabled}
					type="submit"
					size={"sm"}
				>
					{isPending ? <BeatLoader color="white" size={8} /> : "Done"}
				</Button>
			</form>
		</Form>
	);
}
