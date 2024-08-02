"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Edit, Loader2, Plus } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogFormSchema } from "@/lib/schemas/blog-form-schema";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { z } from "zod";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { randomBytes } from "crypto";
import { storage } from "@/lib/firebase";
import { Progress } from "@/components/ui/progress";
import { createOrUpdateBlog } from "@/actions/blog/create-or-update-blog";
import { toast } from "sonner";
import { Blog } from "@prisma/client";
import { BeatLoader } from "react-spinners";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
	ssr: false,
	loading: () => <Loader2 />,
});
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BlogForm({ blog }: { blog?: Blog }) {
	const [file, setFile] = useState<File | null>(null);
	const [image, setImage] = useState<string>(blog ? blog.image! : "");
	const [progress, setProgress] = useState<number>(0);
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const form = useForm<z.infer<typeof blogFormSchema>>({
		resolver: zodResolver(blogFormSchema),
		defaultValues: {
			title: blog ? blog.title : "",
			content: blog ? blog.content : "",
			tags: blog ? blog.tags : [],
			image: blog ? blog.image! : "",
			category: blog ? blog.category : "",
		},
	});

	function onFormSubmit(values: z.infer<typeof blogFormSchema>) {
		values.image = image;

		startTransition(() => {
			createOrUpdateBlog(values, blog)
				.then((data) => {
					if (data && data.error) {
						toast.error(data.error, {
							description:
								data.error === "Not authenticated"
									? "Please login to continue"
									: data.error === "Unauthorized"
									? "You are not permitted for this action"
									: data.error,
						});
					} else {
						toast.success(blog ? "Blog Updated" : "Blog Created");
						router.push(`/blogs/${data.slug}`);
					}
				})
				.catch((err) => {
					toast.error(err.message);
				});
		});
	}

	useEffect(() => {
		if (!file) return;

		const storageRef = ref(
			storage,
			`files/${file.name}-${randomBytes(6).toString("hex")}`
		);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const percent =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setProgress(percent);
			},
			(error) => alert(error.message),
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
					<div className="flex justify-between">
						<FormField
							name="category"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger className="w-[180px]">
												<SelectValue placeholder="Select a category" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Category</SelectLabel>
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
							aria-label="Submit form"
						>
							{isPending ? (
								<BeatLoader color="white" size={8} />
							) : blog ? (
								<>
									<Edit size={18} /> Update
								</>
							) : (
								<>
									<Plus size={18} /> Create
								</>
							)}
						</Button>
					</div>
					<FormField
						name="title"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input {...field} placeholder="Your blog title" />
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
										onChange={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						name="tags"
						control={form.control}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tags</FormLabel>
								<FormControl>
									<TagsInput
										onChange={field.onChange}
										value={field.value!}
										maxTags={4}
										onlyUnique
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{!blog ? (
						<FormField
							name="image"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Image</FormLabel>
									<FormControl>
										<Input
											{...field}
											accept="image/*"
											onChangeCapture={(e) => {
												e.currentTarget.files![0] &&
													setFile(e.currentTarget.files![0]);
											}}
											type="file"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					) : (
						<Input
							onChange={(e) => {
								e.currentTarget.files![0] &&
									setFile(e.currentTarget.files![0]);
							}}
							type="file"
						/>
					)}
				</form>
				<div className="mt-[0.5rem]">
					{image ? (
						<Image
							src={image}
							alt="img"
							width={500}
							height={500}
							style={{ width: "auto", height: "auto" }}
						/>
					) : (
						<Progress value={progress} />
					)}
				</div>
			</Form>
		</Card>
	);
}
