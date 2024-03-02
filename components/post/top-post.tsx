import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Calendar, Dot } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTopPost } from "@/lib/queries/post";

export default async function TopPost() {
    const [topPost] = await getTopPost();

    return (
        <>
            <h1 className="text-2xl text-slate-600 my-4">Top post</h1>

            <Card className="rounded-none border shadow-none flex gap-4 p-3 md:flex-row-reverse md:justify-between items-center">
                <div className="w-[22rem] md:w-[12rem]">
                    <Image
                        src={topPost.image as string}
                        alt="img"
                        width={500}
                        height={100}
                        style={{ width: "auto", height: "auto" }}
                        priority
                    />
                </div>
                <div className="flex flex-col gap-3 md:gap-2">
                    <div className="flex gap-1 items-center text-sm text-slate-500 sm:text-xs">
                        <span className="text-blue-500">
                            {topPost.category}
                        </span>
                        <Dot size={18} />
                        <span>
                            {topPost.readingTime}
                        </span>
                    </div>
                    <CardTitle className="text-wrap text-4xl md:text-lg">
                        {topPost.title}
                    </CardTitle>
                    <CardContent className="md:hidden">
                        <CardDescription>
                            {topPost.content}
                        </CardDescription>
                    </CardContent>
                    <CardFooter className="p-0 flex-wrap gap-2 text-slate-500 text-sm md:text-xs">
                        <Avatar className="w-7 h-7 sm:w-5 sm:h-5">
                            <AvatarImage src="" alt="avatar-img" />
                            <AvatarFallback className="bg-slate-400 text-white">{topPost.user.username?.slice(0, 1).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span>{topPost.user.username}</span>
                        <div className="flex items-center gap-2 sm:hidden">
                            <Calendar size={12} />
                            <span>Nov 7, 2023</span>
                        </div>
                    </CardFooter>
                </div>
            </Card>
        </>
    )
}
