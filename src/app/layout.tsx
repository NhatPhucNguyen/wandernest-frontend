import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/Toaster";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "WanderNest | Find Your Perfect Stay",
    description: "Discover and book unique accommodations around the world with WanderNest - your home away from home.",
    keywords: ["accommodation", "travel", "hotels", "vacation rentals", "booking"],
    authors: [{ name: "Nhat Nguyen" }],
    category: "Travel",
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "WanderNest | Find Your Perfect Stay",
        description: "Discover and book unique accommodations around the world with WanderNest.",
        url: "https://wandernest.com",
        siteName: "WanderNest",
        images: [
            {
                url: "/images/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "WanderNest - Find Your Perfect Stay",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "WanderNest | Find Your Perfect Stay",
        description: "Discover and book unique accommodations around the world with WanderNest.",
        images: ["/images/twitter-image.jpg"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}
