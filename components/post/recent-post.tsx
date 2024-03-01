import { Calendar, Dot, Timer } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function RecentPost() {
    return (
        <Card className="border-none shadow-none p-3 flex flex-col gap-3 sm:gap-2 w-[20rem] md:w-[100%] rounded-none">
            <div className="flex items-center p-0 gap-2 text-slate-500 text-sm sm:text-xs">
                <Avatar className="w-7 h-7 sm:w-5 sm:h-5">
                    <AvatarImage src="" alt="avatar-img" />
                    <AvatarFallback className="bg-slate-400 text-white">U</AvatarFallback>
                </Avatar>
                <span>Username</span>
                <Dot size={18} />
                <span className="text-blue-500">Design</span>
            </div>
            <CardTitle className="text-xl sm:text-lg">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </CardTitle>
            {/* <CardContent>
                <CardDescription>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque vel quisquam, adipisci, itaque nam...
                </CardDescription>
            </CardContent> */}
            <CardFooter className="p-0 gap-1 text-slate-500 text-sm sm:text-xs">
                <Timer size={15} />
                <span>2 hours ago</span>
                <Dot size={15} />
                <span>12 min read</span>
            </CardFooter>
        </Card>
    )
}
