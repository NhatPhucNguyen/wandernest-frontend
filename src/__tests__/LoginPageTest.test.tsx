import { login } from "@/api/AuthAPI";
import LoginPage from "@/app/accounts/login/page";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
vi.mock("@/api/AuthAPI", () => ({
    login: vi.fn(),
}));

describe("LoginPage", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders the login form", () => {
        render(<LoginPage />);
        expect(screen.getByLabelText(/Username/i)).toBeDefined();
        expect(screen.getByLabelText(/Password/i)).toBeDefined();
        expect(screen.getByRole("button", { name: /Sign In/i })).toBeDefined();
    });

    it("displays an error message when login fails", async () => {
        (login as Mock).mockResolvedValueOnce({
            errorMessage: "Invalid credentials",
        });

        render(<LoginPage />);

        fireEvent.change(screen.getByLabelText(/Username/i), {
            target: { value: "testuser" },
        });
        fireEvent.change(screen.getByLabelText(/Password/i), {
            target: { value: "password" },
        });
        fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

        expect(await screen.findByText(/Invalid credentials/i)).toBeDefined();
    });

    it("does not display an error message when login succeeds", async () => {
        (login as Mock).mockResolvedValueOnce({});

        render(<LoginPage />);

        fireEvent.change(screen.getByLabelText(/Username/i), {
            target: { value: "testuser" },
        });
        fireEvent.change(screen.getByLabelText(/Password/i), {
            target: { value: "password" },
        });
        fireEvent.click(screen.getByRole("button", { name: /Sign In/i }));

        expect(screen.queryByText(/Invalid credentials/i)).toBeNull();
    });
});
