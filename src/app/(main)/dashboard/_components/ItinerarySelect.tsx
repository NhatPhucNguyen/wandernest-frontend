"use client";

import { ItineraryStatus } from "@/api/ItineraryAPI";
import { Badge } from "@/components/Badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/Select";
import { Skeleton } from "@/components/Skeleton";
import useUserItineraries from "@/hooks/useUserItineraries";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
export const getStatusBadge = (status: ItineraryStatus) => {
    switch (status) {
        case "DRAFT":
            return (
                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                    Draft
                </Badge>
            );
        case "ACTIVE":
            return (
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    Active
                </Badge>
            );
        case "COMPLETED":
            return (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    Completed
                </Badge>
            );
    }
};
type ItinerarySelectProps = {
    path: string;
};
export default function ItinerarySelect({ path }: ItinerarySelectProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [selectedItinerary, setSelectedItinerary] = useState(
        searchParams.get("itinerary") || ""
    );
    const { itineraries, isLoading } = useUserItineraries();
    const handleItineraryChange = (value: string) => {
        setSelectedItinerary(value);
        router.push(`${path}?itinerary=${value}`);
    };

    // Find the selected itinerary object
    const currentItinerary = itineraries?.find(
        (itinerary) => itinerary.id == selectedItinerary
    );
    return (
        <div className="flex items-center gap-4">
            {isLoading ? (
                <div className="space-y-2">
                    <Skeleton className="h-10 w-[200px]" />
                    <Skeleton className="h-10 w-[200px]" />
                    <Skeleton className="h-10 w-[200px]" />
                </div>
            ) : (
                itineraries && (
                    <Select onValueChange={handleItineraryChange}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue
                                placeholder={
                                    selectedItinerary
                                        ? itineraries.find(
                                              (itinerary) =>
                                                  itinerary.id ==
                                                  selectedItinerary
                                          )?.destination
                                        : "Select Itinerary"
                                }
                            ></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {itineraries.map((itinerary) => (
                                <SelectItem
                                    key={itinerary.id}
                                    value={itinerary.id}
                                >
                                    {itinerary.destination}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )
            )}
            {currentItinerary && getStatusBadge(currentItinerary.status)}
        </div>
    );
}
