import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Dot, Heart, MessageCircle, ThumbsUp } from "lucide-react";
import Image from "next/image";

export default function PostPage({ params }: { params: { slug: string } }) {
    return (
        <>
            <Card className="rounded-none border-none p-3 shadow-none flex gap-4 flex-wrap-reverse mt-[1rem] justify-between">
                <div className="flex flex-col gap-5 md:gap-3 w-[40rem]">
                    <CardTitle className="text-4xl md:text-xl">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat aspernatur dolore cum!
                    </CardTitle>
                    <div className="flex items-center gap-2 sm:text-xs flex-wrap">
                        <Avatar className="md:w-6 md:h-6">
                            <AvatarImage src="" alt="avatar-img" />
                            <AvatarFallback className="bg-slate-400 text-white">{"u"}</AvatarFallback>
                        </Avatar>
                        <span>{"Username"}</span>
                        <Dot size={18} />
                        <em>Nov 6, 2024</em>
                        <Dot size={18} />
                        <em>12 min read</em>
                    </div>
                    <div className="flex gap-3 items-center text-slate-500 sm:text-sm">
                        <Heart fill="rgb(255, 15, 150)" color="rgb(255, 15, 150)" />
                        <span>12</span>
                        <MessageCircle />
                        <span>10</span>
                    </div>
                </div>
                <div className="w-[25rem] md:w-[18rem]">
                    <Image
                        src={"/header-image.jpg"}
                        alt="img"
                        width={500}
                        height={100}
                        style={{ width: "auto", height: "auto" }}
                        priority
                    />
                </div>
            </Card>
            <hr />
            <Card className="border-none shadow-none p-3">
                <CardContent>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi dicta mollitia optio doloremque iusto consequatur error odit, at nemo maiores in odio? Aliquid, rem suscipit deleniti eveniet omnis molestias consequuntur voluptatibus, vero harum nesciunt numquam repellendus, commodi expedita adipisci mollitia? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit, hic. Eius illum sint at sit error minus corrupti asperiores excepturi dolorem, repellendus laborum odit reiciendis ut nostrum maiores, ullam, molestias possimus rem nobis deleniti aliquid necessitatibus maxime magni adipisci! Veritatis quibusdam esse libero rem perferendis voluptate sapiente distinctio, iure neque aspernatur obcaecati cupiditate sequi nobis iusto natus cum sed eveniet ducimus cumque explicabo? Facere sunt odit qui repellendus dicta cumque eligendi quibusdam aspernatur! Labore ea atque repudiandae voluptatem esse? Enim.
                </CardContent>
                <div className="flex gap-3 items-center text-slate-500 my-5 sm:text-sm">
                    <Heart fill="rgb(255, 15, 150)" color="rgb(255, 15, 150)" />
                    <span>12</span>
                    <MessageCircle />
                    <span>10</span>
                </div>
            </Card>
        </>
    )
}
