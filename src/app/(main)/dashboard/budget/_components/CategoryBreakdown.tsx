"use client";

import { Expense } from "@/api/BudgetAPI";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";

interface CategoryBreakdownProps {
    expenses: Expense[];
    selectedItineraryId: string | null;
}

export default function CategoryBreakdown({
    expenses,
    selectedItineraryId,
}: CategoryBreakdownProps) {
    // Filter expenses by selected itinerary
    const filteredExpenses = selectedItineraryId
        ? expenses.filter(
              (expense) =>
                  expense.itineraryId.toString() === selectedItineraryId
          )
        : expenses;

    // Calculate totals by category
    const categoryTotals = filteredExpenses.reduce((acc, expense) => {
        const { category, amount } = expense;
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += amount;
        return acc;
    }, {} as Record<string, number>);

    // Calculate total amount
    const totalAmount = Object.values(categoryTotals).reduce(
        (sum, amount) => sum + amount,
        0
    );

    // Sort categories by amount (highest first)
    const sortedCategories = Object.entries(categoryTotals).sort(
        ([, amountA], [, amountB]) => amountB - amountA
    );

    // Generate colors for categories
    const getColorForIndex = (index: number) => {
        const colors = [
            "bg-blue-500",
            "bg-green-500",
            "bg-yellow-500",
            "bg-purple-500",
            "bg-pink-500",
            "bg-indigo-500",
            "bg-red-500",
            "bg-orange-500",
            "bg-teal-500",
            "bg-cyan-500",
        ];
        return colors[index % colors.length];
    };

    return (
        <Card className="col-span-1">
            <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent>
                {sortedCategories.length === 0 ? (
                    <div className="flex items-center justify-center py-8 text-center">
                        <p className="text-muted-foreground">
                            No expense data available.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {/* Bar chart */}
                        <div className="space-y-2">
                            {sortedCategories.map(
                                ([category, amount], index) => {
                                    const percentage = totalAmount
                                        ? (amount / totalAmount) * 100
                                        : 0;

                                    return (
                                        <div
                                            key={category}
                                            className="space-y-1"
                                        >
                                            <div className="flex justify-between text-sm">
                                                <span>
                                                    {category
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        category
                                                            .slice(1)
                                                            .toLowerCase()}
                                                </span>
                                                <span className="font-medium">
                                                    ${amount.toFixed(2)}
                                                </span>
                                            </div>
                                            <div className="h-2 w-full rounded-full bg-secondary">
                                                <div
                                                    className={`h-2 rounded-full ${getColorForIndex(
                                                        index
                                                    )}`}
                                                    style={{
                                                        width: `${percentage}%`,
                                                    }}
                                                />
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {percentage.toFixed(1)}%
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>

                        {/* Total */}
                        <div className="pt-2 border-t">
                            <div className="flex justify-between font-medium">
                                <span>Total</span>
                                <span>${totalAmount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
