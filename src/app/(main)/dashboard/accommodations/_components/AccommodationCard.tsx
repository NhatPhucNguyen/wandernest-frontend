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
import { Star, Heart, MapPin } from "lucide-react";

interface Accommodation {
    id: string;
    name: string;
    types: string[];
    price: number;
    rating: number;
    image: string;
    destination: string;
}

interface AccommodationCardProps {
    accommodation: Accommodation;
    isSaved: boolean;
    onSave: (id: string) => void;
}

export default function AccommodationCard({
    accommodation,
    isSaved,
    onSave,
}: AccommodationCardProps) {
    return (
        <Card className="overflow-hidden">
            <Image
                src={accommodation.image || "/placeholder.svg"}
                alt={accommodation.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
            />
            <CardHeader>
                <CardTitle>{accommodation.name}</CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-1" />
                    {accommodation.destination}
                </div>
            </CardHeader>
            <CardContent>
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
                <p className="text-lg font-semibold">
                    ${accommodation.price} / night
                </p>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
                <Button variant="default" className="w-1/2">
                    Book Now
                </Button>
                <Button
                    variant={isSaved ? "secondary" : "outline"}
                    className={`w-1/2 ${
                        isSaved
                            ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                            : "hover:bg-secondary/10 hover:text-secondary-foreground"
                    }`}
                    onClick={() => onSave(accommodation.id)}
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
