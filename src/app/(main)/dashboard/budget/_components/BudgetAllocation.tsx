"use client";

import {
    BudgetAllocation as BudgetAllocationData,
    BudgetAllocationRequest, // Ensure this type is correctly defined
    Expense,
    ExpenseCategory,
    updateBudgetAllocation,
} from "@/api/BudgetAPI";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/Card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/Dialog";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import { Progress } from "@/components/Progress";
import { Separator } from "@/components/Separator";
import { useToast } from "@/hooks/useToast";
import useUserItineraries from "@/hooks/useUserItineraries";
import { DialogClose } from "@radix-ui/react-dialog";
import { Edit2, Minus, Plus, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { mutate } from "swr";

interface BudgetAllocationProps {
    totalBudget: number;
    selectedItineraryId: string | null;
    categories: string[];
    expenses: Expense[];
    data: BudgetAllocationData;
}

type Allocation = {
    category: ExpenseCategory;
    spent: number;
    allocatedAmount: number;
};

export default function BudgetAllocation({
    totalBudget,
    selectedItineraryId,
    categories,
    expenses,
    data,
}: BudgetAllocationProps) {
    const { currentItinerary } = useUserItineraries();

    // Original data from props
    const [originalTotalBudget] = useState(totalBudget);
    const [originalData] = useState(data);

    // Local working copy for editing
    const [editingBudget, setEditingBudget] = useState(false);
    const [newTotalBudget, setNewTotalBudget] = useState(totalBudget);
    const [editingCategory, setEditingCategory] = useState<string | null>(null);
    const [newAllocation, setNewAllocation] = useState(0);
    const { toast } = useToast();
    const [allocations, setAllocations] = useState<Allocation[]>(
        Object.keys(ExpenseCategory).map((category) => {
            const spent = expenses
                .filter(
                    (expense) =>
                        expense.category === category &&
                        (selectedItineraryId
                            ? expense.itineraryId.toString() ===
                              selectedItineraryId
                            : true)
                )
                .reduce((sum, expense) => sum + expense.amount, 0);

            return {
                category: category as ExpenseCategory,
                spent,
                allocatedAmount:
                    Number(data[category.toLowerCase() as keyof typeof data]) ||
                    0,
            };
        })
    );

    // Track if there are unsaved changes
    const [isDirty, setIsDirty] = useState(false);

    // Calculate allocated and unallocated amounts
    const totalAllocated = allocations.reduce(
        (sum, allocation) => sum + allocation.allocatedAmount,
        0
    );
    const unallocatedAmount = newTotalBudget - totalAllocated;

    // Calculate total spent
    const totalSpent = allocations.reduce(
        (sum, allocation) => sum + allocation.spent,
        0
    );

    // Update dirty state whenever allocations or budget changes
    useEffect(() => {
        const budgetChanged = newTotalBudget !== originalTotalBudget;

        const allocationsChanged = allocations.some((allocation) => {
            const originalAmount =
                Number(
                    originalData[
                        allocation.category.toLowerCase() as keyof typeof originalData
                    ]
                ) || 0;
            return allocation.allocatedAmount !== originalAmount;
        });

        setIsDirty(budgetChanged || allocationsChanged);
    }, [allocations, newTotalBudget, originalData, originalTotalBudget]);

    const handleSaveTotalBudget = () => {
        setEditingBudget(false);
    };

    const handleSaveAllocation = (category: ExpenseCategory) => {
        setAllocations((prev) =>
            prev.map((allocation) => {
                return allocation.category === category
                    ? { ...allocation, allocatedAmount: newAllocation }
                    : allocation;
            })
        );
        setEditingCategory(null);
    };

    const handleEditAllocation = (category: string, currentAmount: number) => {
        setEditingCategory(category);
        setNewAllocation(currentAmount);
    };

    const handleIncreaseAllocation = (category: string) => {
        if (unallocatedAmount <= 0) return;
        const increaseBy = Math.min(50, unallocatedAmount);
        setAllocations((prev) =>
            prev.map((allocation) =>
                allocation.category === category
                    ? {
                          ...allocation,
                          allocatedAmount:
                              allocation.allocatedAmount + increaseBy,
                      }
                    : allocation
            )
        );
    };

    const handleDecreaseAllocation = (category: string, amount: number) => {
        if (amount <= 50) return;

        setAllocations((prev) =>
            prev.map((allocation) =>
                allocation.category === category
                    ? {
                          ...allocation,
                          allocatedAmount: allocation.allocatedAmount - 50,
                      }
                    : allocation
            )
        );
    };

    const resetAllocations = () => {
        const evenAmount = Math.floor(newTotalBudget / categories.length);
        setAllocations(
            Object.keys(ExpenseCategory).map((category) => {
                const spent = expenses
                    .filter(
                        (expense) =>
                            expense.category === category &&
                            (selectedItineraryId
                                ? expense.itineraryId.toString() ===
                                  selectedItineraryId
                                : true)
                    )
                    .reduce((sum, expense) => sum + expense.amount, 0);

                return {
                    category: category as ExpenseCategory,
                    spent,
                    allocatedAmount: evenAmount,
                };
            })
        );
    };

    // Save changes to the backend
    const saveChanges = async () => {
        if (!selectedItineraryId || !isDirty) return;
        try {
            // Prepare the data to send to the API
            const updatedBudgetData = {} as BudgetAllocationRequest;
            allocations.forEach((allocation) => {
                updatedBudgetData[
                    allocation.category.toLowerCase() as keyof BudgetAllocationRequest
                ] = allocation.allocatedAmount;
            });
            // Add the total budget
            updatedBudgetData.totalBudget = newTotalBudget;
            // Call the API
            await updateBudgetAllocation(
                selectedItineraryId,
                updatedBudgetData
            );
            // Update local cache through SWR
            mutate(`/api/budget?itineraryId=${selectedItineraryId}`);
            // Reset dirty state
            setIsDirty(false);
            toast({
                title: "Success",
                description: "Budget allocations saved successfully",
                variant: "default",
            });
        } catch {
            toast({
                title: "Error",
                description: "Failed to save budget allocations",
                variant: "destructive",
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <CardTitle>Budget Allocation</CardTitle>
                        <CardDescription>
                            Allocate your budget across categories
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        {editingBudget ? (
                            <div className="flex items-center gap-2">
                                <Input
                                    type="number"
                                    value={newTotalBudget}
                                    onChange={(e) =>
                                        setNewTotalBudget(
                                            Number(e.target.value)
                                        )
                                    }
                                    className="w-24"
                                />
                                <Button
                                    size="sm"
                                    onClick={handleSaveTotalBudget}
                                >
                                    <Save className="h-4 w-4 mr-1" />
                                    Save
                                </Button>
                            </div>
                        ) : (
                            <>
                                <span className="font-semibold text-lg">
                                    ${newTotalBudget}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setNewTotalBudget(newTotalBudget);
                                        setEditingBudget(true);
                                    }}
                                >
                                    <Edit2 className="h-4 w-4 mr-1" />
                                    Edit
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Budget for {currentItinerary?.destination}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                            <Badge
                                variant={
                                    unallocatedAmount >= 0
                                        ? "outline"
                                        : "destructive"
                                }
                            >
                                {unallocatedAmount >= 0
                                    ? `$${unallocatedAmount} unallocated`
                                    : `$${Math.abs(
                                          unallocatedAmount
                                      )} over-allocated`}
                            </Badge>
                            <Badge variant="secondary">
                                ${totalSpent} spent
                            </Badge>
                            {isDirty && (
                                <Badge
                                    variant="secondary"
                                    className="bg-blue-100 text-blue-800"
                                >
                                    Unsaved Changes
                                </Badge>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                    Distribute Evenly
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Reset Budget Allocation
                                    </DialogTitle>
                                    <DialogDescription>
                                        This will distribute your budget evenly
                                        across all categories. Your current
                                        allocations will be lost.
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button
                                            variant="outline"
                                            onClick={() => {}}
                                        >
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button onClick={resetAllocations}>
                                            Confirm
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                    {allocations.map((allocation) => {
                        const allocateByCategory = allocation.allocatedAmount;
                        const spent = allocation.spent;
                        const percentSpent =
                            spent > allocateByCategory
                                ? 100
                                : allocateByCategory > 0
                                ? Math.min(
                                      (spent / allocateByCategory) * 100,
                                      100
                                  )
                                : 0;
                        return (
                            <div
                                key={allocation.category}
                                className="space-y-2"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <Label>{allocation.category
                                                .charAt(0)
                                                .toUpperCase() +
                                                allocation.category
                                                    .slice(1)
                                                    .toLocaleLowerCase()}</Label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">
                                                ${spent} of $
                                                {allocateByCategory}
                                            </span>
                                            <Badge
                                                variant={
                                                    percentSpent < 80
                                                        ? "outline"
                                                        : percentSpent < 100
                                                        ? "secondary"
                                                        : "destructive"
                                                }
                                                className="text-xs"
                                            >
                                                {percentSpent.toFixed(0)}%
                                            </Badge>
                                        </div>
                                    </div>

                                    {editingCategory === allocation.category ? (
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="number"
                                                value={newAllocation}
                                                onChange={(e) =>
                                                    setNewAllocation(
                                                        Number(e.target.value)
                                                    )
                                                }
                                                className="w-24"
                                            />
                                            <Button
                                                size="sm"
                                                onClick={() =>
                                                    handleSaveAllocation(
                                                        allocation.category
                                                    )
                                                }
                                            >
                                                <Save className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-1">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-7 w-7"
                                                onClick={() =>
                                                    handleDecreaseAllocation(
                                                        allocation.category,
                                                        allocation.allocatedAmount
                                                    )
                                                }
                                            >
                                                <Minus className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    handleEditAllocation(
                                                        allocation.category,
                                                        allocation.allocatedAmount
                                                    )
                                                }
                                            >
                                                ${allocateByCategory}
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-7 w-7"
                                                onClick={() =>
                                                    handleIncreaseAllocation(
                                                        allocation.category
                                                    )
                                                }
                                            >
                                                <Plus className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                                <Progress
                                    value={percentSpent}
                                    className="h-2"
                                />
                            </div>
                        );
                    })}
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={saveChanges} disabled={!isDirty}>
                    {isDirty ? "Save Changes" : "No Changes to Save"}
                </Button>
            </CardFooter>
        </Card>
    );
}
