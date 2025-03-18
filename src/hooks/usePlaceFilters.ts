import { useState } from "react";

export function usePlaceFilters() {
    const [showSavedOnly, setShowSavedOnly] = useState(false);
    const [showBookableOnly, setShowBookableOnly] = useState(false);

    return {
        showSavedOnly,
        setShowSavedOnly,
        showBookableOnly,
        setShowBookableOnly,
    };
}
