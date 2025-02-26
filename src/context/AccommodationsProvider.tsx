"use client";

import { createContext, useState, useContext, type ReactNode } from "react";

interface AccommodationsContextType {
    savedAccommodations: string[];
    toggleSavedAccommodation: (id: string) => void;
}

const SavedAccommodationsContext = createContext<
    AccommodationsContextType | undefined
>(undefined);

export function AccommodationsProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [savedAccommodations, setSavedAccommodations] = useState<string[]>(
        []
    );

    const toggleSavedAccommodation = (id: string) => {
        setSavedAccommodations((prev) =>
            prev.includes(id)
                ? prev.filter((accId) => accId !== id)
                : [...prev, id]
        );
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
