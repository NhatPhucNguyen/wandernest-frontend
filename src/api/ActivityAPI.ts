import customAxios from "@/config/customAxios";
export enum ActivityType {
    CASINO = "Casino",
    HISTORICAL_PLACES = "Historical Places",
    MONUMENT = "Monument",
    MUSEUM = "Museum",
    BEACH = "Beach",
    HIKING_AREA = "Hiking Area",
    TOURIST_ATTRACTION = "Tourist Attraction"
}
export interface Activity {
    id: string;
    name: string;
    address: string;
    priceLevel: number | null;
    photoUri: string;
    location: {
        lat: number;
        lng: number;
    };
    websiteUri: string;
    rating: number;
    types: ActivityType[];
    saved: boolean;
}

const ACTIVITY_API = "/api/activities";

export const getActivitiesNearby = async (
    itineraryId: string | null
): Promise<Activity[] | null> => {
    if (!itineraryId) {
        return null;
    }
    const { data } = await customAxios.get<Activity[]>(
        `${ACTIVITY_API}?itineraryId=${itineraryId}`
    );
    return data;
};

export const saveActivity = async (
    itineraryId: string,
    activity: Omit<Activity, "saved">
): Promise<void> => {
    await customAxios.post(
        `${ACTIVITY_API}?itineraryId=${itineraryId}`,
        activity
    );
};

export const unsaveActivity = async (
    itineraryId: string,
    activityId: string
): Promise<void> => {
    await customAxios.delete(
        `${ACTIVITY_API}/${activityId}?itineraryId=${itineraryId}`
    );
};
