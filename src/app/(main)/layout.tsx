"use client";
import React from "react";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/Sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/Button";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const handleLogout = () => {
        console.log("Logout");
    };
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full justify-between">
                        <SidebarTrigger />
                        <Button variant={"secondary"} onClick={handleLogout}>
                            Logout
                        </Button>
                    </header>
                    <main>{children}</main>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
};

export default DashboardLayout;
