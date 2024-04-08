import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HoverProfile from "./hover-profile";
import Link from "next/link";

export default function User({
	name,
	username,
	image,
}: {
	username: string;
	image?: string;
	name: string;
}) {
	return (
		<HoverProfile name={name} username={username}>
			<div className="flex items-center gap-2 cursor-pointer">
				<Avatar className="w-6 h-6 text-xs sm:w-5 sm:h-5 rounded-md">
					<AvatarImage src={image || ""} alt="avatar-img" className="rounded-md" />
					<AvatarFallback className="bg-slate-400 text-white rounded-md">
						{username?.slice(0, 1).toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<Link href={`/profile/${username}`}>
					{" "}
					<span>{name.toUpperCase()}</span>
				</Link>
			</div>
		</HoverProfile>
	);
}
