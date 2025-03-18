import Image from "next/image";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Star, Heart, MapPin, AlertCircle, ExternalLink } from "lucide-react";
import { Accommodation } from "@/api/AccommodationAPI";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/Tooltip";
import { useSearchParams } from "next/navigation";

interface AccommodationCardProps {
    accommodation: Accommodation;
    isSaved: boolean;
    onSave: (itineraryId: string | null, accommodation: Accommodation) => void;
}

export default function AccommodationCard({
    accommodation,
    isSaved,
    onSave,
}: AccommodationCardProps) {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        accommodation.name + " " + accommodation.address
    )}`;
    const searchParams = useSearchParams();
    const selectedItinerary = searchParams.get("itinerary");

    return (
        <Card className="flex flex-col h-full overflow-hidden">
            <Image
                src={accommodation.photoUri || "/accommodationPlaceholder.svg"}
                alt={accommodation.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
                priority
            />
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {accommodation.name}{" "}
                    {!accommodation.websiteUri && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>
                                        This accommodation is currently not
                                        available for online booking
                                    </p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                </CardTitle>
                <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-muted-foreground hover:text-primary hover:underline transition-colors group"
                >
                    <MapPin className="w-4 h-4 mr-1" />
                    {accommodation.address}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2 mb-2">
                    {accommodation.types.map((type, index) => (
                        <Badge key={index} variant="secondary">
                            {type}
                        </Badge>
                    ))}
                </div>
                <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">
                        {accommodation.rating}
                    </span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2 mt-auto">
                {accommodation.websiteUri ? (
                    <Button variant="default" className="w-1/2" asChild>
                        <Link
                            href={accommodation.websiteUri || "#"}
                            target="_blank"
                        >
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
                    onClick={() => onSave(selectedItinerary, accommodation)}
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