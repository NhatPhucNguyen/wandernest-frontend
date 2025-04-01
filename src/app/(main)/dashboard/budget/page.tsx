"use client";

import { getBudgetAllocation } from "@/api/BudgetAPI";
import { Button } from "@/components/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tabs";
import useUserItineraries from "@/hooks/useUserItineraries";
import { MapPin } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import ItinerarySelect from "../_components/ItinerarySelect";
import BudgetAllocation from "./_components/BudgetAllocation";
import BudgetSummary from "./_components/BudgetSummary";
import CategoryBreakdown from "./_components/CategoryBreakdown";
import ExpenseList from "./_components/ExpenseList";

// Expense categories
const expenseCategories = [
    "Accommodation",
    "Transportation",
    "Food",
    "Activities",
    "Shopping",
    "Entertainment",
    "Other",
];

export default function BudgetPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { itineraries } = useUserItineraries();
    const selectedItineraryId = searchParams.get("itinerary");
    const { data, isLoading } = useSWR(
        selectedItineraryId ? `/api/budgetAllocation/${selectedItineraryId}` : null,
        () => selectedItineraryId ? getBudgetAllocation(selectedItineraryId) : null
    );
    const [activeTab, setActiveTab] = useState("overview");

    // If user has itineraries but none selected, show a prompt to select one
    if (!selectedItineraryId && itineraries && itineraries.length > 0) {
        return (
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Budget Tracker</h1>
                
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Select an Itinerary</CardTitle>
                        <CardDescription>
                            Please select an itinerary to view and manage its budget
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p>You need to select an itinerary before you can manage its budget.</p>
                            
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <ItinerarySelect path="/dashboard/budget" />
                                
                                <Button 
                                    variant="outline"
                                    onClick={() => router.push("/dashboard/itinerary")}
                                    className="flex items-center gap-2"
                                >
                                    <MapPin className="h-4 w-4" />
                                    Create New Itinerary
                                </Button>
                            </div>
                            
                            {itineraries.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-sm text-muted-foreground">
                                        You have {itineraries.length} itineraries. Select one from the dropdown above.
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // If no itineraries exist at all, show a different message
    if (!selectedItineraryId && (!itineraries || itineraries.length === 0)) {
        return (
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Budget Tracker</h1>
                
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>No Itineraries Found</CardTitle>
                        <CardDescription>
                            Create an itinerary to start tracking your budget
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p>You don&apos;t have any itineraries yet. Create one to start tracking your expenses.</p>
                            
                            <Button 
                                onClick={() => router.push("/dashboard/itinerary")}
                                className="flex items-center gap-2"
                            >
                                <MapPin className="h-4 w-4" />
                                Create Itinerary
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Show loading state
    if (isLoading) {
        return (
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Budget Tracker</h1>
                <div className="flex items-center justify-center py-12">
                    <div className="animate-pulse flex flex-col space-y-4 w-full">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-40 bg-slate-200 rounded"></div>
                        <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                        <div className="h-40 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    // If no data found for selected itinerary
    if (!data) {
        return (
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-bold mb-6">Budget Tracker</h1>
                <div className="flex items-center gap-4 mb-6">
                    <ItinerarySelect path="/dashboard/budget" />
                </div>
                
                <Card>
                    <CardHeader>
                        <CardTitle>No Budget Data</CardTitle>
                        <CardDescription>
                            The selected itinerary doesn&apos;t have any budget data yet
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Start by setting a budget and adding expenses to track your spending.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Main budget page with data
    return (
        <div className="container mx-auto py-8 px-1">
            <h1 className="text-3xl font-bold mb-6">Budget Tracker</h1>

            <div className="flex items-center gap-4 mb-6">
                <ItinerarySelect path="/dashboard/budget" />
            </div>

            <Tabs
                defaultValue="overview"
                className="mb-6"
                onValueChange={setActiveTab}
                value={activeTab}
            >
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="allocation">
                        Budget Allocation
                    </TabsTrigger>
                    <TabsTrigger value="expenses">Expenses</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6 mt-6">
                    <BudgetSummary
                        expenses={data.expenses}
                        totalBudget={data.totalBudget}
                        selectedItineraryId={selectedItineraryId}
                    />

                    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-4">
                        <CategoryBreakdown
                            expenses={data.expenses}
                            selectedItineraryId={selectedItineraryId}
                        />

                        <ExpenseList
                            expenses={data.expenses}
                            selectedItineraryId={selectedItineraryId}
                        />
                    </div>
                </TabsContent>
                
                <TabsContent value="allocation" className="mt-6">
                    <BudgetAllocation
                        totalBudget={data.totalBudget}
                        selectedItineraryId={selectedItineraryId}
                        categories={expenseCategories}
                        expenses={data.expenses}
                        data={data}
                    />
                </TabsContent>

                <TabsContent value="expenses" className="mt-6">
                    <ExpenseList
                        expenses={data.expenses}
                        selectedItineraryId={selectedItineraryId}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}