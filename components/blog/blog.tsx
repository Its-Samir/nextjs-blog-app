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
			className={`border-0 border-b shadow-none p-3 flex flex-col gap-3 w-[18rem] ${
				!includeImg ? "md:w-full" : "lg:w-full"
			} lg:flex-row rounded-none`}
		>
			{includeImg ? (
				<div className="w-[100%] lg:w-[40%]">
					<Image
						src={image as string}
						alt="img"
						width={500}
						height={500}
						style={{
							width: "auto",
							height: "auto",
							aspectRatio: 16 / 12,
						}}
						priority
					/>
				</div>
			) : null}
			<div
				className={cn("flex flex-col gap-3 sm:gap-2 lg:w-[60%]", className)}
			>
				<div className="flex gap-1 items-center font-sans text-sm text-slate-600 sm:text-xs">
					<Lightbulb size={12} absoluteStrokeWidth />
					<span className="text-slate-500 font-bold">
						{category.slice(0, 1).toUpperCase() + category.slice(1)}
					</span>
					<Dot size={18} />
					<span className="bg-slate-200 text-neutral-800 rounded-sm px-2 truncate">
						{readingTime}
					</span>
				</div>
				<CardTitle className="text-xl sm:text-base font-sans font-bold text-neutral-800">
					<Link href={`/blogs/${slug}`}>
						{title.substring(0, 40).trim()}...
					</Link>
				</CardTitle>
				{includeContent ? (
					<CardContent>
						<CardDescription className="sm:text-xs sm:hidden">
							<Link href={`/blogs/${slug}`}>
								{removeMarkdownTags(content).substring(0, 80).trim()}...
							</Link>
						</CardDescription>
					</CardContent>
				) : null}
				<CardFooter className="p-0 gap-2 text-slate-600 text-sm sm:text-xs">
					<User
						username={user.username as string}
						name={user.name as string}
						image={user.image as string}
					/>
					<Calendar size={12} absoluteStrokeWidth />
					<span className="truncate">{formatTime(createdAt)}</span>
				</CardFooter>
			</div>
		</Card>
	);
}
