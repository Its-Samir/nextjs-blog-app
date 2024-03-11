import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Link from "next/link";

export default function HoverProfile({ children, username }: { children: React.ReactNode, username: string }) {
    return (
        <HoverCard openDelay={200}>
            <HoverCardTrigger>
                {children}
            </HoverCardTrigger>
            <HoverCardContent className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                    <Link href={`/users/${username}`}>
                        <div className="flex items-center gap-3">
                            <div className="rounded-full h-8 w-8 bg-green-500" />
                            <div className="flex flex-col text-xs">
                                <span>{username}</span>
                                <span className="text-slate-500">@{username}</span>
                            </div>
                        </div>
                    </Link>
                    <button className="border rounded px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                        Follow
                    </button>
                </div>

                <p className="text-slate-600 text-sm sm:text-xs">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ratione a perferendis suscipit. Ad, obcaecati!
                </p>

                {/* <button className="border rounded px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    Follow
                </button> */}
            </HoverCardContent>
        </HoverCard >
    )
}
