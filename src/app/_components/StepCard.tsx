import React from "react";

interface StepCardProps {
    number: string;
    title: string;
    description: string;
}

const StepCard = ({ number, title, description }:StepCardProps) => {
    return (
        <div className="w-full md:w-3/12 px-4 text-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-indigo-600">
                        <span className="font-bold">{number}</span>
                    </div>
                    <h6 className="text-xl font-semibold">{title}</h6>
                    <p className="mt-2 mb-4 text-gray-600">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default StepCard;
