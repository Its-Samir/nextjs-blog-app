import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Calendar, Dot, Lightbulb } from "lucide-react";
import { PostsWithUser } from "@/types";
import Link from "next/link";
import User from "@/components/profile/user";

export default function Post({ title, content, image, category, readingTime, user, createdAt, slug }: PostsWithUser) {
    return (
        <Card className="border-0 border-b hover:shadow-md shadow-none p-3 flex flex-col gap-3 w-[18rem] md:w-[100%] md:flex-row rounded-none">
            <div className="w-[100%] md:w-[40%]">
                <Image
                    src={image as string}
                    alt="img"
                    width={500}
                    height={500}
                    style={{ width: "auto", height: "auto" }}
                    priority
                />
            </div>
            <div className="flex flex-col gap-3 sm:gap-2">
                <div className="flex gap-1 items-center text-sm text-slate-500 sm:text-xs">
                    <Lightbulb size={12} />
                    <span className="text-slate-800">
                        {category.slice(0, 1).toUpperCase() + category.slice(1)}
                    </span>
                    <Dot size={18} />
                    <span>
                        {readingTime}
                    </span>
                </div>
                <CardTitle className="text-xl sm:text-base">
                    <Link href={`/posts/${slug}`}>
                        Lorem ipsum dolor sit amet.
                    </Link>
                </CardTitle>
                <CardContent>
                    <CardDescription className="sm:text-xs sm:hidden">
                        <Link href={`/posts/${slug}`}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor, aperiam!
                        </Link>
                    </CardDescription>
                </CardContent>
                <CardFooter className="p-0 gap-2 text-slate-500 text-sm sm:text-xs">
                    <User username={user.username as string} />
                    <Calendar size={12} />
                    <span>Nov 7, 2023</span>
                </CardFooter>
            </div>
        </Card>
    )
}
