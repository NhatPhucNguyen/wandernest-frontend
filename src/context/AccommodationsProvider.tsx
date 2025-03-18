"use client";

import {
    Accommodation,
    saveAccommodation,
    unsaveAccommodation,
} from "@/api/AccommodationAPI";
import { createContext, useContext, useState, type ReactNode } from "react";
import { mutate } from "swr";

interface AccommodationsContextType {
    savedAccommodations: string[];
    toggleSavedAccommodation: (
        itineraryId: string | null,
        accommodation: Accommodation
    ) => void;
}

const SavedAccommodationsContext = createContext<
    AccommodationsContextType | undefined
>(undefined);

export function AccommodationsProvider({ children }: { children: ReactNode }) {
    const [savedAccommodations, setSavedAccommodations] = useState<string[]>(
        []
    );
    const toggleSavedAccommodation = async (
        itineraryId: string | null,
        accommodation: Accommodation
    ) => {
        const isSaved =
            savedAccommodations.includes(accommodation.id) ||
            accommodation.saved;
        setSavedAccommodations((prev) =>
            isSaved
                ? prev.filter((accId) => accId !== accommodation.id)
                : [...prev, accommodation.id]
        );

        if (itineraryId) {
            if (isSaved) {
                await unsaveAccommodation(itineraryId, accommodation.id);
            } else {
                await saveAccommodation(itineraryId, accommodation);
            }
            mutate(`/api/accommodations?itinerary=${itineraryId}`);
        }
    };

    return (
        <SavedAccommodationsContext.Provider
            value={{ savedAccommodations, toggleSavedAccommodation }}
        >
            {children}
        </SavedAccommodationsContext.Provider>
    );
}

export function useSavedAccommodations() {
    const context = useContext(SavedAccommodationsContext);
    if (context === undefined) {
        throw new Error(
            "useSavedAccommodations must be used within a SavedAccommodationsProvider"
        );
    }
    return context;
}
