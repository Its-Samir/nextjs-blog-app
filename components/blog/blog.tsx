import Image from "next/image";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle,
} from "@/components/ui/card";
import { Calendar, Dot, Lightbulb } from "lucide-react";
import { BlogsWithUser } from "@/types";
import Link from "next/link";
import User from "@/components/profile/user";
import { formatTime } from "@/lib/time";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import removeMarkdownTags from "@/lib/remove-markdown-tags";

type BlogPropsType = BlogsWithUser & {
	className?: string;
	includeImg?: boolean;
	includeContent?: boolean;
};

export default function Blog({
	title,
	content,
	image,
	category,
	readingTime,
	user,
	createdAt,
	slug,
	className,
	includeImg = true,
	includeContent = true,
}: BlogPropsType) {
	return (
		<Card
			className={cn(
				`border-0 border-b shadow-none p-3 flex flex-col gap-3 w-[18rem] ${
					!includeImg ? "md:w-full" : "lg:w-full"
				} lg:flex-row rounded-none`,
				className
			)}
		>
			{includeImg ? (
				<div className="w-[100%] lg:w-[40%]">
					<Image
						src={image as string}
						alt="img"
						width={500}
						height={500}
						style={{ width: "auto", height: "auto", aspectRatio: 16/9 }}
						priority
					/>
				</div>
			) : null}
			<div className="flex flex-col gap-3 sm:gap-2">
				<div className="flex gap-1 items-center text-sm text-slate-500 sm:text-xs">
					<Lightbulb size={12} />
					<span className="text-slate-800">
						{category.slice(0, 1).toUpperCase() + category.slice(1)}
					</span>
					<Dot size={18} />
					<span>{readingTime}</span>
				</div>
				<CardTitle className="text-xl sm:text-base">
					<Link href={`/blogs/${slug}`}>{title.substring(0, 45)}...</Link>
				</CardTitle>
				{includeContent ? (
					<CardContent>
						<CardDescription className="sm:text-xs sm:hidden">
							<Link href={`/blogs/${slug}`}>
								{removeMarkdownTags(content).substring(0, 80)}...
							</Link>
						</CardDescription>
					</CardContent>
				) : null}
				<CardFooter className="p-0 gap-2 text-slate-500 text-sm sm:text-xs">
					<User
						username={user.username as string}
						name={user.name as string}
					/>
					<Calendar size={12} />
					<span>{formatTime(createdAt)}</span>
				</CardFooter>
			</div>
		</Card>
	);
}
