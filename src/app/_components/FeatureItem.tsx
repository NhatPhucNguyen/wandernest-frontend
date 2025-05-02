import React from 'react'
type FeatureItemProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
};
const FeatureItem = ({ icon, title, description }:FeatureItemProps) => {
    return (
      <div className="flex">
        <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-5 flex-shrink-0">
          {icon}
        </div>
        <div className="flex-grow pl-6">
          <h2 className="text-gray-900 text-lg font-medium mb-1">{title}</h2>
          <p className="leading-relaxed text-base text-gray-600">{description}</p>
        </div>
      </div>
    );
  };

export default FeatureItem