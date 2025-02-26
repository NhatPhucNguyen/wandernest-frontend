import { Itinerary, ItineraryStatus } from "@/api/ItineraryAPI";
import customAxios from "@/config/customAxios";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ItineraryList from "../ItineraryList";

vi.mock("@/hooks/useToast", () => ({
    useToast: vi.fn(() => ({
        toast: vi.fn(),
    })),
}));

const mockItineraries: Itinerary[] = [
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
    {
        id: "2",
        destination: "Tokyo, Japan",
        startDate: "2023-09-10",
        endDate: "2023-09-20",
        travelers: 4,
        totalBudget: 5000,
        accommodations: [
            "APA Hotel Shinjuku Kabukicho Tower",
            "Ryokan in Asakusa",
        ],
        activities: ["Tokyo Skytree", "Senso-ji Temple", "Teamlab Borderless"],
        restaurants: ["Sushi Saito", "Nakiryu", "Den"],
        status: "ACTIVE" as ItineraryStatus,
    },
];

describe("ItineraryList", () => {
    let mock: MockAdapter;

    beforeEach(() => {
        mock = new MockAdapter(customAxios);
    });

    afterEach(() => {
        mock.reset();
    });

    it("renders the itinerary list", () => {
        render(<ItineraryList itineraries={mockItineraries} />);
        expect(screen.getByText("Your Itineraries")).toBeDefined();
        expect(screen.getByText("Paris, France")).toBeDefined();
        expect(screen.getByText("Tokyo, Japan")).toBeDefined();
    });

    it("expands and collapses rows", () => {
        render(<ItineraryList itineraries={mockItineraries} />);
        const expandButton = screen.getAllByRole("button", {
            name: "Expand row",
        })[0];
        fireEvent.click(expandButton);
        expect(screen.getByText("Hotel de Ville")).toBeDefined();
        fireEvent.click(expandButton);
        expect(screen.queryByText("Hotel de Ville")).toBeNull();
    });

    it("changes the itinerary status", async () => {
        mock.onPatch("/api/itineraries/1").reply(200, {});
        render(<ItineraryList itineraries={mockItineraries} />);
        const statusButton = screen.getAllByRole("button", { name: "Draft" })[0];
        fireEvent.click(statusButton);
        const dropdown = within(screen.getByRole("listbox"));
        const activeOption = dropdown.getByText("Active");
        fireEvent.click(activeOption);
        await waitFor(() => {
            expect(mock.history.patch.length).toBe(1);
            expect(mock.history.patch[0].url).toBe("/api/itineraries/1");
            expect(mock.history.patch[0].data).toBe(JSON.stringify({ status: "ACTIVE" }));
        });
    });

    it("deletes an itinerary", async () => {
        mock.onDelete("/api/itineraries/1").reply(200, {});
        render(
            <>
                <ItineraryList itineraries={mockItineraries} />
            </>
        );
        const deleteButton = screen.getAllByRole("button", {
            name: "Delete",
        })[0];
        fireEvent.click(deleteButton);
        const continueButton = screen.getByRole("button", { name: "Continue" });
        fireEvent.click(continueButton);
        await waitFor(() => {
            expect(mock.history.delete.length).toBe(1);
            expect(mock.history.delete[0].url).toBe("/api/itineraries/1");
        });
    });
});
