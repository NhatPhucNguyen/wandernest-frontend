import customAxios from "@/config/customAxios";
import { AccommodationType } from "@/enums/AccommodationType";

const ACCOMMODATION_API = "/api/accommodations";
export type Accommodation = {
    id: string;
    name: string;
    address: string;
    priceLevel: string;
    photoUri: string;
    location: {
        lat: number;
        lng: number;
    };
    websiteUri: string | null;
    rating: number;
    types: AccommodationType[];
    saved: boolean;
};
export const getAccommodationsNearby = async (itineraryId: string | null) => {
    if (!itineraryId) {
        return null;
    }
    const { data } = await customAxios.get<Accommodation[]>(
        `${ACCOMMODATION_API}?itineraryId=${itineraryId}`
    );
    return data;
};

export const saveAccommodation = async (
    itineraryId: string,
    accommodation: Omit<Accommodation, "saved">
) => {
    await customAxios.post(
        `${ACCOMMODATION_API}?itineraryId=${itineraryId}`,
        accommodation
    );
};

export const unsaveAccommodation = async (itineraryId:string,
    accommodationId:string) => {
    await customAxios.delete(`${ACCOMMODATION_API}/${accommodationId}?itineraryId=${itineraryId}`)
}
