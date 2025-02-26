"use client";
import useUserItineraries from "@/hooks/useUserItineraries";
import { itineraryForm, ItineraryFormSchema } from "@/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { addDays } from "date-fns";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ItineraryList from "../_components/ItineraryList";
import ItineraryListSkeleton from "../_components/ItineraryListSkeleton";
import ItineraryForm from "./ItineraryForm";
import MapDisplay from "./MapDisplay";
import { Card } from "@/components/Card";
const libraries: Libraries = ["places", "marker"];
const Itinerary = () => {
    const { itineraries, isLoading: isLoadingItineraries } =
        useUserItineraries();
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API!,
        libraries: libraries,
    });
    const [center, setCenter] = useState({
        lat: -3.745,
        lng: -38.523,
    });
    const geoCoder = useMemo(() => {
        if (isLoaded) {
            return new window.google.maps.Geocoder();
        }
    }, [isLoaded]);
    const currentDate = new Date();
    const form = useForm<ItineraryFormSchema>({
        defaultValues: {
            destination: "",
            travelDates: {
                from: currentDate,
                to: addDays(currentDate, 3),
            },
            numberOfTravelers: 1,
            totalBudget: 100,
            accommodationType: "HOTEL",
            cuisinePreferences: [],
            activityInterests: [],
        },
        resolver: zodResolver(itineraryForm),
    });
    return (
        <div>
            <div className="lg:grid lg:items-center lg:grid-cols-5 bg-gray-100">
                <section className="flex justify-center mt-5 col-span-2">
                    <ItineraryForm
                        form={form}
                        isLoadedGoogleService={isLoaded}
                        setCenter={setCenter}
                    />
                </section>
                {isLoaded && (
                    <MapDisplay
                        center={center}
                        setCenter={setCenter}
                        form={form}
                        geoCoder={geoCoder}
                    />
                )}
                <div className="col-span-5">
                    <Card className="lg:mx-4 my-5 lg:px-2">
                        {isLoadingItineraries && <ItineraryListSkeleton />}
                        {itineraries && (
                            <ItineraryList itineraries={itineraries} />
                        )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Itinerary;
