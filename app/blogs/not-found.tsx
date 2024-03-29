import { Card } from "@/components/ui/card";

export default function BlogNotFoundPage() {
    return (
        <Card className='w-full h-[80vh] flex flex-col items-center justify-center border-none shadow-none'>
            <h1 className="text-[6rem] text-slate-700 -my-[1rem]">404</h1>
            <p className="text-slate-500 text-xl -my-[1rem] bg-white uppercase">Blog not found</p>
        </Card>
    )
}
