"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select"

const itineraries = [
  { id: "1", name: "City Break" },
  { id: "2", name: "Beach Vacation" },
  { id: "3", name: "Mountain Retreat" },
  { id: "4", name: "Cultural Tour" },
  { id: "5", name: "Adventure Trip" },
]

export default function ItinerarySelect() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedItinerary, setSelectedItinerary] = useState(searchParams.get("itinerary") || "")

  const handleItineraryChange = (value: string) => {
    setSelectedItinerary(value)
    router.push(`/dashboard/accommodations?itinerary=${value}`)
  }

  return (
    <div className="mb-6">
      <Select value={selectedItinerary} onValueChange={handleItineraryChange}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select itinerary" />
        </SelectTrigger>
        <SelectContent>
          {itineraries.map((itinerary) => (
            <SelectItem key={itinerary.id} value={itinerary.id}>
              {itinerary.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

