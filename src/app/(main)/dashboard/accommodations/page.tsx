import { Suspense } from "react"
import AccommodationList from "./_components/AccommodationList"
import ItinerarySelect from "./_components/ItinerarySelect"
import { AccommodationsProvider } from "@/context/AccommodationsProvider"
//TODO: Complete accommodation page
export default function AccommodationsPage() {
  return (
    <AccommodationsProvider>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Nearby Accommodations</h1>
        <ItinerarySelect />
        <Suspense fallback={<div>Loading accommodations...</div>}>
          <AccommodationList />
        </Suspense>
      </div>
    </AccommodationsProvider>
  )
}

