import React from "react";
import ProfileControlFilters from "@/components/admin/profile-control/ProfileFilters";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h3 className="text-display-xxs mb-5">Explore influencers 🔍</h3>
      {children}
    </div>
  );
};

export default layout;
