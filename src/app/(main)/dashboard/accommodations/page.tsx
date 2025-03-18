"use client";
import { AccommodationsProvider } from "@/context/AccommodationsProvider";
import AccommodationList from "./_components/AccommodationList";
import ItinerarySelect from "../_components/ItinerarySelect";
//TODO: Add filter
export default function AccommodationsPage() {
    return (
        <AccommodationsProvider>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">
                    Nearby Accommodations
                </h1>
                <section className="mb-2 px-2">
                    <ItinerarySelect path="/dashboard/accommodations"/>
                </section>
                <section className="px-2">
                    <AccommodationList />
                </section>
            </div>
        </AccommodationsProvider>
    );
}
