import React from "react";

const DataCard = ({ title, value }: { title: string; value: string | number }) => {
  return (
    <div className="flex flex-col border rounded-2xl overflow-hidden basis-1/4 ">
      <p className="w-full text-center px-1 py-3 bg-yellow-561 text-tc-primary-default font-semibold text-sm">
        {title}
      </p>
      <p className="w-full text-center  py-3 px-2 bg-white font-medium">{value}</p>
    </div>
  );
};

export default DataCard;
