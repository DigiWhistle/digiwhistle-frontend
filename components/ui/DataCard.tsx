import { TDataCard } from "@/types/admin/new-requests";
import { ChartPieIcon } from "@heroicons/react/24/solid";
import React from "react";

export const DataCard = ({ label, value, subValue, iconName }: TDataCard) => {
  return (
    <div className="min-w-64 flex gap-8 items-center justify-between bg-white  px-4 py-5 rounded-2xl drop-shadow-y-elevation-md">
      <div className="flex flex-col items-start">
        <h5 className="text-heading-s opacity-70">{label} </h5>
        <div className="flex items-center gap-2  mt-2">
          <p className="text-heading-xl-medium font-semibold">{value}</p>
          <p>{subValue}</p>
        </div>
      </div>
      <div className="p-3 rounded-2xl bg-blue-582 h-min">
        {React.createElement(iconName ?? ChartPieIcon, { className: "text-blue-581 w-6 h-6" })}
      </div>
    </div>
  );
};
