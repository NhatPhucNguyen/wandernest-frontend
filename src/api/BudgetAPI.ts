import customAxios from "@/config/customAxios";

// Enum to match the server-side ExpenseCategory
export enum ExpenseCategory {
    ACCOMMODATION = "Accommodation",
    FOOD = "Food",
    ACTIVITIES = "Activities",
    TRANSPORTATION = "Transportation",
    SHOPPING = "Shopping",
    ENTERTAINMENT = "Entertainment",
    OTHER = "Other",
}

// Interface for Expense
export interface Expense {
    id: number;
    description: string;
    amount: number;
    category: ExpenseCategory;
    date: Date; // ISO format date string
    itineraryDestination: string;
    itineraryId: number;
}

// Interface for creating/updating an expense
export interface ExpenseRequest {
    description: string;
    amount: number;
    category: ExpenseCategory;
    date: Date; // ISO format date string
    itineraryId: number;
}

// Interface for BudgetAllocation
export interface BudgetAllocation {
    id: number;
    totalBudget: number;
    accommodation: number;
    food: number;
    activities: number;
    transportation: number;
    shopping: number;
    entertainment: number;
    other: number;

    remainingBudget: number;
    accommodationSpent: number;
    foodSpent: number;
    activitiesSpent: number;
    transportationSpent: number;
    shoppingSpent: number;
    entertainmentSpent: number;
    otherSpent: number;

    expenses: Expense[];
}

// Type for BudgetAllocationRequest
export type BudgetAllocationRequest = Pick<
    BudgetAllocation,
    | "id"
    | "totalBudget"
    | "accommodation"
    | "food"
    | "activities"
    | "transportation"
    | "shopping"
    | "entertainment"
    | "other"
>;

// API paths
const BUDGET_ALLOCATION_API = "/api/budgetAllocations";
const EXPENSES_API = "/api/expenses";

// Budget Allocation Operations
export const getBudgetAllocation = async (itineraryId: string | null) => {
    if (itineraryId == null) {
        return null;
    }
    const { data } = await customAxios.get<BudgetAllocation>(
        `${BUDGET_ALLOCATION_API}?itineraryId=${itineraryId}`
    );
    return data;
};

export const updateBudgetAllocation = async (
    itineraryId: string,
    requestBody: BudgetAllocationRequest
) => {
    const { data } = await customAxios.put<BudgetAllocation>(
        `${BUDGET_ALLOCATION_API}?itineraryId=${itineraryId}`,
        requestBody
    );
    return data;
};

// Expense CRUD Operations

/**
 * Get all expenses for an itinerary
 * @param itineraryId The ID of the itinerary
 * @returns A list of expenses for the specified itinerary
 */
export const getExpenses = async (
    itineraryId: string | null
): Promise<Expense[] | null> => {
    if (itineraryId == null) {
        return null;
    }

    const { data } = await customAxios.get<Expense[]>(
        `${EXPENSES_API}?itineraryId=${itineraryId}`
    );
    return data;
};

/**
 * Get a specific expense by ID
 * @param expenseId The ID of the expense to retrieve
 * @returns The expense with the specified ID
 */
export const getExpenseById = async (expenseId: number): Promise<Expense> => {
    const { data } = await customAxios.get<Expense>(
        `${EXPENSES_API}/${expenseId}`
    );
    return data;
};

/**
 * Create a new expense
 * @param expense The expense data to create
 * @returns The created expense
 */
export const createExpense = async (
    itineraryId: string,
    expense: ExpenseRequest
): Promise<Expense> => {
    expense = {
        ...expense,
        category: expense.category.toUpperCase() as ExpenseCategory,
    };
    const { data } = await customAxios.post<Expense>(
        EXPENSES_API + `?itineraryId=${itineraryId}`,
        expense
    );
    return data;
};

/**
 * Update an existing expense
 * @param expenseId The ID of the expense to update
 * @param expense The updated expense data
 * @returns The updated expense
 */
export const updateExpense = async (
    expenseId: number,
    expense: ExpenseRequest
): Promise<Expense> => {
    expense = {
        ...expense,
        category: expense.category.toUpperCase() as ExpenseCategory,
    };
    const { data } = await customAxios.put<Expense>(
        `${EXPENSES_API}/${expenseId}`,
        expense
    );
    return data;
};

/**
 * Delete an expense
 * @param expenseId The ID of the expense to delete
 * @returns void
 */
export const deleteExpense = async (expenseId: number): Promise<Expense> => {
    const { data } = await customAxios.delete(`${EXPENSES_API}/${expenseId}`);
    return data;
};
