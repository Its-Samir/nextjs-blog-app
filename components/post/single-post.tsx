import { Dot, Heart, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { PostsWithUserAndComments } from "@/types";
import RelatedPost from "./sidebar-post";
import RightBar from "./right-bar";

export default function SinglePost({ title, content, user, image, category, likes, comments, readingTime }: PostsWithUserAndComments) {
    return (
        <>
            <Card className="rounded-none border-none p-3 shadow-none flex gap-4 md:flex-wrap mt-[1rem] justify-between">
                <div className="flex flex-col gap-5 md:gap-3 w-[40rem]">
                    <CardTitle className="text-4xl md:text-xl">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    </CardTitle>
                    <span className="textsm sm:text-xs">Written by -</span>
                    <div className="flex items-center gap-2 sm:text-xs flex-wrap">
                        <Avatar className="md:w-6 md:h-6">
                            <AvatarImage src="" alt="avatar-img" />
                            <AvatarFallback className="bg-slate-400 text-white">{"u"}</AvatarFallback>
                        </Avatar>
                        <span>{user.username}</span>
                        <Dot size={18} />
                        <em>Nov 6, 2024</em>
                        <Dot size={18} />
                        <em>{readingTime}</em>
                    </div>
                    <div className="flex gap-3 items-center text-slate-500 sm:text-sm">
                        <Heart fill="rgb(255, 15, 150)" color="rgb(255, 15, 150)" />
                        <span>{likes.length}</span>
                        <MessageCircle />
                        <span>{comments.length}</span>
                    </div>
                </div>
                <div className="w-[25rem] md:w-[18rem]">
                    <Image
                        src={image as string}
                        alt="img"
                        width={500}
                        height={100}
                        style={{ width: "auto", height: "auto" }}
                        priority
                    />
                </div>
            </Card>
            <hr />
            <Card className="flex md:flex-col gap-2 justify-between border-none shadow-none p-3">
                <div className="flex-[3]">
                    <CardContent>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio reiciendis soluta, non corporis fugiat quibusdam expedita molestiae. Quam exercitationem recusandae officiis maiores voluptates, soluta maxime quae optio! Hic sunt unde esse fugiat illum nemo non harum aspernatur sint rerum assumenda adipisci alias exercitationem ullam, illo quo similique obcaecati repudiandae ex itaque eveniet perspiciatis. Voluptates doloribus harum architecto quasi officia quia dolore corrupti mollitia cum maiores, odit saepe amet libero blanditiis a quisquam neque molestias ullam dolores dolor quo magnam consequuntur? Quam blanditiis quos odit atque nemo rem ipsam consequatur deleniti minima accusamus molestiae at natus autem, ut vel tempora suscipit!
                    </CardContent>
                    <div className="flex gap-3 items-center text-slate-500 my-5 sm:text-sm">
                        <Heart fill="rgb(255, 15, 150)" color="rgb(255, 15, 150)" />
                        <span>{likes.length}</span>
                        <MessageCircle />
                        <span>{comments.length}</span>
                    </div>
                </div>
                <RightBar heading="Related posts" />
            </Card>
            <Card>
                <CardTitle>Comments ({comments.length})</CardTitle>
            </Card>
        </>
    )
}
