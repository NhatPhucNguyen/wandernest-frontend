"use client";
import { logout } from "@/api/AuthAPI";
import { AppSidebar } from "@/app/(main)/AppSidebar";
import { Button } from "@/components/Button";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import React from "react";
import withAuth from '../../hoc/withAuth';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const handleLogout = async () => {
        await logout();
        router.replace("/accounts/login");
    };
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full justify-between">
                    <SidebarTrigger />
                    <Button variant={"secondary"} onClick={handleLogout}>
                        Logout
                    </Button>
                </header>
                <section className="min-h-screen">{children}</section>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default withAuth(DashboardLayout);
