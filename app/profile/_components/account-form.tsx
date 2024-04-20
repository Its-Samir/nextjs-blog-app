"use client";

import { useEffect, useState, useTransition } from "react";
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
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function AccountForm({ user }: { user: Session["user"] }) {
	const [file, setFile] = useState<File | null>(null);
	const [image, setImage] = useState<string>("");
	const [isPending, startTransition] = useTransition();
	const [progress, setProgress] = useState<number>(0);

	const form = useForm<z.infer<typeof accountFormSchema>>({
		resolver: zodResolver(accountFormSchema),
		defaultValues: {
			username: user.username || "",
			name: user.name || "",
			bio: user.bio || "",
			avatar: user.image || "",
		},
	});

	function onFormSubmit(values: z.infer<typeof accountFormSchema>) {
		values.avatar = image;

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

	useEffect(() => {
		if (!file) return;

		const storageRef = ref(storage, `files/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const percent =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setProgress(percent);
			},
			(error) => alert(error),
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((url) => {
					setImage(url);
					setFile(null);
				});
			}
		);
	}, [file]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onFormSubmit)}
				className="flex flex-col gap-3 pb-4"
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
							<FormLabel>Bio</FormLabel>
							<FormControl>
								<Textarea
									{...field}
									placeholder="Bio"
									disabled={isPending}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					name="avatar"
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel>Avatar</FormLabel>
							<FormControl>
								<Input
									type="file"
									onChangeCapture={(e) => {
										e.currentTarget.files![0] &&
											setFile(e.currentTarget.files![0]);
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{!image ? <Progress value={progress} /> : null}
				{image ? (
					<div className="w-24 h-24">
						<Image
							src={image}
							alt="profile-img"
							style={{ width: "auto", height: "auto" }}
							width={500}
							height={500}
						/>
					</div>
				) : null}
				<Button
					className="w-max"
					disabled={isPending}
					type="submit"
					size={"lg"}
				>
					{isPending ? <BeatLoader color="white" size={8} /> : "Update"}
				</Button>
			</form>
		</Form>
	);
}
