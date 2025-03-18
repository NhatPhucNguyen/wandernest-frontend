"use client";
import { Restaurant, saveRestaurant, unsaveRestaurant } from "@/api/RestaurantAPI";
import { createContext, useContext, useState, type ReactNode } from "react";
import { mutate } from "swr";

interface RestaurantsContextType {
    savedRestaurants: string[];
    toggleSavedRestaurant: (
        itineraryId: string | null,
        restaurant: Restaurant
    ) => void;
}

const SavedRestaurantsContext = createContext<
    RestaurantsContextType | undefined
>(undefined);

export function RestaurantsProvider({ children }: { children: ReactNode }) {
    const [savedRestaurants, setSavedRestaurants] = useState<string[]>([]);

    const toggleSavedRestaurant = async (
        itineraryId: string | null,
        restaurant: Restaurant
    ) => {
        const isSaved =
            savedRestaurants.includes(restaurant.id) || restaurant.saved;
        setSavedRestaurants((prev) =>
            isSaved
                ? prev.filter((restId) => restId !== restaurant.id)
                : [...prev, restaurant.id]
        );

        if (itineraryId) {
            if (isSaved) {
                await unsaveRestaurant(itineraryId, restaurant.id);
            } else {
                await saveRestaurant(itineraryId, restaurant);
            }
            mutate(`/api/restaurants?itinerary=${itineraryId}`);
        }
    };

    return (
        <SavedRestaurantsContext.Provider
            value={{ savedRestaurants, toggleSavedRestaurant }}
        >
            {children}
        </SavedRestaurantsContext.Provider>
    );
}

export function useSavedRestaurants() {
    const context = useContext(SavedRestaurantsContext);
    if (context === undefined) {
        throw new Error(
            "useSavedRestaurants must be used within a SavedRestaurantsProvider"
        );
    }
    return context;
}