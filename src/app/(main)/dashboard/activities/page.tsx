import { ActivitiesProvider } from "@/context/ActivitiesProvider";
import ItinerarySelect from "../_components/ItinerarySelect";
import ActivityList from "./_components/ActivityList";

export default function ActivitiesPage() {
    return (
        <ActivitiesProvider>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Nearby Activities</h1>
                <section className="mb-2 px-2">
                    <ItinerarySelect path="/dashboard/activities" />
                </section>
                <section className="px-2">
                    <ActivityList />
                </section>
            </div>
        </ActivitiesProvider>
    );
}
