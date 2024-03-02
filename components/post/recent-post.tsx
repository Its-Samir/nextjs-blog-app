import { Calendar, Dot, Timer } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostsWithUser } from "@/types";
import HoverProfile from "../profile/hover-profile";

export default function RecentPost({ title, category, user, readingTime, createdAt }: PostsWithUser) {
    return (
        <Card className="border-none shadow-none p-3 flex flex-col gap-3 sm:gap-2 w-max md:w-[100%] rounded-none">
            <div className="flex items-center p-0 gap-2 text-slate-500 text-sm sm:text-xs">
                <HoverProfile>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Avatar className="w-7 h-7 sm:w-5 sm:h-5">
                            <AvatarImage src="" alt="avatar-img" />
                            <AvatarFallback className="bg-slate-400 text-white">{user.username?.slice(0, 1).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span>{user.username}</span>
                    </div>
                </HoverProfile>
                <Dot size={18} />
                <span className="text-blue-500">{category}</span>
            </div>
            <CardTitle className="text-xl sm:text-lg">
                {title}
            </CardTitle>
            {/* <CardContent>
                <CardDescription>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque vel quisquam, adipisci, itaque nam...
                </CardDescription>
            </CardContent> */}
            <CardFooter className="p-0 gap-1 text-slate-500 text-sm sm:text-xs">
                <Timer size={15} />
                <span>2 hours ago</span>
                <Dot size={15} />
                <span>{readingTime}</span>
            </CardFooter>
        </Card>
    )
}
