"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSearchParams, useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab");
    const router = useRouter();

    const tabPaths: { name: string, path: string }[] = [
        { name: "Account", path: "account" },
        { name: "Settings", path: "settings" },
    ];

    function handleTabNavigation(path: string) {
        router.push(`?tab=${path}`);
    }

    return (
        <div className="w-[40rem] mx-auto md:w-auto">
            <Card className="flex flex-col gap-4 border-0 border-b shadow-none py-2 rounded-none">
                <Avatar className="w-[5rem] h-[5rem]">
                    <AvatarImage src="" alt="" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex items-end gap-4 justify-between text-slate-500">
                    <div className="flex flex-col gap-2 justify-end">
                        <span className="text-slate-700 font-semibold">Username</span>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit molestiae dolor odit necessitatibus optio. Fuga?</p>
                        <div className="flex gap-2">
                            <span><b>0</b> following</span>
                            <span><b>0</b> followers</span>
                        </div>
                    </div>
                    <Button size={"sm"} className="rounded-full">Follow</Button>
                </div>
            </Card>
            <div className="flex items-center gap-2 border-0 border-b my-2 py-2 rounded-none">
                {tabPaths.map(t => (
                    <Button
                        key={t.path}
                        onClick={() => handleTabNavigation(t.path)}
                        variant={t.path === tab ? "default" : "outline"}
                        size={"sm"}
                    >
                        {t.name}
                    </Button>
                ))}
            </div>
            {children}
        </div>
    )
}
