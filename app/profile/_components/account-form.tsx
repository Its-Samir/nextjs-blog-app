"use client";

import { useState, useTransition } from "react";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { accountFormSchema } from "@/lib/schemas/account-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";
import { updateUser } from "@/actions/user/update";
import { toast } from "sonner";
import { Session } from "@auth/core/types";

export default function AccountForm({ user }: { user: Session["user"] }) {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof accountFormSchema>>({
		resolver: zodResolver(accountFormSchema),
		defaultValues: {
			username: user.username || "",
			name: user.name || "",
			bio: user.bio || "",
		},
	});

	function onFormSubmit(values: z.infer<typeof accountFormSchema>) {
		startTransition(() => {
			updateUser(values)
				.then((data) => {
					if (data && data.error) {
						toast.error(data.error, {
							description:
								data.error === "Not authenticated"
									? "Please login to continue"
									: "An error occurred, try later",
						});
					} else {
						toast.success("Profile updated");
					}
				})
				.catch((err) => {
					toast.error("Error occurred", {
						description: "An error occurred, try later",
					});
				});
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onFormSubmit)}
				className="flex flex-col gap-3"
			>
				<FormField
					name="username"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="ItsJohn"
									disabled={isPending}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="name"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="John"
									disabled={isPending}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="bio"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel className="flex justify-between items-center">
								Bio
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									placeholder="Bio"
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
						isPending ? (
							<BeatLoader color="white" size={8} />
						) : (
							"Update"
						)
					}
					size={"lg"}
				/>
			</form>
		</Form>
	);
}
