import { Skeleton } from "@/components/Skeleton";
import React from "react";

const ItineraryListSkeleton: React.FC = () => {
  return (
    <div className="mx-auto py-10 max-w-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-full">
      <h1 className="text-2xl font-bold mb-4">
        <Skeleton className="h-8 w-1/2" />
      </h1>
      <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="w-[50px]"></th>
              <th><Skeleton className="h-6 w-24" /></th>
              <th><Skeleton className="h-6 w-24" /></th>
              <th><Skeleton className="h-6 w-24" /></th>
              <th><Skeleton className="h-6 w-24" /></th>
              <th><Skeleton className="h-6 w-24" /></th>
              <th><Skeleton className="h-6 w-24" /></th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 3 }).map((_, index) => (
              <tr key={index}>
                <td><Skeleton className="h-6 w-6" /></td>
                <td><Skeleton className="h-6 w-32" /></td>
                <td><Skeleton className="h-6 w-48" /></td>
                <td><Skeleton className="h-6 w-16" /></td>
                <td><Skeleton className="h-6 w-20" /></td>
                <td><Skeleton className="h-6 w-24" /></td>
                <td><Skeleton className="h-6 w-20" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItineraryListSkeleton;