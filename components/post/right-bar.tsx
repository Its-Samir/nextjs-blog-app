import { cn } from "@/lib/utils";
import SideBarPost from "./sidebar-post";

export default function RightBar({ className, heading }: { className?: string, heading: string }) {
    return (
        <div className={cn("flex-1 md:flex-auto md:w-full", className)}>
            <div className="sticky top-[100px]">
                <h1 className="text-lg">{heading}</h1>
                <SideBarPost title="Testing some title" category="Design" readingTime="" />
                <SideBarPost title="Testing some title" category="Design" readingTime="" />
                <SideBarPost title="Testing some title" category="Design" readingTime="" />
            </div>
        </div>
    )
}
