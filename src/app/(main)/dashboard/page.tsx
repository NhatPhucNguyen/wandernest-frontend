"use client";
import useUserItineraries from "@/hooks/useUserItineraries";
import ItineraryList from "./_components/ItineraryList";
import ItineraryListSkeleton from "./_components/ItineraryListSkeleton";
//TODO: Write test for _components
function Dashboard() {
    const { itineraries, isError, isLoading } = useUserItineraries();
    return (
        <div>
            <h1>Welcome to the Dashboard</h1>
            <p>
                This is your dashboard where you can see an overview of your
                activities.
            </p>
            <section className="lg:px-2">
                {isError && <p>Error{/* TODO:display Toast */}</p>}
                {isLoading && <ItineraryListSkeleton />}
                {itineraries && (
                    <ItineraryList readonly itineraries={itineraries} />
                )}
            </section>
        </div>
    );
}
export default Dashboard;
