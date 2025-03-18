import { PriceLevel } from "@/api/RestaurantAPI";
import { Circle } from "lucide-react";
import React from "react";
const getReadableTitle = (level: PriceLevel) => {
    switch (level) {
        case "PRICE_LEVEL_FREE":
            return "Free";
        case "PRICE_LEVEL_INEXPENSIVE":
            return "Inexpensive";
        case "PRICE_LEVEL_MODERATE":
            return "Moderate";
        case "PRICE_LEVEL_EXPENSIVE":
            return "Expensive";
        case "PRICE_LEVEL_VERY_EXPENSIVE":
            return "Very Expensive";
        default:
            return "Unknown";
    }
};
const PriceLevelIndicator = ({ level }: { level: PriceLevel }) => {
    const getCircles = () => {
        const baseClass = "w-3 h-3";
        const emptyClass = `${baseClass} text-gray-300`;
        let filledClass = `${baseClass} fill-current`;
        switch (level) {
            case "PRICE_LEVEL_FREE":
                filledClass += " text-green-500";
                return [<Circle key={0} className={filledClass} />];
            case "PRICE_LEVEL_INEXPENSIVE":
                filledClass += " text-blue-500";
                return [
                    <Circle key={0} className={filledClass} />,
                    <Circle key={1} className={emptyClass} />,
                    <Circle key={2} className={emptyClass} />,
                    <Circle key={3} className={emptyClass} />,
                ];
            case "PRICE_LEVEL_MODERATE":
                filledClass += " text-yellow-500";
                return [
                    <Circle key={0} className={filledClass} />,
                    <Circle key={1} className={filledClass} />,
                    <Circle key={2} className={emptyClass} />,
                    <Circle key={3} className={emptyClass} />,
                ];
            case "PRICE_LEVEL_EXPENSIVE":
                filledClass += " text-orange-500";
                return [
                    <Circle key={0} className={filledClass} />,
                    <Circle key={1} className={filledClass} />,
                    <Circle key={2} className={filledClass} />,
                    <Circle key={3} className={emptyClass} />,
                ];
            case "PRICE_LEVEL_VERY_EXPENSIVE":
                filledClass += " text-red-500";
                return [
                    <Circle key={0} className={filledClass} />,
                    <Circle key={1} className={filledClass} />,
                    <Circle key={2} className={filledClass} />,
                    <Circle key={3} className={filledClass} />,
                ];
            default:
                return [<Circle key={0} className={emptyClass} />];
        }
    };

    return (
        <div className="flex items-center gap-0.5" title={getReadableTitle(level)}>
            {getCircles()}
        </div>
    );
};

export default PriceLevelIndicator;
