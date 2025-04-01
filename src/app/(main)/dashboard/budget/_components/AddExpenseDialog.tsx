"use client";

import { Expense, ExpenseCategory, ExpenseRequest } from "@/api/BudgetAPI";
import { Button } from "@/components/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/Dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/Form";
import { Input } from "@/components/Input";
import { Label } from "@/components/Label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/Select";
import { useToast } from "@/hooks/useToast";
import useUserItineraries from "@/hooks/useUserItineraries";
import { ExpenseFormSchema, expenseSchema } from "@/schema/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddExpenseDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAddExpense: (expense: ExpenseRequest) => void;
    selectedItineraryId: string | null;
    editingExpense: Expense | null;
    isLoading?: boolean;
}

export function AddExpenseDialog({
    open,
    onOpenChange,
    onAddExpense,
    selectedItineraryId,
    editingExpense,
    isLoading = false,
}: AddExpenseDialogProps) {
    const { itineraries } = useUserItineraries();
    const { toast } = useToast();

    // Initialize form with react-hook-form and zod validation
    const form = useForm<ExpenseFormSchema>({
        resolver: zodResolver(expenseSchema),
        defaultValues: {
            description: "",
            amount: 0,
            category: ExpenseCategory.FOOD,
            date: new Date(),
            itineraryId: selectedItineraryId || "",
        },
    });

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
            document.querySelectorAll("[data-radix-portal]").forEach((el) => {
                if (el instanceof HTMLElement) {
                    el.style.display = "none";
                }
            });
        }, 0);
    }, []);

    // Cleanup when dialog closes
    useEffect(() => {
        if (!open) {
            safeCleanup();
        }
    }, [open, safeCleanup]);

    // Cleanup when component unmounts
    useEffect(() => {
        return safeCleanup;
    }, [safeCleanup]);

    function formatDateForInput(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    }

    // Reset form when editing expense changes or dialog opens
    useEffect(() => {
        if (open) {
            if (editingExpense) {
                form.reset({
                    description: editingExpense.description,
                    amount: editingExpense.amount,
                    category: editingExpense.category as ExpenseCategory,
                    itineraryId: editingExpense.itineraryId.toString(),
                    date: new Date(editingExpense.date),
                });
            } else {
                form.reset({
                    description: "",
                    amount: 0,
                    category: ExpenseCategory.FOOD,
                    itineraryId:
                        selectedItineraryId ||
                        (itineraries && itineraries[0]?.id) ||
                        "",
                    date: new Date(),
                });
            }
        }
    }, [open, editingExpense, itineraries, selectedItineraryId, form]);

    // Handle form submission
    const onSubmit = (data: ExpenseFormSchema) => {
        if (!selectedItineraryId && !data.itineraryId) {
            toast({
                title: "Error",
                description: "Please select an itinerary",
                variant: "destructive",
            });
            return;
        }

        const expenseRequest: ExpenseRequest = {
            description: data.description.trim(),
            amount: Number(data.amount),
            category: data.category,
            date: data.date,
            itineraryId: Number(data.itineraryId || selectedItineraryId),
        };

        onAddExpense(expenseRequest);
    };

    // Custom close handler to ensure proper cleanup
    const handleOpenChange = (newOpen: boolean) => {
        if (isLoading) return; // Prevent closing while loading

        if (!newOpen) {
            form.reset(); // Reset form when dialog closes
            // Use a small delay before closing to let any animations complete
            setTimeout(() => {
                onOpenChange(newOpen);
                safeCleanup();
            }, 10);
        } else {
            onOpenChange(newOpen);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
                className="sm:max-w-[425px]"
                onEscapeKeyDown={(e) => {
                    if (isLoading) e.preventDefault();
                }}
                onPointerDownOutside={(e) => {
                    if (isLoading) e.preventDefault();
                }}
                // Force any elements to be cleaned up properly
                onCloseAutoFocus={(e) => {
                    e.preventDefault();
                    safeCleanup();
                }}
            >
                <DialogHeader>
                    <DialogTitle>
                        {editingExpense ? "Edit Expense" : "Add Expense"}
                    </DialogTitle>
                    <DialogDescription>
                        {editingExpense
                            ? "Update the expense details below."
                            : "Fill in the details of your expense."}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 py-4"
                    >
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="description"
                                        className="text-right"
                                    >
                                        Description
                                    </Label>
                                    <div className="col-span-3">
                                        <FormControl>
                                            <Input
                                                id="description"
                                                placeholder="e.g., Hotel Stay"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="amount"
                                        className="text-right"
                                    >
                                        Amount
                                    </Label>
                                    <div className="col-span-3">
                                        <FormControl>
                                            <Input
                                                id="amount"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                placeholder="0.00"
                                                disabled={isLoading}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="category"
                                        className="text-right"
                                    >
                                        Category
                                    </Label>
                                    <div className="col-span-3">
                                        <FormControl>
                                            <Select
                                                disabled={isLoading}
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger id="category">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.values(
                                                        ExpenseCategory
                                                    ).map((cat) => (
                                                        <SelectItem
                                                            key={cat}
                                                            value={cat}
                                                        >
                                                            {cat}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="date"
                                        className="text-right"
                                    >
                                        Date
                                    </Label>
                                    <div className="col-span-3">
                                        <FormControl>
                                            <Input
                                                id="date"
                                                type="date"
                                                disabled={isLoading}
                                                value={formatDateForInput(
                                                    field.value
                                                )}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        new Date(e.target.value)
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        <DialogFooter className="pt-4">
                            <Button
                                type="submit"
                                disabled={isLoading || !form.formState.isValid}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {editingExpense
                                            ? "Updating..."
                                            : "Adding..."}
                                    </>
                                ) : (
                                    <>
                                        {editingExpense
                                            ? "Update Expense"
                                            : "Add Expense"}
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
