import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import { AppSidebar } from "@/app/(main)/AppSidebar";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/Sidebar";

// Mock the usePathname hook
vi.mock("next/navigation", () => ({
    usePathname: vi.fn(),
}));
//mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});
describe("AppSidebar", () => {
    it("renders the sidebar with menu items", () => {
        // Mock the pathname
        (usePathname as Mock).mockReturnValue("/");

        render(
            <SidebarProvider>
                <AppSidebar />
            </SidebarProvider>
        );

        expect(screen.getByText("Dashboard")).toBeDefined();
        expect(screen.getByText("Itinerary")).toBeDefined();
        expect(screen.getByText("Accommodations")).toBeDefined();
        expect(screen.getByText("Dining")).toBeDefined();
        expect(screen.getByText("Activities")).toBeDefined();
        expect(screen.getByText("Budget Tracker")).toBeDefined();
        expect(screen.getByText("Settings")).toBeDefined();
    });
});
