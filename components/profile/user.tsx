import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HoverProfile from "./hover-profile";

export default function User({ username }: { username: string }) {
    return (
        <HoverProfile username={username}>
            <div className="flex items-center gap-2 cursor-pointer">
                <Avatar className="w-7 h-7 sm:w-5 sm:h-5">
                    <AvatarImage src="" alt="avatar-img" />
                    <AvatarFallback className="bg-slate-400 text-white">{username?.slice(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span>{username}</span>
            </div>
        </HoverProfile>
    )
}
