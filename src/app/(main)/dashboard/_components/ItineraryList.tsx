"use client";

import {
    deleteItineraryById,
    Itinerary,
    ItineraryStatus,
} from "@/api/ItineraryAPI";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/components/Select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/Table";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Fragment, useState } from "react";
import { useSWRConfig } from "swr";
import DeleteItineraryTrigger from "./DeleteItineraryTrigger";
import ExpandedRows from "./ExpandedRows";
import StatusSelectItems from "./StatusSelectItems";
import { useToast } from "@/hooks/useToast";
type ItineraryListProps = {
    readonly?: boolean;
    itineraries: Itinerary[];
};
const getStatusBadge = (status: ItineraryStatus) => {
    switch (status) {
        case "DRAFT":
            return (
                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                    Draft
                </Badge>
            );
        case "ACTIVE":
            return (
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    Active
                </Badge>
            );
        case "COMPLETE":
            return (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                    Complete
                </Badge>
            );
    }
};
export default function ItineraryList({
    readonly,
    itineraries,
}: ItineraryListProps) {
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
    const [openStatusDropdown, setOpenStatusDropdown] = useState<string | null>(
        null
    );
    const { toast } = useToast();
    const { mutate } = useSWRConfig();
    const toggleRow = (id: string) => {
        const newExpandedRows = new Set(expandedRows);
        if (newExpandedRows.has(id)) {
            newExpandedRows.delete(id);
        } else {
            newExpandedRows.add(id);
        }
        setExpandedRows(newExpandedRows);
    };

    const deleteItinerary = async (id: string) => {
        try {
            await deleteItineraryById(id);
            mutate("/api/itineraries");
            toast({
                title: "Itinerary deleted",
                variant: "default",
                description: "The itinerary has been successfully deleted.",
            });
        } catch {
            toast({
                title: "Failed to delete",
                variant: "destructive",
                description:
                    "An error occurred while trying to delete the itinerary. Please try again.",
            });
        }
    };

    const changeStatus = (id: string, newStatus: ItineraryStatus) => {
        //TODO: Implement change status
        setOpenStatusDropdown(null);
    };

    return (
        <div className="mx-auto py-10 max-w-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-full">
            <h1 className="text-2xl font-bold mb-4">Your Itineraries</h1>
            <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-track-transparent">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead>Destination</TableHead>
                            <TableHead>Dates</TableHead>
                            <TableHead>Travelers</TableHead>
                            <TableHead>Budget</TableHead>
                            <TableHead>Status</TableHead>
                            {!readonly && <TableHead>Actions</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {itineraries.map((itinerary) => (
                            <Fragment key={itinerary.id}>
                                <TableRow key={itinerary.id}>
                                    <TableCell>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                toggleRow(itinerary.id)
                                            }
                                            aria-label={
                                                expandedRows.has(itinerary.id)
                                                    ? "Collapse row"
                                                    : "Expand row"
                                            }
                                        >
                                            {expandedRows.has(itinerary.id) ? (
                                                <ChevronUp className="h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {itinerary.destination}
                                    </TableCell>
                                    <TableCell>{`${itinerary.startDate} - ${itinerary.endDate}`}</TableCell>
                                    <TableCell>{itinerary.travelers}</TableCell>
                                    <TableCell>
                                        ${itinerary.totalBudget}
                                    </TableCell>
                                    <TableCell>
                                        {readonly ? (
                                            getStatusBadge(itinerary.status)
                                        ) : openStatusDropdown ===
                                          itinerary.id ? (
                                            <Select
                                                value={itinerary.status}
                                                onValueChange={(value) => {
                                                    changeStatus(
                                                        itinerary.id,
                                                        value as ItineraryStatus
                                                    );
                                                    setOpenStatusDropdown(null);
                                                }}
                                                open={true}
                                                onOpenChange={(open) => {
                                                    if (!open)
                                                        setOpenStatusDropdown(
                                                            null
                                                        );
                                                }}
                                            >
                                                <SelectTrigger className="w-[130px] focus:ring-0">
                                                    <SelectValue>
                                                        {getStatusBadge(
                                                            itinerary.status
                                                        )}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <StatusSelectItems />
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            <Button
                                                variant="ghost"
                                                onClick={() =>
                                                    setOpenStatusDropdown(
                                                        itinerary.id
                                                    )
                                                }
                                                className="w-[80px] p-0 font-normal hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                                            >
                                                {getStatusBadge(
                                                    itinerary.status
                                                )}
                                            </Button>
                                        )}
                                    </TableCell>
                                    {!readonly && (
                                        <TableCell>
                                            <DeleteItineraryTrigger
                                                handleDelete={() => {
                                                    deleteItinerary(
                                                        itinerary.id
                                                    );
                                                }}
                                            />
                                        </TableCell>
                                    )}
                                </TableRow>
                                {expandedRows.has(itinerary.id) && (
                                    <ExpandedRows
                                        itinerary={itinerary}
                                        readonly={readonly}
                                    />
                                )}
                            </Fragment>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
