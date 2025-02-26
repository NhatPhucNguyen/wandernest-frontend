import customAxios from "@/config/customAxios";
import { ItineraryFormSchema } from "@/schema/formSchema";
import { addDays } from "date-fns";

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
export type ItineraryRequestBody = Omit<ItineraryFormSchema, "travelDates"> & {
    startDate: Date;
    endDate: Date;
};
export type ItineraryStatus = "DRAFT" | "ACTIVE" | "COMPLETED";
const ITINERARIES_API = "/api/itineraries";
export const getUserItineraries = async (): Promise<Itinerary[]> => {
    const { data } = await customAxios.get<Itinerary[]>(ITINERARIES_API);
    return data;
};
export const deleteItineraryById = async (id: string): Promise<Itinerary> => {
    const { data } = await customAxios.delete(`${ITINERARIES_API}/${id}`);
    return data;
};
export const generateItinerary = async (
    itinerary: ItineraryFormSchema
): Promise<Itinerary> => {
    const body: ItineraryRequestBody = {
        ...itinerary,
        startDate: itinerary.travelDates.from || new Date(),
        endDate: itinerary.travelDates.to || addDays(new Date(), 3),
    };
    const { data } = await customAxios.post(
        `${ITINERARIES_API}/generate`,
        body
    );
    return data;
};
export const updateStatus = async (id: string, status: ItineraryStatus) => {
    const { data } = await customAxios.patch(`${ITINERARIES_API}/${id}`, {
        status,
    });
    return data;
};
