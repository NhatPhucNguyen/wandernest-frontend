import {
    Binoculars,
    CalendarCheck,
    CircleGauge,
    ConciergeBell,
    Hotel,
    ReceiptText,
    Settings,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/Sidebar";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: CircleGauge,
    },
    {
        title: "Itinerary",
        url: "/dashboard/itinerary",
        icon: CalendarCheck,
    },
    {
        title: "Accommodations",
        url: "/accommodations",
        icon: Hotel,
    },
    {
        title: "Dining",
        url: "/dining",
        icon: ConciergeBell,
    },
    {
        title: "Activities",
        url: "/activities",
        icon: Binoculars,
    },
    {
        title: "Budget Tracker",
        url: "/budget",
        icon: ReceiptText,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
];

export function AppSidebar() {
    const pathName = usePathname();
    const { open } = useSidebar();
    return (
        <Sidebar collapsible="icon">
            <SidebarContent className="bg-gray-800 text-white">
                <SidebarHeader>
                    {open && <h1 className="text-center text-xl font-bold">
                        WanderNest
                    </h1>}
                </SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem
                                    key={item.title}
                                    className="mt-3"
                                >
                                    <SidebarMenuButton
                                        asChild
                                        isActive={
                                            pathName === item.url ? true : false
                                        }
                                    >
                                        <a href={item.url} className="text-lg">
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
