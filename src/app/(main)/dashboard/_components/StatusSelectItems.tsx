import { SelectItem } from "@/components/Select";
import React from "react";

const StatusSelectItems = () => {
    return (
        <>
            <SelectItem value="DRAFT" className="focus:bg-gray-50">
                <span className="flex items-center">
                    <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
                    Draft
                </span>
            </SelectItem>
            <SelectItem value="ACTIVE" className="focus:bg-blue-50">
                <span className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    Active
                </span>
            </SelectItem>
            <SelectItem value="COMPLETE" className="focus:bg-green-50">
                <span className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Complete
                </span>
            </SelectItem>
        </>
    );
};

export default StatusSelectItems;
