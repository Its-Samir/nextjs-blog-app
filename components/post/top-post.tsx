import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Calendar, Dot, Lightbulb } from "lucide-react";
import { getTopPost } from "@/lib/queries/post";
import User from "@/components/profile/user";

export default async function TopPost() {
    const [topPost] = await getTopPost();

    return (
        <>
            <h1 className="text-2xl text-slate-600 my-4">Top post</h1>

            <Card className="rounded-none border-0 border-b shadow-none flex gap-4 p-3 md:flex-col">
                <div className="w-[22rem] flex-1 md:w-[12rem]">
                    <Image
                        src={topPost.image as string}
                        alt="img"
                        width={500}
                        height={100}
                        style={{ width: "auto", height: "auto" }}
                        priority
                    />
                </div>
                <div className="flex flex-[2] flex-col gap-3 md:gap-2">
                    <div className="flex gap-1 items-center text-sm text-slate-500">
                        <Lightbulb size={12} />
                        <span className="text-slate-800">
                            {topPost.category.slice(0, 1).toUpperCase() + topPost.category.slice(1)}
                        </span>
                        <Dot size={18} />
                        <span>
                            {topPost.readingTime}
                        </span>
                    </div>
                    <CardTitle className="text-3xl md:text-xl">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, nesciunt?
                    </CardTitle>
                    <CardContent>
                        <CardDescription>
                            {topPost.content}
                        </CardDescription>
                    </CardContent>
                    <CardFooter className="p-0 flex-wrap gap-2 text-slate-500 text-sm">
                        <User username={topPost.user.username as string} />
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
