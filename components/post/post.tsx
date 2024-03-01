import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Dot } from "lucide-react";
import { PostsWithUser } from "@/types";

export default function Post({ title, content, image, category, readingTime, user, createdAt, slug }: PostsWithUser) {
    return (
        <Card className="border-none hover:shadow-md shadow-none p-3 flex flex-col gap-3 w-[18rem] md:w-[100%] rounded-none">
            <div className="w-[100%] md:w-[50%] border-b">
                <Image
                    src={image as string}
                    alt="img"
                    width={500}
                    height={500}
                    style={{ width: "auto", height: "auto" }}
                    priority
                />
            </div>
            <div className="flex gap-1 items-center text-sm text-slate-500 sm:text-xs">
                <span className="text-blue-500">
                    {category.slice(0, 1).toUpperCase() + category.slice(1)}
                </span>
                <Dot size={18} />
                <span>
                    {readingTime}
                </span>
            </div>
            <CardTitle className="text-xl sm:text-base">
                {title}
            </CardTitle>
            <CardContent>
                <CardDescription className="sm:text-xs">
                    {content}
                </CardDescription>
            </CardContent>
            <CardFooter className="p-0 gap-2 text-slate-500 text-sm sm:text-xs">
                <Avatar className="w-7 h-7 sm:w-5 sm:h-5">
                    <AvatarImage src={""} alt="avatar-img" />
                    <AvatarFallback className="bg-slate-400 text-white">
                        {user.username?.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <span>{user.username}</span>
                <Calendar size={12} />
                <span>Nov 7, 2023</span>
            </CardFooter>
        </Card>
    )
}
