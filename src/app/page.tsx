"use client";

import { Calendar, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FeatureItem from "./_components/FeatureItem";
import StepCard from "./_components/StepCard";
import TestimonialCard from "./_components/TestimonialCard";
import SmoothScrollLink from "./_components/SmoothScrollLink";

const HomePage = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);

        // Add smooth scrolling for all hash links
        const handleSmoothScroll = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest("a");

            if (link && link.hash && link.hash.startsWith("#")) {
                e.preventDefault();

                const targetId = link.hash.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for the sticky header
                        behavior: "smooth",
                    });

                    // Update URL without reloading the page
                    window.history.pushState(null, "", link.hash);
                }
            }
        };

        // Add event listener
        document.addEventListener("click", handleSmoothScroll);

        // Clean up
        return () => {
            document.removeEventListener("click", handleSmoothScroll);
        };
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-indigo-600">
                                WanderNest
                            </span>
                        </div>
                        <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                            <SmoothScrollLink
                                href="#features"
                                className="px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
                            >
                                Features
                            </SmoothScrollLink>
                            <SmoothScrollLink
                                href="#testimonials"
                                className="px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
                            >
                                Testimonials
                            </SmoothScrollLink>
                            <SmoothScrollLink
                                href="#pricing"
                                className="px-3 py-2 text-gray-700 hover:text-indigo-600 transition-colors"
                            >
                                Pricing
                            </SmoothScrollLink>
                            <Link
                                href="/dashboard"
                                className="ml-4 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                            >
                                Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                className="relative pt-16 pb-32 flex content-center items-center justify-center"
                style={{ minHeight: "85vh" }}
            >
                {/* Existing Hero Section Code */}
                <div
                    className="absolute top-0 w-full h-full bg-center bg-cover"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
                    }}
                >
                    <span className="w-full h-full absolute opacity-50 bg-black"></span>
                </div>
                <div className="container relative mx-auto px-4">
                    <div className="items-center flex flex-wrap">
                        <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                            <div
                                className={`transition-all duration-1000 transform ${
                                    isVisible
                                        ? "translate-y-0 opacity-100"
                                        : "translate-y-10 opacity-0"
                                }`}
                            >
                                <h1 className="text-white font-semibold text-5xl mb-6">
                                    Your Journey Begins With WanderNest
                                </h1>
                                <p className="text-white text-lg opacity-90 mb-12">
                                    Plan your perfect travel itinerary with
                                    WanderNest. Discover new destinations,
                                    create detailed day-by-day plans, and make
                                    unforgettable memories.
                                </p>
                                <div className="flex justify-center gap-4">
                                    <Link
                                        href="/dashboard"
                                        className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-lg"
                                    >
                                        Start Planning
                                    </Link>
                                    <SmoothScrollLink
                                        href="#features"
                                        className="px-8 py-4 bg-white text-indigo-600 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg"
                                    >
                                        Learn More
                                    </SmoothScrollLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center">
                        <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mb-12 md:mb-0">
                            <h3 className="text-3xl mb-2 font-semibold leading-normal text-gray-800">
                                Designed for travelers like you
                            </h3>
                            <p className="text-lg font-light leading-relaxed mt-4 mb-8 text-gray-700">
                                Our platform is built to make travel planning
                                seamless and enjoyable. Create detailed
                                itineraries, discover hidden gems, and share
                                your adventures with others.
                            </p>
                            <div className="space-y-4">
                                <FeatureItem
                                    icon={
                                        <MapPin className="text-indigo-600" />
                                    }
                                    title="Discover destinations"
                                    description="Find the perfect spots for your next adventure with our curated destination guides"
                                />
                                <FeatureItem
                                    icon={
                                        <Calendar className="text-indigo-600" />
                                    }
                                    title="Plan day-by-day"
                                    description="Create detailed daily itineraries with activities, accommodations, and transportation"
                                />
                                <FeatureItem
                                    icon={<Star className="text-indigo-600" />}
                                    title="Save favorites"
                                    description="Bookmark your favorite places and activities for future trips"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-6/12 px-4 mr-auto ml-auto">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-l">
                                <Image
                                    alt="Travel planning on device"
                                    src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
                                    className="w-full rounded-t-lg"
                                    width={600}
                                    height={200}
                                />
                                <div className="px-6 py-6">
                                    <h4 className="text-xl font-bold text-white">
                                        Beautiful User Experience
                                    </h4>
                                    <p className="mt-2 text-white opacity-90">
                                        Our intuitive interface makes travel
                                        planning a breeze. Access your plans on
                                        any device, anywhere in the world.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center text-center mb-20">
                        <div className="w-full lg:w-6/12 px-4">
                            <h2 className="text-4xl font-semibold text-gray-800">
                                How WanderNest Works
                            </h2>
                            <p className="text-lg leading-relaxed m-4 text-gray-600">
                                Creating your perfect travel itinerary has never
                                been easier
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <StepCard
                            number="01"
                            title="Choose Your Destination"
                            description="Select from our database of destinations or add your own custom location"
                        />
                        <StepCard
                            number="02"
                            title="Set Your Dates"
                            description="Define the duration of your trip and we'll help you organize each day"
                        />
                        <StepCard
                            number="03"
                            title="Add Activities"
                            description="Browse recommended attractions or add custom activities to your daily plan"
                        />
                        <StepCard
                            number="04"
                            title="Share & Enjoy"
                            description="Access your itinerary anytime, share with friends, and enjoy your trip!"
                        />
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section id="testimonials" className="py-20 bg-gray-100">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center text-center mb-16">
                        <div className="w-full lg:w-6/12 px-4">
                            <h2 className="text-4xl font-semibold text-gray-800">
                                Loved by Travelers Worldwide
                            </h2>
                            <p className="text-lg leading-relaxed m-4 text-gray-600">
                                Don&apos;t just take our word for it — hear what
                                our users have to say
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap">
                        <TestimonialCard
                            quote="WanderNest transformed how I plan my trips. I discovered amazing places I wouldn't have found otherwise!"
                            author="Sarah Johnson"
                            role="Solo Traveler"
                            image="https://randomuser.me/api/portraits/women/32.jpg"
                        />
                        <TestimonialCard
                            quote="As a family of five, travel planning used to be so stressful. WanderNest made it simple and actually enjoyable!"
                            author="Michael Rodriguez"
                            role="Family Traveler"
                            image="https://randomuser.me/api/portraits/men/52.jpg"
                        />
                        <TestimonialCard
                            quote="The day-by-day itinerary feature is a game changer. I can finally keep track of all my plans in one place."
                            author="Emily Chen"
                            role="Business Traveler"
                            image="https://randomuser.me/api/portraits/women/44.jpg"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="pricing" className="py-20 bg-indigo-600">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center">
                        <div className="w-full md:w-6/12 px-4 mr-auto ml-auto text-center">
                            <h2 className="text-4xl font-semibold text-white">
                                Ready to start your adventure?
                            </h2>
                            <p className="text-xl leading-relaxed mt-4 mb-8 text-white opacity-90">
                                Join thousands of travelers who use WanderNest
                                to create unforgettable journeys. Start planning
                                your next trip today.
                            </p>
                            <Link
                                href="/dashboard"
                                className="bg-white text-indigo-600 hover:bg-gray-100 text-lg font-medium px-8 py-4 rounded-lg shadow hover:shadow-lg transition-all"
                            >
                                Start Your Free Account
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 pt-12 pb-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap text-left lg:text-left">
                        <div className="w-full lg:w-4/12 px-4">
                            <h4 className="text-3xl font-semibold text-white">
                                WanderNest
                            </h4>
                            <h5 className="text-lg mt-0 mb-4 text-gray-300">
                                Your journey begins with us
                            </h5>
                            <div className="mt-6">
                                <p className="text-gray-400">
                                    © {new Date().getFullYear()} WanderNest. All
                                    rights reserved.
                                </p>
                            </div>
                        </div>
                        <div className="w-full lg:w-8/12 px-4">
                            <div className="flex flex-wrap">
                                <div className="w-full lg:w-4/12 px-4 ml-auto">
                                    <span className="block uppercase text-gray-300 text-sm font-semibold mb-4">
                                        Resources
                                    </span>
                                    <ul className="list-unstyled">
                                        <li>
                                            <a
                                                className="text-gray-400 hover:text-white font-semibold block pb-2 text-sm"
                                                href="#"
                                            >
                                                Blog
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="text-gray-400 hover:text-white font-semibold block pb-2 text-sm"
                                                href="#"
                                            >
                                                Destinations
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="text-gray-400 hover:text-white font-semibold block pb-2 text-sm"
                                                href="#"
                                            >
                                                Travel Guides
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="text-gray-400 hover:text-white font-semibold block pb-2 text-sm"
                                                href="#"
                                            >
                                                Tips & Tricks
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <span className="block uppercase text-gray-300 text-sm font-semibold mb-4">
                                        Company
                                    </span>
                                    <ul className="list-unstyled">
                                        <li>
                                            <a
                                                className="text-gray-400 hover:text-white font-semibold block pb-2 text-sm"
                                                href="#"
                                            >
                                                About Us
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="text-gray-400 hover:text-white font-semibold block pb-2 text-sm"
                                                href="#"
                                            >
                                                Team
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="text-gray-400 hover:text-white font-semibold block pb-2 text-sm"
                                                href="#"
                                            >
                                                Careers
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="text-gray-400 hover:text-white font-semibold block pb-2 text-sm"
                                                href="#"
                                            >
                                                Contact Us
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full lg:w-4/12 px-4">
                                    <span className="block uppercase text-gray-300 text-sm font-semibold mb-4">
                                        Legal
                                    </span>
                                    <ul className="list-unstyled">
                                        <li>
                                            <a
                                                className="text-gray-400 hover:text-white font-semibold block pb-2 text-sm"
                                                href="#"
                                            >
                                                Terms & Conditions
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="text-gray-400 hover:text-white font-semibold block pb-2 text-sm"
                                                href="#"
                                            >
                                                Privacy Policy
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="text-gray-400 hover:text-white font-semibold block pb-2 text-sm"
                                                href="#"
                                            >
                                                Cookie Policy
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
