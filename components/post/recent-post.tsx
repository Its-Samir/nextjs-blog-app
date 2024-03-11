import { Dot, Timer } from "lucide-react";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { PostsWithUser } from "@/types";
import User from "@/components/profile/user";

export default function RecentPost({ title, category, user, readingTime, createdAt }: PostsWithUser) {
    return (
        <Card className="border-0 shadow-none p-3 flex flex-col gap-3 sm:gap-2 w-max md:w-[100%] rounded-none">
            <div className="flex items-center p-0 gap-2 text-slate-500 text-sm sm:text-xs">
                <User username={user.username as string} />
                <Dot size={18} />
                <span className="text-slate-800">
                    {category.slice(0, 1).toUpperCase() + category.slice(1)}
                </span>
            </div>
            <CardTitle className="text-xl sm:text-lg">
                Lorem ipsum dolor sit amet.
            </CardTitle>
            <CardFooter className="p-0 gap-1 text-slate-500 text-sm sm:text-xs">
                <Timer size={15} />
                <span>2 hours ago</span>
                <Dot size={15} />
                <span>{readingTime}</span>
            </CardFooter>
        </Card>
    )
}
