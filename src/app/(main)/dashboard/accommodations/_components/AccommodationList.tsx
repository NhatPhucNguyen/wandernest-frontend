"use client";

import { useSearchParams } from "next/navigation";
import { useSavedAccommodations } from "@/context/AccommodationsProvider";
import AccommodationCard from "./AccommodationCard";

// Updated mock data for accommodations with multiple types
const accommodations = [
    {
      id: "1",
      name: "Cozy City Hotel",
      types: ["Hotel", "Business"],
      price: 120,
      rating: 4.5,
      image: "/placeholder.svg?height=200&width=300",
      itinerary: "1",
      destination: "New York City, USA",
    },
    {
      id: "2",
      name: "Beachfront Resort",
      types: ["Resort", "Spa", "Family"],
      price: 250,
      rating: 4.8,
      image: "/placeholder.svg?height=200&width=300",
      itinerary: "2",
      destination: "Bali, Indonesia",
    },
    {
      id: "3",
      name: "Mountain Lodge",
      types: ["Lodge", "Ski Resort", "Adventure"],
      price: 180,
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=300",
      itinerary: "3",
      destination: "Aspen, Colorado, USA",
    },
    {
      id: "4",
      name: "Urban Apartment",
      types: ["Apartment", "Self-catering", "City Break"],
      price: 100,
      rating: 4.3,
      image: "/placeholder.svg?height=200&width=300",
      itinerary: "1",
      destination: "Paris, France",
    },
    // Add more mock accommodations as needed
  ]
  
  export default function AccommodationList() {
    const searchParams = useSearchParams()
    const selectedItinerary = searchParams.get("itinerary")
    const { savedAccommodations, toggleSavedAccommodation } = useSavedAccommodations()
  
    const filteredAccommodations = selectedItinerary
      ? accommodations.filter((acc) => acc.itinerary === selectedItinerary)
      : accommodations
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAccommodations.map((accommodation) => (
          <AccommodationCard
            key={accommodation.id}
            accommodation={accommodation}
            isSaved={savedAccommodations.includes(accommodation.id)}
            onSave={toggleSavedAccommodation}
          />
        ))}
      </div>
    )
  }