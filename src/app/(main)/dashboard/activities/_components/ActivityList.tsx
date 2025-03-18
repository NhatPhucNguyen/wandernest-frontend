"use client";

import { getActivitiesNearby } from "@/api/ActivityAPI";
import { Button } from "@/components/Button";
import { useSavedActivities } from "@/context/ActivitiesProvider";
import { usePlaceFilters } from "@/hooks/usePlaceFilters";
import useUserItineraries from "@/hooks/useUserItineraries";
import { BookOpen, Heart } from "lucide-react";
import useSWR from "swr";
import CardListSkeleton from "../../_components/CardListSkeleton";
import { getStatusBadge } from "../../_components/ItinerarySelect";
import ActivityCard from "./ActivityCard";

export default function ActivityList() {
    const { currentItinerary, selectedItinerary } = useUserItineraries();
    const {
        showSavedOnly,
        setShowSavedOnly,
        showBookableOnly,
        setShowBookableOnly,
    } = usePlaceFilters();
    const { savedActivities, toggleSavedActivity } = useSavedActivities();
    const {
        data: activities,
        isLoading,
        error,
    } = useSWR(`/api/activities?itinerary=${selectedItinerary}`, () =>
        getActivitiesNearby(selectedItinerary)
    );
    const filteredActivities = activities?.filter((activity) => {
        if (showSavedOnly) {
            return activity.saved;
        }
        if(showBookableOnly){
            return activity.websiteUri
        }
        return true;
    });
    if (isLoading) {
        return <CardListSkeleton />;
    }
    if (error) {
        return (
            <div className="text-center py-10">
                <p className="text-lg font-semibold">No restaurants found.</p>
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
                            : "Please select an itinerary to see restaurants"}
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

            {filteredActivities?.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    {!currentItinerary
                        ? "Invalid itinerary selected."
                        : showSavedOnly
                        ? "You haven't saved any activities yet."
                        : "No activities found matching your criteria."}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredActivities?.map((activity) => (
                        <ActivityCard
                            key={activity.id}
                            activity={activity}
                            isSaved={savedActivities.includes(activity.id) || activity.saved}
                            onSave={toggleSavedActivity}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
