import AdminTitle from "@/components/admin/layout/title";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex justify-between items-start">
        <AdminTitle title="Manage Campaigns 😇" description="All campaigns in full detail." />
      </div>
      <div>
        {/* <InfluencerFilters /> */}
        {children}
      </div>
    </div>
  );
};

export default layout;
