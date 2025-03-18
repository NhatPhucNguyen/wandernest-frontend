"use client";

import { Activity } from "@/api/ActivityAPI";
import { Button } from "@/components/Button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/Card";
import { ExternalLink, Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface ActivityCardProps {
    activity: Activity;
    isSaved: boolean;
    onSave: (itineraryId: string | null, activity: Activity) => void;
}

export default function ActivityCard({
    activity,
    isSaved,
    onSave,
}: ActivityCardProps) {
    const searchParams = useSearchParams();
    const selectedItinerary = searchParams.get("itinerary");
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        activity.name + " " + activity.address
    )}`;

    return (
        <Card className="overflow-hidden flex flex-col h-full">
            <div className="relative">
                <Image
                    src={activity.photoUri || "/activityPlaceholder.svg"}
                    alt={activity.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                />
            </div>
            <CardHeader>
                <div className="flex flex-col space-y-1.5">
                    <CardTitle>{activity.name}</CardTitle>
                    <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
                    >
                        <MapPin className="w-4 h-4 mr-1" />
                        {activity.address}
                        <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                {/* <div className="flex flex-wrap gap-2 mb-3">
                    {activity.types.map((type, index) => (
                        <Badge
                            key={index}
                            variant="outline"
                            className="flex items-center gap-1"
                        >
                            <Tag className="w-3 h-3" />
                            {ActivityType[type.toUpperCase() as keyof typeof ActivityType]}
                        </Badge>
                    ))}
                </div> */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">
                            {activity.rating.toFixed(1)}
                        </span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2 mt-auto">
                {activity.websiteUri ? (
                    <Button variant="default" className="w-1/2" asChild>
                        <Link href={activity.websiteUri || "#"} target="_blank">
                            Book Now
                        </Link>
                    </Button>
                ) : (
                    <Button variant="secondary" className="w-1/2" disabled>
                        Not Available
                    </Button>
                )}
                <Button
                    variant={isSaved ? "secondary" : "outline"}
                    className={`w-1/2 ${
                        isSaved
                            ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            : "hover:bg-secondary/10 hover:text-secondary-foreground"
                    }`}
                    onClick={() => onSave(selectedItinerary, activity)}
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