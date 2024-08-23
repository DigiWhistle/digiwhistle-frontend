import { TDataCard } from "@/types/admin/new-requests";
import { ChartPieIcon } from "@heroicons/react/24/solid";
import React from "react";

export const DataCard = ({ label, value, subValue, iconName }: TDataCard) => {
  return (
    <div className="min-w-64 flex gap-8 items-center justify-between bg-white border px-4 py-5 rounded-lg drop-shadow-y-elevation-md">
      <div className="flex flex-col items-start">
        <h5 className="text-heading-s opacity-70">{label} </h5>
        <div className="flex items-center gap-2  ">
          <h4 className="text-heading-xl-medium ">{value}</h4>
          <h2>{subValue}</h2>
        </div>
      </div>
      <div className="p-3 rounded-2xl bg-blue-582 h-min">
        {React.createElement(iconName ?? ChartPieIcon, { className: "text-blue-581 w-6 h-6" })}
      </div>
    </div>
  );
};
