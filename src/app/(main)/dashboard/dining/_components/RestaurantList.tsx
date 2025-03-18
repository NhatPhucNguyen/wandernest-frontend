"use client";
import { Button } from "@/components/Button";
import { usePlaceFilters } from "@/hooks/usePlaceFilters";
import useUserItineraries from "@/hooks/useUserItineraries";
import { Heart } from "lucide-react";
import { getStatusBadge } from "../../_components/ItinerarySelect";
import RestaurantCard from "./RestaurantCard";
import useSWR from "swr";
import { getRestaurantNearby } from "@/api/RestaurantAPI";
import { useSavedRestaurants } from "@/context/RestaurantsProvider";
import CardListSkeleton from "../../_components/CardListSkeleton";

const RestaurantList = () => {
    const { currentItinerary, selectedItinerary } = useUserItineraries();
    const { showSavedOnly, setShowSavedOnly } = usePlaceFilters();
    const { data: restaurants,isLoading,error } = useSWR(
        `/api/restaurants?itinerary=${selectedItinerary}`,
        () => getRestaurantNearby(selectedItinerary)
    );
    const { toggleSavedRestaurant, savedRestaurants } = useSavedRestaurants();
    const filteredRestaurants = restaurants?.filter((restaurant) => {
        if (showSavedOnly) {
            return restaurant.saved;
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
                    No restaurants found.
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
                            : "Please select an itinerary to see restaurants"}
                    </h2>
                    {currentItinerary &&
                        getStatusBadge(currentItinerary.status)}
                </div>
                <div className="flex gap-2">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants &&
                    filteredRestaurants.map((restaurant) => (
                        <RestaurantCard
                            key={restaurant.id}
                            restaurant={restaurant}
                            onSave={toggleSavedRestaurant}
                            isSaved={
                                savedRestaurants.includes(restaurant.id) ||
                                restaurant.saved
                            }
                        />
                    ))}
            </div>
        </div>
    );
};

export default RestaurantList;
