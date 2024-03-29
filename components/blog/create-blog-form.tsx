"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateBlogFormSchema } from "@/lib/schemas/blog-form-schema";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { z } from "zod";
import dynamic from 'next/dynamic'
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })
import "easymde/dist/easymde.min.css";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { storage } from "@/lib/firebase";
import { Progress } from "@/components/ui/progress";
import { createBlog } from "@/actions/blog/create-blog";
import { toast } from "sonner";

export default function CreateBlogForm() {
	const [file, setFile] = useState<File | null>(null);
	const [image, setImage] = useState<string>("");
	const [progress, setProgress] = useState<number>(0);
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof CreateBlogFormSchema>>({
		resolver: zodResolver(CreateBlogFormSchema),
		defaultValues: {
			title: "",
			content: "",
			image: "",
			category: "",
		},
	});

	function onFormSubmit(values: z.infer<typeof CreateBlogFormSchema>) {
		values.image = image;

		startTransition(() => {
			createBlog(values)
				.then((data) => {
					if (data && data.error) {
						toast.error(data.error, {
							description:
								data.error === "Unauthorized"
									? "Please login to continue"
									: data.error,
						});
					} else {
						toast.success("Blog created");
					}
				})
				.catch((err) => {
					toast.error(err.message);
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
		<Card className="shadow-none w-full border-none mt-[1rem]">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onFormSubmit)}
					className="flex flex-col gap-3"
				>
					<div className="flex justify-between items-center">
						<FormField
							name="category"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange}>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="Select a category" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>
														Category
													</SelectLabel>
													<SelectItem value="design">
														Design
													</SelectItem>
													<SelectItem value="health">
														Health
													</SelectItem>
													<SelectItem value="development">
														Development
													</SelectItem>
													<SelectItem value="accounting">
														Accounting
													</SelectItem>
													<SelectItem value="others">
														Others
													</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							size={"sm"}
							className="flex items-center gap-1 uppercase"
							disabled={isPending}
						>
							<Plus size={18} /> Create
						</Button>
					</div>
					<FormField
						name="title"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input
										{...field}
										placeholder="Your blog title"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="content"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Content</FormLabel>
								<FormControl>
									<SimpleMDE
										{...field}
										placeholder="Enter content"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						name="image"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Image</FormLabel>
								<FormControl>
									<Input
										{...field}
										onChangeCapture={(e) => {
											e.currentTarget.files![0] &&
												setFile(
													e.currentTarget.files![0]
												);
										}}
										type="file"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</form>
				<div className="mt-[0.5rem]">
					{image ? (
						<img src={image} alt="img" width={"100%"} />
					) : (
						<Progress value={progress} />
					)}
				</div>
			</Form>
		</Card>
	);
}
