"use client";

import { Button } from "@/components/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/Dialog";
import { Expense } from "@/api/BudgetAPI";
import { useCallback } from "react";

interface DeleteExpenseDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    expenseToDelete: Expense | null;
    onConfirmDelete: () => Promise<void>;
    isLoading: boolean;
}

export function DeleteExpenseDialog({
    open,
    onOpenChange,
    expenseToDelete,
    onConfirmDelete,
    isLoading,
}: DeleteExpenseDialogProps) {
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
        }, 0);
    }, []);

    // Handle dialog close
    const handleOpenChange = (open: boolean) => {
        if (!isLoading) {
            onOpenChange(open);
            if (!open) {
                safeCleanup();
            }
        }
    };

    // Handle cancel button
    const handleCancel = () => {
        onOpenChange(false);
        safeCleanup();
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
                onCloseAutoFocus={(e) => {
                    e.preventDefault();
                    safeCleanup();
                }}
            >
                <DialogHeader>
                    <DialogTitle>Delete Expense</DialogTitle>
                    <DialogDescription>
                        This will permanently delete the expense{" "}
                        <span className="font-semibold">{expenseToDelete?.description}</span>. 
                        This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex items-center gap-2 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isLoading}
                        className="mt-0"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={onConfirmDelete}
                        disabled={isLoading}
                        className="mt-0"
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}