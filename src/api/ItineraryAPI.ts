import customAxios from "@/config/customAxios";

export type Itinerary = {
    id: string;
    destination: string;
    startDate: string;
    endDate: string;
    travelers: number;
    totalBudget: number;
    accommodations: string[];
    activities: string[];
    restaurants: string[];
    status: ItineraryStatus;
};
export type ItineraryStatus = "DRAFT" | "ACTIVE" | "COMPLETE";
const ITINERARIES_API = "/api/itineraries";
export const getUserItineraries = async (): Promise<Itinerary[]> => {
    const { data } = await customAxios.get<Itinerary[]>(ITINERARIES_API);
    return data;
};
export const deleteItineraryById = async (id: string) => {
    const { data } = await customAxios.delete(`${ITINERARIES_API}/${id}`);
    return data;
};
