"use client";
import useUserItineraries from "@/hooks/useUserItineraries";
import ItineraryList from "./_components/ItineraryList";
import ItineraryListSkeleton from "./_components/ItineraryListSkeleton";
function Dashboard() {
    const { itineraries, isLoading } = useUserItineraries();
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Welcome to Your Travel Dashboard
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                    Explore and manage your travel itineraries with ease. Here, you can find an overview of all your planned activities and destinations.
                </p>
                <section className="bg-white shadow rounded-lg p-6 lg:px-8">
                    {isLoading ? (
                        <ItineraryListSkeleton />
                    ) : (
                        itineraries && itineraries.length > 0 ? (
                            <ItineraryList readonly itineraries={itineraries} />
                        ) : (
                            <p className="text-gray-500">No itineraries created.</p>
                        )
                    )}
                </section>
            </div>
        </div>
    );
}

export default Dashboard;