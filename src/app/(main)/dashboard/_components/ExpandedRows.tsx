import { Itinerary } from "@/api/ItineraryAPI";
import { TableCell, TableRow } from "@/components/Table";
import React from "react";
type ExpandRowsProps = {
    itinerary:Itinerary;
    readonly?:boolean;
}
const ExpandedRows = ({itinerary,readonly}:ExpandRowsProps) => {
    return (
        <TableRow>
            <TableCell colSpan={readonly ? 6 : 7}>
                <div className="p-4 bg-muted rounded-md">
                    <h3 className="font-semibold mb-2">Accommodations:</h3>
                    <ul className="list-disc list-inside mb-2">
                        {itinerary.accommodations.map(
                            (accommodation, index) => (
                                <li key={index}>{accommodation.name}</li>
                            )
                        )}
                    </ul>
                    <h3 className="font-semibold mb-2">Activities:</h3>
                    <ul className="list-disc list-inside mb-2">
                        {itinerary.activities.map((activity, index) => (
                            <li key={index}>{activity}</li>
                        ))}
                    </ul>
                    <h3 className="font-semibold mb-2">Restaurants:</h3>
                    <ul className="list-disc list-inside">
                        {itinerary.restaurants.map((restaurant, index) => (
                            <li key={index}>{restaurant}</li>
                        ))}
                    </ul>
                </div>
            </TableCell>
        </TableRow>
    );
};

export default ExpandedRows;
