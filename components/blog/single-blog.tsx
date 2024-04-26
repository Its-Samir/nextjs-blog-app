import { Dot, Edit, Heart, MessageCircle, Trash2 } from "lucide-react";
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
import { likes as likeHandler } from "@/actions/blog/likes";
import { deleteBlog } from "@/actions/blog/delete";
import { formatTime } from "@/lib/time";
import AuthModal from "../auth/auth-modal";

export default async function SingleBlog({
	id,
	title,
	slug,
	content,
	user,
	image,
	category,
	tags,
	likes,
	comments,
	readingTime,
	createdAt,
}: BlogsWithUserAndComments) {
	const session = await auth();

	let likeButtonContent: React.ReactNode;

	if (!session || !session.user) {
		likeButtonContent = (
			<AuthModal>
				<button type="submit">
					<Heart
						size={18}
						fill={
							new Set(likes).has(session?.user.id || "")
								? "rgb(255, 15, 150)"
								: "white"
						}
						color="rgb(255, 15, 150)"
					/>
				</button>
			</AuthModal>
		);
	} else if (session && session.user) {
		likeButtonContent = (
			<form
				action={likeHandler.bind(null, session?.user.username || "", id)}
				className="flex items-center"
			>
				<button type="submit">
					<Heart
						size={18}
						fill={
							new Set(likes).has(session?.user.id || "")
								? "rgb(255, 15, 150)"
								: "white"
						}
						color="rgb(255, 15, 150)"
					/>
				</button>
			</form>
		);
	}

	return (
		<>
			<Card className="rounded-none border-none p-3 font-sans shadow-none flex gap-4 md:flex-wrap mt-[1rem] justify-between">
				<div className="flex flex-col gap-5 md:gap-3 w-[40rem]">
					<CardTitle className="text-4xl font-bold md:text-xl">
						{title}
					</CardTitle>
					<span className="textsm sm:text-xs">Written by -</span>
					<div className="flex items-center gap-2 sm:text-xs flex-wrap">
						<User
							username={user.username as string}
							name={user.name as string}
							image={user.image as string}
						/>
						<Dot size={18} />
						<span className="text-slate-500">
							{formatTime(createdAt)}
						</span>
						<Dot size={18} />
						<span className="text-slate-500">{readingTime}</span>
					</div>
					<div className="flex gap-2 items-center text-slate-600 sm:text-sm">
						{likeButtonContent}
						<span>{likes.length}</span>
						<MessageCircle size={18} />
						<span>{comments.length}</span>
					</div>
					{session &&
					session.user &&
					session.user.username === user.username ? (
						<div className="flex gap-3 items-center text-slate-500 sm:text-sm">
							<Button variant={"secondary"} size={"sm"}>
								<Link href={`/blogs/${slug}/edit`}>
									<Edit size={18} />
								</Link>
							</Button>
							<form action={deleteBlog.bind(null, id, true)}>
								<Button variant={"destructive"} size={"sm"}>
									<Trash2 size={18} />
								</Button>
							</form>
						</div>
					) : null}
				</div>
				<div className="w-[25rem] md:w-[100%]">
					{image ? (
						<Image
							src={image as string}
							alt="img"
							width={500}
							height={100}
							style={{
								width: "auto",
								height: "auto",
								aspectRatio: 16 / 9,
							}}
							priority
						/>
					) : (
						<div
							className="animate-pulse bg-slate-400 w-full"
							style={{ aspectRatio: 16 / 10 }}
						/>
					)}
				</div>
			</Card>
			<hr />
			<Card className="flex md:flex-col gap-2 justify-between border-none shadow-none p-3">
				<div className="flex-[3]">
					<ReactMarkdown className="markdown" remarkPlugins={[remarkGfm]}>
						{content}
					</ReactMarkdown>
					<div className="flex flex-wrap items-center gap-2">
						<Link href={`/blogs?category=${category}`}>
							<Button
								size={"sm"}
								className="rounded-full"
								variant={"outline"}
							>
								#{category}
							</Button>
						</Link>
						{tags.map((t) => (
							<Button
								key={t}
								size={"sm"}
								className="rounded-full"
								variant={"outline"}
							>
								{t}
							</Button>
						))}
					</div>
					<div className="flex gap-2 items-center text-slate-600 my-5 sm:text-sm">
						{likeButtonContent}
						<span>{likes.length}</span>
						<MessageCircle size={18} />
						<span>{comments.length}</span>
					</div>
				</div>
				<RightBar
					getBlogs={() => getRelatedBlogs(id, category)}
					heading="Related blogs"
				/>
			</Card>
			<Card className="border-none shadow-none my-4">
				<CardTitle className="my-4 text-neutral-800 font-sans md:text-lg">
					Comments ({comments.length})
				</CardTitle>
				<CardContent className="flex flex-col gap-2 items-start my-4">
					{session ? (
						<>
							<User
								name={session.user.name!}
								username={session.user.username}
								image={session.user.image!}
							/>
							<CreateCommentForm blogId={id} />{" "}
						</>
					) : (
						<>
							<span className="text-slate-700 text-lg font-sans font-semibold">
								Login to write your comment about this post.
							</span>
							<CreateCommentForm disabled blogId={id} />{" "}
						</>
					)}
				</CardContent>
				<CommentList getComments={() => getCommentsByBlogId(id)} />
			</Card>
		</>
	);
}
