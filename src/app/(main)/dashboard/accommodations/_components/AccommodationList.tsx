"use client";

import { getAccommodationsNearby } from "@/api/AccommodationAPI";
import { Button } from "@/components/Button";
import { useSavedAccommodations } from "@/context/AccommodationsProvider";
import { usePlaceFilters } from "@/hooks/usePlaceFilters";
import useUserItineraries from "@/hooks/useUserItineraries";
import { BookOpen, Heart } from "lucide-react";
import useSwr from "swr";
import CardListSkeleton from "../../_components/CardListSkeleton";
import { getStatusBadge } from "../../_components/ItinerarySelect";
import AccommodationCard from "./AccommodationCard";

export default function AccommodationList() {
    const { savedAccommodations, toggleSavedAccommodation } =
        useSavedAccommodations();
    const { currentItinerary, selectedItinerary } = useUserItineraries();
    const {
        data: accommodations,
        isLoading,
        error,
    } = useSwr(`/api/accommodations?itinerary=${selectedItinerary}`, () =>
        getAccommodationsNearby(selectedItinerary)
    );
    const {
        showSavedOnly,
        showBookableOnly,
        setShowBookableOnly,
        setShowSavedOnly,
    } = usePlaceFilters();
    const filteredAccommodations = accommodations?.filter((accommodation) => {
        if (showSavedOnly) {
            return accommodation.saved;
        }
        if (showBookableOnly) {
            return accommodation.websiteUri !== null;
        }
        return true;
    });
    if (isLoading) {
        return <CardListSkeleton />;
    }
    if (error) {
        return (
            <div className="text-center py-10">
                <p className="text-lg font-semibold">
                    No accommodations found.
                </p>
                <p className="text-gray-500">
                    Please try adjusting your search criteria.
                </p>
            </div>
        );
    }
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-semibold">
                        {currentItinerary
                            ? currentItinerary.destination
                            : "Please select an itinerary to see accommodations"}
                    </h2>
                    {currentItinerary &&
                        getStatusBadge(currentItinerary.status)}
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={showBookableOnly ? "secondary" : "outline"}
                        onClick={() => setShowBookableOnly(!showBookableOnly)}
                        className="flex items-center gap-2"
                    >
                        <BookOpen className="w-4 h-4" />
                        {showBookableOnly ? "Show All" : "Bookable Only"}
                    </Button>
                    <Button
                        variant={showSavedOnly ? "secondary" : "outline"}
                        onClick={() => setShowSavedOnly(!showSavedOnly)}
                        className="flex items-center gap-2"
                    >
                        <Heart
                            className={`w-4 h-4 ${
                                showSavedOnly ? "fill-current" : ""
                            }`}
                        />
                        {showSavedOnly ? "Show All" : "Show Saved"}
                    </Button>
                </div>
            </div>

            {!filteredAccommodations || filteredAccommodations.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    {showSavedOnly
                        ? "You haven't saved any accommodations yet."
                        : showBookableOnly
                        ? "No bookable accommodations found for the selected criteria."
                        : "No accommodations found for the selected criteria."}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAccommodations.map((accommodation) => (
                        <AccommodationCard
                            key={accommodation.id}
                            accommodation={accommodation}
                            isSaved={
                                savedAccommodations.includes(
                                    accommodation.id
                                ) || accommodation.saved
                            }
                            onSave={toggleSavedAccommodation}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
