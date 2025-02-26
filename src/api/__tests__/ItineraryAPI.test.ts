import customAxios from "@/config/customAxios";
import { ItineraryFormSchema } from "@/schema/formSchema";
import MockAdapter from "axios-mock-adapter";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { deleteItineraryById, generateItinerary, getUserItineraries, Itinerary, ItineraryStatus, updateStatus } from "../ItineraryAPI";

describe("ItineraryAPI", () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(customAxios);
    });

    afterEach(() => {
        mock.reset();
    });

    describe("getUserItineraries", () => {
        it("should fetch user itineraries successfully", async () => {
            const itineraries: Itinerary[] = [
                {
                    id: "1",
                    destination: "Paris, France",
                    startDate: "2023-06-15",
                    endDate: "2023-06-22",
                    travelers: 2,
                    totalBudget: 3000,
                    accommodations: ["Hotel de Ville", "Airbnb in Le Marais"],
                    activities: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
                    restaurants: ["Le Chateaubriand", "L'Ami Louis", "Septime"],
                    status: "DRAFT" as ItineraryStatus,
                },
            ];
            mock.onGet("/api/itineraries").reply(200, itineraries);

            const result = await getUserItineraries();

            expect(result).toEqual(itineraries);
        });

        it("should handle error when fetching user itineraries", async () => {
            mock.onGet("/api/itineraries").reply(500);

            await expect(getUserItineraries()).rejects.toThrow();
        });
    });

    describe("deleteItineraryById", () => {
        it("should delete itinerary by id successfully", async () => {
            const itinerary: Itinerary = {
                id: "1",
                destination: "Paris, France",
                startDate: "2023-06-15",
                endDate: "2023-06-22",
                travelers: 2,
                totalBudget: 3000,
                accommodations: ["Hotel de Ville", "Airbnb in Le Marais"],
                activities: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
                restaurants: ["Le Chateaubriand", "L'Ami Louis", "Septime"],
                status: "DRAFT" as ItineraryStatus,
            };
            mock.onDelete("/api/itineraries/1").reply(200, itinerary);

            const result = await deleteItineraryById("1");

            expect(result).toEqual(itinerary);
        });

        it("should handle error when deleting itinerary by id", async () => {
            mock.onDelete("/api/itineraries/1").reply(500);

            await expect(deleteItineraryById("1")).rejects.toThrow();
        });
    });

    describe("generateItinerary", () => {
        it("should generate itinerary successfully", async () => {
            const itineraryForm: ItineraryFormSchema = {
                destination: "Paris, France",
                travelDates: { from: new Date("2023-06-15"), to: new Date("2023-06-22") },
                numberOfTravelers: 2,
                totalBudget: 3000,
                accommodationType: "Hotel",
                cuisinePreferences: ["French", "Italian"],
                activityInterests: ["Sightseeing", "Museums"],
            };
            const itinerary: Itinerary = {
                id: "1",
                destination: "Paris, France",
                startDate: "2023-06-15",
                endDate: "2023-06-22",
                travelers: 2,
                totalBudget: 3000,
                accommodations: ["Hotel de Ville", "Airbnb in Le Marais"],
                activities: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
                restaurants: ["Le Chateaubriand", "L'Ami Louis", "Septime"],
                status: "DRAFT" as ItineraryStatus,
            };
            mock.onPost("/api/itineraries/generate").reply(200, itinerary);

            const result = await generateItinerary(itineraryForm);

            expect(result).toEqual(itinerary);
        });

        it("should handle error when generating itinerary", async () => {
            const itineraryForm: ItineraryFormSchema = {
                destination: "Paris, France",
                travelDates: { from: new Date("2023-06-15"), to: new Date("2023-06-22") },
                numberOfTravelers: 2,
                totalBudget: 3000,
                accommodationType: "Hotel",
                cuisinePreferences: ["French", "Italian"],
                activityInterests: ["Sightseeing", "Museums"],
            };
            mock.onPost("/api/itineraries/generate").reply(500);

            await expect(generateItinerary(itineraryForm)).rejects.toThrow();
        });
    });

    describe("updateStatus", () => {
        it("should update itinerary status successfully", async () => {
            const itinerary: Itinerary = {
                id: "1",
                destination: "Paris, France",
                startDate: "2023-06-15",
                endDate: "2023-06-22",
                travelers: 2,
                totalBudget: 3000,
                accommodations: ["Hotel de Ville", "Airbnb in Le Marais"],
                activities: ["Eiffel Tower", "Louvre Museum", "Seine River Cruise"],
                restaurants: ["Le Chateaubriand", "L'Ami Louis", "Septime"],
                status: "ACTIVE" as ItineraryStatus,
            };
            mock.onPatch("/api/itineraries/1").reply(200, itinerary);

            const result = await updateStatus("1", "ACTIVE");

            expect(result).toEqual(itinerary);
        });

        it("should handle error when updating itinerary status", async () => {
            mock.onPatch("/api/itineraries/1").reply(500);

            await expect(updateStatus("1", "ACTIVE")).rejects.toThrow();
        });
    });
});