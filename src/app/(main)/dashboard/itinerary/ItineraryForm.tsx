import { Button } from "@/components/Button";
import { Calendar } from "@/components/Calendar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/Card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/Form";
import { Input } from "@/components/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover";
import { cn } from "@/lib/utils";
import { ItineraryFormSchema } from "@/schema/formSchema";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
type ItineraryFormProps = {
    setCenter: Dispatch<SetStateAction<{ lat: number; lng: number }>>;
    form: UseFormReturn<ItineraryFormSchema>;
    isLoadedGoogleService: boolean;
};
const ItineraryForm = ({
    form,
    isLoadedGoogleService,
    setCenter,
}: ItineraryFormProps) => {
    const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
    const onSubmit = (values: ItineraryFormSchema) => {
        //TODO: Generate itinerary
        console.log(values);
    };
    const handlePlacesChanged = () => {
        if (searchBoxRef.current) {
            const places = searchBoxRef.current.getPlaces();
            if (places && places.length > 0) {
                const place = places[0];
                if (place.geometry && place.geometry.location) {
                    setCenter({
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                    });
                    if (place.formatted_address)
                        form.setValue("destination", place.formatted_address);
                }
            }
        }
    };
    return (
        <Card className="w-full max-w-2xl mx-4">
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader>
                    <h2 className="text-2xl font-semibold mt-3 text-center text-gray-800">
                        Create a New Itinerary for Your Trip
                    </h2>
                    <span className="text-center text-gray-600">
                        Plan your perfect getaway with ease and convenience.
                    </span>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <FormField
                            control={form.control}
                            name="destination"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="destination">
                                        Destination
                                    </FormLabel>
                                    <FormControl>
                                        {isLoadedGoogleService ? (
                                            <StandaloneSearchBox
                                                onLoad={(ref) =>
                                                    (searchBoxRef.current = ref)
                                                }
                                                onPlacesChanged={
                                                    handlePlacesChanged
                                                }
                                            >
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    id="destination"
                                                    placeholder=""
                                                />
                                            </StandaloneSearchBox>
                                        ) : (
                                            <Input
                                                {...field}
                                                type="text"
                                                id="destination"
                                                placeholder=""
                                            />
                                        )}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="travelDates"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="destination">
                                        Travel Dates
                                    </FormLabel>
                                    <FormControl>
                                        <div className={cn("grid gap-1")}>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        id="date"
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[300px] justify-start text-left font-normal",
                                                            !field.value &&
                                                                "text-muted-foreground"
                                                        )}
                                                    >
                                                        <CalendarIcon />
                                                        {field.value?.from ? (
                                                            field.value.to ? (
                                                                <>
                                                                    {format(
                                                                        field
                                                                            .value
                                                                            .from,
                                                                        "LLL dd, y"
                                                                    )}{" "}
                                                                    -{" "}
                                                                    {format(
                                                                        field
                                                                            .value
                                                                            .to,
                                                                        "LLL dd, y"
                                                                    )}
                                                                </>
                                                            ) : (
                                                                format(
                                                                    field.value
                                                                        .from,
                                                                    "LLL dd, y"
                                                                )
                                                            )
                                                        ) : (
                                                            <span>
                                                                Pick a date
                                                            </span>
                                                        )}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="w-full p-0"
                                                    align="start"
                                                    side="bottom"
                                                    sideOffset={5}
                                                >
                                                    <Calendar
                                                        mode="range"
                                                        defaultMonth={
                                                            field.value?.from
                                                        }
                                                        selected={field.value}
                                                        onSelect={
                                                            field.onChange
                                                        }
                                                        numberOfMonths={1}
                                                        disabled={(date) =>
                                                            date < new Date()
                                                        }
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="numberOfTravelers"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="numberOfTravelers">
                                        Number of Travelers
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            id="numberOfTravelers"
                                            min={1}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="budget"
                            render={({ field }) => (
                                <FormItem className="relative">
                                    <FormLabel htmlFor="budget">
                                        Budget
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <span className="absolute left-3 top-2/4 transform -translate-y-1/2 text-gray-500">
                                                $
                                            </span>
                                            <Input
                                                {...field}
                                                type="number"
                                                id="budget"
                                                min={0}
                                                className="pl-8"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button
                        className="w-1/3 bg-blue-700 hover:bg-blue-500"
                        type="submit"
                    >
                        Generate
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
};

export default ItineraryForm;
