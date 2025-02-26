"use client";
import useUserItineraries from "@/hooks/useUserItineraries";
import ItineraryList from "./_components/ItineraryList";
import ItineraryListSkeleton from "./_components/ItineraryListSkeleton";
import { useToast } from "@/hooks/useToast";
//TODO: Write test for _components
function Dashboard() {
    const { itineraries, isError, isLoading } = useUserItineraries();
    const { toast } = useToast();
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
                    {isError &&
                        toast({
                            title: "Error",
                            description: "Oops! We couldn't load your itineraries. Please try again later.",
                        })}
                    {isLoading && <ItineraryListSkeleton />}
                    {itineraries && (
                        <ItineraryList readonly itineraries={itineraries} />
                    )}
                </section>
            </div>
        </div>
    );
}

export default Dashboard;