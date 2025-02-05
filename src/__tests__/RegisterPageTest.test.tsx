import RegisterPage from "@/app/accounts/register/page";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
vi.mock("next/navigation", () => ({
    useRouter() {
        return {
            route: "/",
            pathname: "",
            query: "",
            asPath: "",
        };
    },
}));
//const mock = new AxiosMockAdapter(customAxios);
describe("RegisterPage", () => {
    it("renders the registration form", () => {
        render(<RegisterPage />);
        expect(screen.getByLabelText("Username")).toBeDefined();
        expect(screen.getByLabelText("Password")).toBeDefined();
        expect(screen.getByLabelText("Confirm Password")).toBeDefined();
        expect(screen.getByLabelText("Email")).toBeDefined();
        expect(screen.getByRole("button", { name: "Sign Up" })).toBeDefined();
    });

    it("displays an error message on failed registration", () => {
        render(<RegisterPage />);
        fireEvent.change(screen.getByLabelText("Username"), {
            target: { value: "" },
        });
        fireEvent.change(screen.getByLabelText("Password"), {
            target: { value: "" },
        });
        fireEvent.change(screen.getByLabelText("Confirm Password"), {
            target: { value: "" },
        });
        fireEvent.change(screen.getByLabelText("Email"), {
            target: { value: "" },
        });
        fireEvent.click(screen.getByRole("button", { name: "Sign Up" }));

        expect(
            screen.findByText("User name must be more than 3 characters")
        ).toBeDefined();
        expect(screen.findByText("Password is required")).toBeDefined();
        expect(screen.findByText("Confirm Password is required")).toBeDefined();
        expect(screen.findByText("Email is required")).toBeDefined();
    });
});
