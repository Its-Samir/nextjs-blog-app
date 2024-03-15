"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, totalPost }: { page: number, totalPost: number }) {
    const router = useRouter();

    const goToNextPage = () => {
        page++;
        router.push(`?page=${page}`);
    };

    const goToPrevPage = () => {
        page--;
        router.push(`?page=${page}`);
    };

    return (
        <div className="flex items-center gap-2 my-4">
            <Button
                className="flex items-center"
                onClick={goToPrevPage}
                disabled={page === 1 || !page}
            >
                <ChevronLeft size={16} />
            </Button>
            <Button
                disabled={(totalPost / 6) <= page}
                className="flex items-center"
                onClick={goToNextPage}
            >
                <ChevronRight size={16} />
            </Button>
        </div>
    )
}
