import { Card } from "@/components/ui/card";
import Socials from "./socials";

interface WrapperProps {
    children: React.ReactNode,
    header: string,
    text: string,
    url: string,
    social?: boolean,
}

export default function Wrapper({ children, header, text, url, social = true }: WrapperProps) {
    return (
        <Card className="flex items-center justify-center w-full h-[80vh] border-none shadow-none">
            <div className="w-[30rem] md:w-[100%] md:px-[1rem]">
                <h1 className="uppercase text-center font-semibold text-2xl sm:text-lg text-slate-800 my-2">
                    {header}
                </h1>
                <div>
                    {children}
                </div>
                {social ? <Socials /> : null}
                <p className="text-slate-600 my-3 text-center">
                    {text}
                    <a href={`${url}`}>{" "}
                        Click here.
                    </a>
                </p>
            </div>
        </Card>
    )
}
