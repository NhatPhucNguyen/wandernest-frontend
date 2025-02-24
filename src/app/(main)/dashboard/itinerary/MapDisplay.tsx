import { ItineraryFormSchema } from "@/schema/formSchema";
import { GoogleMap, Marker } from "@react-google-maps/api";
import React, { SetStateAction, Dispatch } from "react";
import { UseFormReturn } from "react-hook-form";
type MapDisplayProps = {
    center: { lat: number; lng: number };
    setCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
    geoCoder: google.maps.Geocoder | undefined;
    form: UseFormReturn<ItineraryFormSchema>;
};
const MapDisplay = (props: MapDisplayProps) => {
    return (
        <section className="lg:w-full h-80 p-5 col-span-3 lg:h-5/6">
            <GoogleMap
                onLoad={(map) => {
                    const bounds = new window.google.maps.LatLngBounds();
                    map.fitBounds(bounds);
                }}
                center={props.center}
                zoom={10}
                mapContainerStyle={{
                    width: "100%",
                    height: "100%",
                }}
                onClick={(e) => {
                    props.setCenter((prev) => {
                        if (e.latLng) {
                            return {
                                lat: e.latLng.lat(),
                                lng: e.latLng.lng(),
                            };
                        }
                        return prev;
                    });
                    if (props.geoCoder) {
                        props.geoCoder.geocode(
                            { location: e.latLng },
                            (results, status) => {
                                if (status === "OK" && results) {
                                    props.form.setValue(
                                        "destination",
                                        results[0].formatted_address
                                    );
                                }
                            }
                        );
                    }
                }}
            >
                <>
                    <Marker position={props.center} />
                </>
            </GoogleMap>
        </section>
    );
};

export default MapDisplay;
