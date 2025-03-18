"use client";

import {
    Activity,
    saveActivity,
    unsaveActivity,
} from "@/api/ActivityAPI";
import { createContext, useContext, useState, type ReactNode } from "react";
import { mutate } from "swr";

interface ActivitiesContextType {
    savedActivities: string[];
    toggleSavedActivity: (
        itineraryId: string | null,
        activity: Activity
    ) => void;
}

const SavedActivitiesContext = createContext<
    ActivitiesContextType | undefined
>(undefined);

export function ActivitiesProvider({ children }: { children: ReactNode }) {
    const [savedActivities, setSavedActivities] = useState<string[]>([]);

    const toggleSavedActivity = async (
        itineraryId: string | null,
        activity: Activity
    ) => {
        const isSaved =
            savedActivities.includes(activity.id) || activity.saved;
        setSavedActivities((prev) =>
            isSaved
                ? prev.filter((actId) => actId !== activity.id)
                : [...prev, activity.id]
        );

        if (itineraryId) {
            if (isSaved) {
                await unsaveActivity(itineraryId, activity.id);
            } else {
                await saveActivity(itineraryId, activity);
            }
            mutate(`/api/activities?itinerary=${itineraryId}`);
        }
    };

    return (
        <SavedActivitiesContext.Provider
            value={{ savedActivities, toggleSavedActivity }}
        >
            {children}
        </SavedActivitiesContext.Provider>
    );
}

export function useSavedActivities() {
    const context = useContext(SavedActivitiesContext);
    if (context === undefined) {
        throw new Error(
            "useSavedActivities must be used within a SavedActivitiesProvider"
        );
    }
    return context;
}