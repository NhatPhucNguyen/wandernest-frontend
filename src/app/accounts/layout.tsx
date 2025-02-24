"use client";
import Cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    useEffect(() => {
        if (Cookie.get("token")) {
            router.replace("/dashboard");
        }
    }, [router]);
    return children;
}
