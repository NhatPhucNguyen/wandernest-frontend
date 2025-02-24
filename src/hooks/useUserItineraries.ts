import { getUserItineraries } from "@/api/ItineraryAPI";
import useSwr from "swr";
export default function useUserItineraries() {
    const { data, error, isLoading } = useSwr(
        "/api/itineraries",
        getUserItineraries
    );
    return {
        itineraries: data,
        isError: error,
        isLoading,
    };
}
