import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HoverProfile from "./hover-profile";

export default function User({ name, username }: { username: string, name: string }) {
	return (
		<HoverProfile name={name} username={username}>
			<div className="flex items-center gap-2 cursor-pointer">
				<Avatar className="w-6 h-6 text-xs sm:w-5 sm:h-5 rounded-md">
					<AvatarImage
						src=""
						alt="avatar-img"
						className="rounded-md"
					/>
					<AvatarFallback className="bg-slate-400 text-white rounded-md">
						{username?.slice(0, 1).toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<span>{name.toUpperCase()}</span>
			</div>
		</HoverProfile>
	);
}
