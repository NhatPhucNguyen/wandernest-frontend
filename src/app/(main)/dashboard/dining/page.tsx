import { RestaurantsProvider } from "@/context/RestaurantsProvider";
import ItinerarySelect from "../_components/ItinerarySelect";
import RestaurantList from "./_components/RestaurantList";

export default function NearbyRestaurants() {
    return (
        <RestaurantsProvider>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Nearby Restaurants</h1>
                <section className="mb-2 px-2">
                    <ItinerarySelect path="/dashboard/dining" />
                </section>
                <section className="px-2">
                    <RestaurantList />
                </section>
            </div>
        </RestaurantsProvider>
    );
}
