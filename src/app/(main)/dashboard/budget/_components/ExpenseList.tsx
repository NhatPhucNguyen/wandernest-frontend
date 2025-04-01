"use client";

import {
    Expense,
    ExpenseRequest,
    createExpense,
    deleteExpense,
    updateExpense,
} from "@/api/BudgetAPI";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/Table";
import { useToast } from "@/hooks/useToast";
import { format } from "date-fns";
import { Edit, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { mutate } from "swr";
import { AddExpenseDialog } from "./AddExpenseDialog";
import { DeleteExpenseDialog } from "./DeleteExpenseDialog";

interface ExpenseListProps {
    expenses: Expense[];
    selectedItineraryId: string | null;
}

export default function ExpenseList({
    expenses,
    selectedItineraryId,
}: ExpenseListProps) {
    const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
    const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    // Filter expenses by selected itinerary
    const filteredExpenses = selectedItineraryId
        ? expenses.filter(
              (expense) =>
                  expense.itineraryId.toString() === selectedItineraryId
          )
        : expenses;

    // Sort expenses by date (newest first)
    const sortedExpenses = [...filteredExpenses].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Safe cleanup to ensure UI stays responsive
    const safeCleanup = useCallback(() => {
        // Reset any focus and modal-related DOM elements that might be stuck
        setTimeout(() => {
            // Clear any focus issues
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
            
            // Reset any modal-related elements
            document.body.style.pointerEvents = "";
            document.body.style.overflow = "";
            
            // Remove any lingering backdrop
            document.querySelectorAll("[data-radix-portal]").forEach(el => {
                if (el instanceof HTMLElement) {
                    el.style.display = "none";
                }
            });
            
            // Reset state
            setIsLoading(false);
        }, 0);
    }, []);

    // Cleanup when component unmounts
    useEffect(() => {
        return safeCleanup;
    }, [safeCleanup]);

    const handleAddExpense = async (expenseData: ExpenseRequest) => {
        if (!selectedItineraryId) {
            toast({
                title: "Error",
                description: "No itinerary selected",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        try {
            await createExpense(selectedItineraryId, expenseData);
            toast({
                title: "Success",
                description: "Expense added successfully",
            });
            // Refresh the data
            await mutate(`/api/budgetAllocation/${selectedItineraryId}`);
        } catch (error) {
            console.error("Error adding expense:", error);
            toast({
                title: "Error",
                description: "Failed to add expense. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
            setIsAddExpenseOpen(false);
            safeCleanup();
        }
    };

    const handleEditExpense = (expense: Expense) => {
        setEditingExpense(expense);
        setIsAddExpenseOpen(true);
    };

    const handleUpdateExpense = async (expenseData: ExpenseRequest) => {
        if (!editingExpense || !selectedItineraryId) {
            toast({
                title: "Error",
                description: "No expense selected for update",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        try {
            await updateExpense(editingExpense.id, expenseData);
            toast({
                title: "Success",
                description: "Expense updated successfully",
            });
            // Refresh the data
            await mutate(`/api/budgetAllocation/${selectedItineraryId}`);
        } catch (error) {
            console.error("Error updating expense:", error);
            toast({
                title: "Error",
                description: "Failed to update expense. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
            setIsAddExpenseOpen(false);
            setEditingExpense(null);
            safeCleanup();
        }
    };

    const handleDeleteClick = (expense: Expense) => {
        setExpenseToDelete(expense);
        setIsDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!expenseToDelete || !selectedItineraryId) {
            toast({
                title: "Error",
                description: "No expense selected for deletion",
                variant: "destructive",
            });
            return;
        }

        setIsLoading(true);
        try {
            // Store expense ID to use after state reset
            const expenseId = expenseToDelete.id;
            
            // Close dialog first to avoid UI issues
            setIsDeleteDialogOpen(false);
            
            // Then delete
            await deleteExpense(expenseId);
            
            toast({
                title: "Success",
                description: "Expense deleted successfully",
            });
            
            // Refresh the data
            await mutate(`/api/budgetAllocation/${selectedItineraryId}`);
        } catch (error) {
            console.error("Error deleting expense:", error);
            toast({
                title: "Error",
                description: "Failed to delete expense. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
            setExpenseToDelete(null);
            safeCleanup();
        }
    };

    const onSubmitExpense = (expenseData: ExpenseRequest) => {
        if (editingExpense) {
            handleUpdateExpense(expenseData);
        } else {
            handleAddExpense(expenseData);
        }
    };

    return (
        <Card className="col-span-1 lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Expenses</CardTitle>
                <Button
                    onClick={() => {
                        setEditingExpense(null);
                        setIsAddExpenseOpen(true);
                    }}
                    disabled={!selectedItineraryId || isLoading}
                >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Expense
                </Button>
            </CardHeader>
            <CardContent>
                {sortedExpenses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <p className="text-muted-foreground mb-4">
                            No expenses recorded yet.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => setIsAddExpenseOpen(true)}
                            disabled={!selectedItineraryId || isLoading}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Your First Expense
                        </Button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Date</TableHead>
                                    {!selectedItineraryId && (
                                        <TableHead>Itinerary</TableHead>
                                    )}
                                    <TableHead className="text-right">
                                        Amount
                                    </TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sortedExpenses.map((expense) => (
                                    <TableRow key={expense.id}>
                                        <TableCell className="font-medium">
                                            {expense.description}
                                        </TableCell>
                                        <TableCell>
                                            {expense.category
                                                .charAt(0)
                                                .toUpperCase() +
                                                expense.category
                                                    .slice(1)
                                                    .toLocaleLowerCase()}
                                        </TableCell>
                                        <TableCell>
                                            {format(
                                                new Date(expense.date),
                                                "MMM d, yyyy"
                                            )}
                                        </TableCell>
                                        {!selectedItineraryId && (
                                            <TableCell>
                                                {expense.itineraryDestination}
                                            </TableCell>
                                        )}
                                        <TableCell className="text-right font-medium">
                                            ${expense.amount.toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        className="h-8 w-8 p-0"
                                                        disabled={isLoading}
                                                    >
                                                        <span className="sr-only">
                                                            Open menu
                                                        </span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>
                                                        Actions
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            handleEditExpense(expense);
                                                        }}
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            handleDeleteClick(expense);
                                                        }}
                                                        className="text-red-600"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </CardContent>

            {/* Add expense dialog */}
            <AddExpenseDialog
                open={isAddExpenseOpen}
                onOpenChange={(open) => {
                    if (!isLoading) {
                        setIsAddExpenseOpen(open);
                        if (!open) {
                            setEditingExpense(null);
                            safeCleanup();
                        }
                    }
                }}
                onAddExpense={onSubmitExpense}
                selectedItineraryId={selectedItineraryId}
                editingExpense={editingExpense}
                isLoading={isLoading}
            />
            
            {/* Delete confirmation dialog - now using the separate component */}
            <DeleteExpenseDialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                expenseToDelete={expenseToDelete}
                onConfirmDelete={handleDeleteConfirm}
                isLoading={isLoading}
            />
        </Card>
    );
}