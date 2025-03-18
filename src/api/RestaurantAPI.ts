import customAxios from "@/config/customAxios";

export type PriceLevel =
    | "PRICE_LEVEL_UNSPECIFIED"
    | "PRICE_LEVEL_FREE"
    | "PRICE_LEVEL_INEXPENSIVE"
    | "PRICE_LEVEL_MODERATE"
    | "PRICE_LEVEL_EXPENSIVE"
    | "PRICE_LEVEL_VERY_EXPENSIVE";
type Price = {
    currencyCode: string;
    units: string;
};
type PriceRange = {
    startPrice: Price;
    endPrice: Price;
};
export interface Restaurant {
    id: string;
    name: string;
    address: string;
    priceLevel: PriceLevel | null;
    photoUri: string;
    priceRange: PriceRange | null;
    location: {
        lat: number;
        lng: number;
    };
    websiteUri: string;
    rating: number;
    weekdayDescriptions: string[];
    saved?:boolean
}
const RESTAURANT_API = "/api/restaurants";
export const getRestaurantNearby = async (itineraryId: string | null) => {
    if (!itineraryId) {
        return null;
    }
    const { data } = await customAxios.get<Restaurant[]>(
        `${RESTAURANT_API}?itineraryId=${itineraryId}`
    );
    return data;
};
export const saveRestaurant = async (
    itineraryId: string,
    restaurant: Omit<Restaurant, "saved">
) => {
    await customAxios.post(
        `${RESTAURANT_API}?itineraryId=${itineraryId}`,
        restaurant
    );
};

export const unsaveRestaurant = async (
    itineraryId: string,
    restaurantId: string
) => {
    await customAxios.delete(
        `${RESTAURANT_API}/${restaurantId}?itineraryId=${itineraryId}`
    );
};
