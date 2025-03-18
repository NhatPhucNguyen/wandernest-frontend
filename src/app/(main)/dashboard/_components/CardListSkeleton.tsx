import { Skeleton } from "@/components/Skeleton";
import React from "react";

const CardListSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton
                    key={index}
                    className="flex flex-col space-y-4 p-4 border rounded-lg"
                >
                    <Skeleton className="h-40 rounded" />
                    <Skeleton className="h-6 rounded" />
                    <Skeleton className="h-6 rounded w-3/4" />
                </Skeleton>
            ))}
        </div>
    );
};

export default CardListSkeleton;
