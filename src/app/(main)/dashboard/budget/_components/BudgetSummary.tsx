"use client";

import { Expense } from "@/api/BudgetAPI";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Progress } from "@/components/Progress";
import useUserItineraries from "@/hooks/useUserItineraries";

interface BudgetSummaryProps {
    expenses: Expense[];
    totalBudget: number;
    selectedItineraryId: string | null;
}

export default function BudgetSummary({
    expenses,
    totalBudget,
    selectedItineraryId,
}: BudgetSummaryProps) {
    const { itineraries } = useUserItineraries();
    // Calculate total spent
    const totalSpent = expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
    );

    // Calculate remaining budget
    const remainingBudget = totalBudget - totalSpent;

    // Calculate percentage spent
    const percentageSpent = Math.min(
        Math.round((totalSpent / totalBudget) * 100),
        100
    );

    // Get current itinerary name
    const currentItinerary = selectedItineraryId
        ? itineraries?.find((itinerary) => itinerary.id == selectedItineraryId)
              ?.destination
        : "All Itineraries";

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Budget
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        ${totalBudget.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        For {currentItinerary}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Spent
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        ${totalSpent.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {percentageSpent}% of total budget
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Remaining Budget
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div
                        className={`text-2xl font-bold ${
                            remainingBudget < 0 ? "text-red-500" : ""
                        }`}
                    >
                        ${remainingBudget.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {Math.abs(100 - percentageSpent)}% remaining
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Budget Progress
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Progress
                        value={percentageSpent}
                        className={`h-2 ${
                            remainingBudget < 0 ? "bg-red-500/20" : ""
                        }`}
                    />
                    <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                        <div>0%</div>
                        <div>50%</div>
                        <div>100%</div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
