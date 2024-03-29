import { CalendarDays, Dot } from "lucide-react";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { BlogsWithUser } from "@/types";
import User from "@/components/profile/user";
import Link from "next/link";
import { formatTime } from "@/lib/time";

export default function RecentBlog({ slug, title, category, user, readingTime, createdAt }: BlogsWithUser) {
    return (
        <Card className="border-0 border-b shadow-none p-3 flex flex-col gap-3 sm:gap-2 w-[20rem] md:w-full rounded-none">
            <div className="flex items-center p-0 gap-2 text-slate-500 text-sm sm:text-xs">
                <User username={user.username as string} name={user.name as string} />
                <Dot size={18} />
                <span className="text-slate-800">
                    {category.slice(0, 1).toUpperCase() + category.slice(1)}
                </span>
            </div>
            <CardTitle className="text-xl sm:text-lg">
                <Link href={`/blogs/${slug}`}>
                    {title}
                </Link>
            </CardTitle>
            <CardFooter className="p-0 gap-1 text-slate-500 text-sm sm:text-xs">
                <CalendarDays size={15} />
                <span>{formatTime(createdAt)}</span>
                <Dot size={15} />
                <span>{readingTime}</span>
            </CardFooter>
        </Card>
    )
}
