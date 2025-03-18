"use client";

import { Restaurant } from "@/api/RestaurantAPI";
import { Button } from "@/components/Button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/Card";
import {
    ChevronDown,
    ChevronUp,
    Clock,
    ExternalLink,
    Heart,
    MapPin,
    Star,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import PriceLevelIndicator from "./PriceLevelIndicator";
import { useSearchParams } from "next/navigation";

interface RestaurantCardProps {
    restaurant: Restaurant;
    isSaved?: boolean;
    onSave: (itineraryId: string | null, restaurant: Restaurant) => void;
}

export default function RestaurantCard({
    restaurant,
    isSaved,
    onSave,
}: RestaurantCardProps) {
    const [showFullSchedule, setShowFullSchedule] = useState(false);
    const searchParams = useSearchParams();
    const selectedItinerary = searchParams.get("itinerary");
    // Function to get today's opening hours or next open day
    const getTodayOrNextOpenHours = () => {
        const today = new Date().getDay();
        let checkDay = today;
        let dayCount = 0;

        while (dayCount < 7) {
            const dayInfo = restaurant.weekdayDescriptions[checkDay];
            if (!dayInfo.includes("Closed")) {
                return checkDay === today ? dayInfo.split(": ")[1] : dayInfo;
            }
            checkDay = (checkDay + 1) % 7;
            dayCount++;
        }

        return "Temporarily Closed";
    };

    const todayOrNextOpenHours = getTodayOrNextOpenHours();
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        restaurant.name + " " + restaurant.address
    )}`;

    // Function to render price information
    const renderPriceInfo = () => {
        return (
            <div className="flex items-center gap-2">
                {restaurant.priceLevel && (
                    <PriceLevelIndicator level={restaurant.priceLevel} />
                )}
                {restaurant.priceRange && (
                    <span className="text-sm text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis">
                        ${restaurant.priceRange.startPrice.units} - $
                        {restaurant.priceRange.endPrice.units}
                    </span>
                )}
            </div>
        );
    };

    return (
        <Card className="flex flex-col h-full overflow-hidden">
            <Image
                src={restaurant.photoUri || "/restaurantPlaceholder.svg"}
                alt={restaurant.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
            />
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle
                        title={restaurant.name}
                        className="truncate w-3/4"
                    >
                        {restaurant.name.length > 20
                            ? `${restaurant.name.substring(0, 20)}...`
                            : restaurant.name}
                    </CardTitle>
                    {renderPriceInfo()}
                </div>
                <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                    <MapPin className="w-4 h-4 mr-1" />
                    {restaurant.address}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                        {restaurant.rating.toFixed(1)}
                    </span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Clock className="w-4 h-4 mr-1" />
                    {todayOrNextOpenHours}
                </div>
                <div className="mt-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-auto font-normal"
                        onClick={() => setShowFullSchedule(!showFullSchedule)}
                    >
                        {showFullSchedule
                            ? "Hide full schedule"
                            : "Show full schedule"}
                        {showFullSchedule ? (
                            <ChevronUp className="ml-1 h-4 w-4" />
                        ) : (
                            <ChevronDown className="ml-1 h-4 w-4" />
                        )}
                    </Button>
                </div>
                {showFullSchedule && (
                    <div className="mt-2 text-sm">
                        {restaurant.weekdayDescriptions.map((day, index) => (
                            <div key={index} className="flex justify-between">
                                <span>{day.split(": ")[0]}</span>
                                <span>{day.split(": ")[1]}</span>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-end mt-auto">
                <Button
                    variant={isSaved ? "secondary" : "outline"}
                    className={`w-1/2 ${
                        isSaved
                            ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            : "hover:bg-secondary/10 hover:text-secondary-foreground"
                    }`}
                    onClick={() => onSave(selectedItinerary, restaurant)}
                >
                    <Heart
                        className={`w-4 h-4 mr-2 ${
                            isSaved ? "fill-current" : ""
                        }`}
                    />
                    {isSaved ? "Saved" : "Save"}
                </Button>
            </CardFooter>
        </Card>
    );
}
