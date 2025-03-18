import { getUserItineraries } from "@/api/ItineraryAPI";
import { useSearchParams } from "next/navigation";
import useSwr from "swr";
export default function useUserItineraries() {
    const searchParams = useSearchParams();
    const selectedItinerary = searchParams.get("itinerary");
    const { data, error, isLoading } = useSwr(
        "/api/itineraries",
        getUserItineraries
    );
    const currentItinerary = data?.find(
        (itinerary) => itinerary.id == selectedItinerary
    );
    return {
        itineraries: data,
        isError: error,
        isLoading,
        currentItinerary,
        selectedItinerary
    };
}
