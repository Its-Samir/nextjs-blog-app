import { Dot, Heart, MessageCircle } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { BlogsWithUserAndComments } from "@/types";
import RightBar from "./right-bar";
import { Button } from "@/components/ui/button";
import User from "@/components/profile/user";
import { getRelatedBlogs } from "@/lib/queries/blog";
import Link from "next/link";
import CommentList from "../comment/comment-list";
import { getCommentsByBlogId } from "@/lib/queries/comment";
import { auth } from "@/auth";
import CreateCommentForm from "../comment/create-comment-form";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default async function SingleBlog({
	id,
	title,
	content,
	user,
	image,
	category,
	likes,
	comments,
	readingTime,
}: BlogsWithUserAndComments) {
	const session = await auth();

	return (
		<>
			<Card className="rounded-none border-none p-3 shadow-none flex gap-4 md:flex-wrap mt-[1rem] justify-between">
				<div className="flex flex-col gap-5 md:gap-3 w-[40rem]">
					<CardTitle className="text-4xl md:text-xl">{title}</CardTitle>
					<span className="textsm sm:text-xs">Written by -</span>
					<div className="flex items-center gap-2 sm:text-xs flex-wrap">
						<User
							username={user.username as string}
							name={user.name as string}
						/>
						<Dot size={18} />
						<span className="text-slate-500">Nov 6, 2024</span>
						<Dot size={18} />
						<span className="text-slate-500">{readingTime}</span>
					</div>
					<div className="flex gap-3 items-center text-slate-500 sm:text-sm">
						<Heart fill="rgb(255, 15, 150)" color="rgb(255, 15, 150)" />
						<span>{likes.length}</span>
						<MessageCircle />
						<span>{comments.length}</span>
					</div>
				</div>
				<div className="w-[25rem] md:w-[18rem]">
					<Image
						src={image as string}
						alt="img"
						width={500}
						height={100}
						style={{ width: "auto", height: "auto" }}
						priority
					/>
				</div>
			</Card>
			<hr />
			<Card className="flex md:flex-col gap-2 justify-between border-none shadow-none p-3">
				<div className="flex-[3]">
					<ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]}>
						{content}
					</ReactMarkdown>
					<Link href={`/blogs?category=${category}`}>
						<Button className="rounded-full my-4" variant={"outline"}>
							#{category}
						</Button>
					</Link>

					<div className="flex gap-3 items-center text-slate-500 my-5 sm:text-sm">
						<Heart fill="rgb(255, 15, 150)" color="rgb(255, 15, 150)" />
						<span>{likes.length}</span>
						<MessageCircle />
						<span>{comments.length}</span>
					</div>
				</div>
				<RightBar
					getBlogs={() => getRelatedBlogs(id, category)}
					heading="Related blogs"
				/>
			</Card>
			<Card className="border-none shadow-none my-4">
				<CardTitle className="my-4 text-slate-600 md:text-lg">
					Comments ({comments.length})
				</CardTitle>
				<CardContent className="flex flex-col gap-2 items-start my-4">
					{session ? (
						<>
							<User
								name={session.user.name!}
								username={session.user.username}
							/>
							<CreateCommentForm blogId={id} />{" "}
						</>
					) : null}
				</CardContent>
				<CommentList getComments={() => getCommentsByBlogId(id)} />
			</Card>
		</>
	);
}
